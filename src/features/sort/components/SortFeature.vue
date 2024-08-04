<template>
    <div class="sort-dropdown" ref="dropdown">
        <MainButton @click="toggleDropdown" color="blue">
            Сортировать по
        </MainButton>
        <ul v-if="isOpen" class="dropdown-menu">
            <li
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option.value)"
                :class="{ selected: option.value === selectedOption }"
                class="dropdown-item"
            >
                {{ option.text }}
            </li>
        </ul>
    </div>
</template>

<script>
import { MainButton } from '~/shared/ui';

export default {
    name: "SortDropdown",
    components: {
        MainButton,
    },
    data() {
        return {
            isOpen: false,
            selectedOption: "",
            options: [
                { value: "price-asc", text: "Цена: по возрастанию" },
                { value: "price-desc", text: "Цена: по убыванию" },
                { value: "name-asc", text: "Название: A-Z" },
                { value: "name-desc", text: "Название: Z-A" },
            ],
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(value) {
            this.selectedOption = value;
            this.isOpen = false;
            this.$emit("update:selected", value);
        },
        handleClickOutside(event) {
            if (!this.$refs.dropdown.contains(event.target)) {
                this.isOpen = false;
            }
        },
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleClickOutside);
    },
};
</script>

<style scoped>
.sort-dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    display: block;
    position: absolute;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 100%;
    margin-top: 5px;
    padding: 0;
    list-style: none;
}

.dropdown-item {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.dropdown-item:hover,
.dropdown-item.selected {
    background-color: #007bff;
    color: white;
}
</style>
