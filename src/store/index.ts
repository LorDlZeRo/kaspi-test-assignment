import { ActionTree, MutationTree, GetterTree } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { Product, State } from "~/shared/interfaces";

export const state = (): State => ({
  products: [],
  favouriteProducts: JSON.parse(localStorage.getItem("favouriteProducts") || "[]"),
  basket: JSON.parse(localStorage.getItem("basket") || "[]"),
  amountPage: 0,
  isBasketCheckedOut: false,
  totalAmount: 0,
  loading: false,
  searchQuery: "",
  sortOptions: [
    { value: "price-asc", text: "Цена: по возрастанию" },
    { value: "price-desc", text: "Цена: по убыванию" },
    { value: "name-asc", text: "Название: A-Z" },
    { value: "name-desc", text: "Название: Z-A" },
    { value: "orderCount-asc", text: "Количество: по возрастанию" },
    { value: "orderCount-desc", text: "Количество: по убыванию" },
],
sortOption: "price-asc"
});

export const mutations: MutationTree<State> = {
  setSortOption(state, sortOption: string) {
    function sortProducts(products: Product[], sortOption: string): Product[] {
      return [...products].sort((a, b) => {
          switch (sortOption) {
              case "price-asc":
                  return a.price - b.price;
              case "price-desc":
                  return b.price - a.price;
              case "name-asc":
                  return a.name.short.localeCompare(b.name.short);
              case "name-desc":
                  return b.name.short.localeCompare(a.name.short);
              case "orderCount-asc":
                  return (a.orderCount || 0) - (b.orderCount || 0);
              case "orderCount-desc":
                  return (b.orderCount || 0) - (a.orderCount || 0);
              default:
                  return 0;
          }
      });
  }
  state.sortOption = sortOption;
  state.products = sortProducts(state.products, sortOption);
},

  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setSearchQuery(state, query: string) {
    state.searchQuery = query;
  },
  setProducts(state, data: Product[]) {
    function loadPurchasedCounts(): Record<string, number> {
      const storedPurchasedItems = localStorage.getItem("purchasedItems");
      const purchasedItems = storedPurchasedItems
        ? JSON.parse(storedPurchasedItems)
        : [];

      return purchasedItems.reduce(
        (
          acc: Record<string, number>,
          item: { productId: string; quantity: number }
        ) => {
          if (acc[item.productId]) {
            acc[item.productId] += item.quantity;
          } else {
            acc[item.productId] = item.quantity;
          }
          return acc;
        },
        {}
      );
    }
    const purchasedCounts = loadPurchasedCounts();

    const dataWithOrderCount = data.map((product: Product) => ({
      ...product,
      orderCount: purchasedCounts[product._id] || 0,
      isFavorite: false,
    }));
    state.products = dataWithOrderCount;

    const storedFavourites = localStorage.getItem("favouriteProducts");
    if (storedFavourites) {
      const favourites = JSON.parse(storedFavourites);
      state.favouriteProducts = favourites;
      state.products.forEach((product: Product) => {
        if (favourites.find((fav: Product) => fav._id === product._id)) {
          product.isFavorite = true;
        }
      });
    }
  },
  setAmountPage(state, number: number) {
    state.amountPage = number;
  },
  toggleFavorite(state, productId: string) {
    state.favouriteProducts = state.favouriteProducts.filter(
      (product) => product._id !== productId
    );
    const product = state.products.find((product) => product._id === productId);
    if (product) {
      product.isFavorite = !product.isFavorite;

      if (product.isFavorite) {
        state.favouriteProducts.push(product);
      }
    }
    localStorage.setItem(
      "favouriteProducts",
      JSON.stringify(state.favouriteProducts)
    );
  },
  addToBasket(state, product: Product) {
    const existingItem = state.basket.find(
      (item) => item.product._id === product._id && !item.isPurchased
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.basket.push({
        product,
        quantity: 1,
        orderId: uuidv4(),
      });
    }

    this.commit("calculateTotalAmount");
    localStorage.setItem("basket", JSON.stringify(state.basket));
  },
  updateBasketItemQuantity(
    state,
    { productId, quantity }: { productId: string; quantity: number }
  ) {
    const basketItem = state.basket.find(
      (item) => item.product._id === productId && !item.isPurchased
    );
  
    if (basketItem) {
      basketItem.quantity = quantity;
    }
  
    this.commit("calculateTotalAmount");
    localStorage.setItem("basket", JSON.stringify(state.basket));
  },
  updatePurchasedCounts(state) {
    const purchasedCounts: Record<string, number> = {};

    state.basket.forEach((item) => {
      if (item.isPurchased) {
        const productId = item.product._id;
        if (purchasedCounts[productId]) {
          purchasedCounts[productId] += item.quantity;
        } else {
          purchasedCounts[productId] = item.quantity;
        }
      }
    });

    const purchasedItemsArray = Object.entries(purchasedCounts).map(
      ([productId, quantity]) => ({
        productId,
        quantity,
      })
    );

    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItemsArray));
  },
  removeFromBasket(state, { productId, orderId }) {
    state.basket = state.basket.filter(
      (item) => !(item.product._id === productId && item.orderId === orderId)
    );

    this.commit("calculateTotalAmount");
    localStorage.setItem("basket", JSON.stringify(state.basket));
  },
  checkoutBasket(state) {
    let totalAmount = 0;
  
    state.basket.forEach((item) => {
      if (!item.isPurchased) {
        item.isPurchased = true;
        item.orderId = uuidv4(); // генерация нового orderId для каждого элемента
        totalAmount += item.product.price * item.quantity;
      }
    });
  
    state.totalAmount = totalAmount;
    state.isBasketCheckedOut = true;
  
    localStorage.setItem("basket", JSON.stringify(state.basket));
    state.totalAmount = 0;
    this.commit("updatePurchasedCounts");
  },
  calculateTotalAmount(state) {
    let totalAmount = 0;

    state.basket.forEach((item) => {
      if (!item.isPurchased) {
        totalAmount += item.product.price * item.quantity;
      }
    });

    state.totalAmount = totalAmount;
  },
};

