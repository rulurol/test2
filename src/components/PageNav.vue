<template>
  <header>
    <nav class="pagenav-container">
      <ul class="pagenav">
        <li v-for="pageLink in ['/home', '/incomes', '/orders', '/sales', '/stocks']">
          <RouterLink :to="pageLink" class="pagenav__link">
            {{ pageLink.charAt(1).toUpperCase() + pageLink.slice(2) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.pagenav-container {
  box-shadow: 0 2px 6px #4446;
}
.pagenav {
  display: flex;
  flex-wrap: nowrap;
  gap: 2px;
  justify-content: space-between;
  max-width: 480px;
  align-items: center;
  padding: 4px 8px;
}
.pagenav__link {
  padding: 10px;
  color: #444;
  cursor: pointer;
  font-weight: 500;
  display: block;

  &:hover {
    background-color: #d6d6d6;
  }
}
.pagenav__item--active {
  background-color: #e0e0e0;
}
</style>