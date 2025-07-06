<template>
  <header><nav><ul class="tabnav">
    <li
      v-for="tab in tabs"
      @click="changeTab(tab)"
      @keyup="$event.key === 'Enter' && changeTab(tab)"
      :class="(props.tab === tab ? 'tabnav__item--active' : '') + ' tabnav__item'"
      tabindex="0"
    >
      {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
    </li>
  </ul></nav></header>
</template>

<script setup>
import { tabs } from '@/model'

const props = defineProps(["tab"])

const emit = defineEmits(["changeTab"])
const changeTab = (val) => {
  if (props.tab !== val)
    emit("changeTab", val)
}
</script>

<style>
.tabnav {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: start;
  align-items: center;
  padding: 4px 8px;
  box-shadow: 0 2px 6px #4446;
}
.tabnav__item {
  padding: 10px;
  color: #444;
  cursor: pointer;
  font-weight: 500;

  &:hover, &:focus {
    background-color: #d6d6d6;
  }
}
.tabnav__item--active {
  background-color: #e0e0e0;
}
</style>