export const getters: GetterTree<State, any> = {
  getProducts(state) {
    return state.products;
  },
  getAmountPage(state) {
    return state.amountPage;
  },
  getFavouriteProducts(state) {
    return state.favouriteProducts;
  },
  getBasket(state) {
    return state.basket;
  },
  isBasketCheckedOut(state) {
    return state.isBasketCheckedOut;
  },
  getTotalAmount(state) {
    return state.totalAmount;
  },
  filteredProducts(state) {
    if (!state.searchQuery) {
      return state.products;
    }
    return state.products.filter((product) => {
      
      const productName = product.name.short;
      return (
        typeof productName === "string" &&
        productName.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    });
  },
  getSortOption(state) {
    return state.sortOption;
  },
  getSortOptions(state) {
    return state.sortOptions;
},
};

export const actions: ActionTree<State, any> = {
  async fetchProducts({ commit }, url: string) {
    commit("setLoading", true);
    try {
      const response = await (this as any).$axios.$get(url);
      commit("setProducts", response.products);
      commit("setAmountPage", response.amountPaginationPages);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    } finally {
      commit("setLoading", false);
    }
  },
  setFavourites({ commit }, productId: string) {
    commit("toggleFavorite", productId);
  },
  addToBasket({ commit }, product: Product) {
    commit("addToBasket", product);
  },
  updateBasketItemQuantity(
    { commit },
    payload: { productId: string; quantity: number }
  ) {
    commit("updateBasketItemQuantity", payload);
  },
  removeFromBasket({ commit }, { productId, orderId }) {
    commit("removeFromBasket", { productId, orderId });
  },
  checkoutBasket({ commit }) {
    commit("checkoutBasket");
  },
  setSortOption({ commit }, sortOption: string) {
    commit("setSortOption", sortOption);
  },
};
