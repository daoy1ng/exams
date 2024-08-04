<script setup>
import http from './utils/http'
import Modal from "./components/modal.vue";
import { onMounted, onUnmounted, watch, reactive, ref, computed } from "vue";

let list = ref([]);
// let currentList = ref([]);
let currentUser = ref({}); //当前编辑的user
let showModal = ref(false);

onMounted(() => {
  http.getUserList()
})

const showAdd = () => {
  currentUser.value = {}
  showModal.value = true
}

const add = (o) => {
  const l = list.value;
  if (l) {
    l.push(o);
  }
};

const showEdit = (o,i) => {
  o.id = i
  currentUser.value = o
  showModal.value = true
}

const edit = (o) => {
  list.value[o.id] = o
}
</script>

<template>
  <div class="hd">
    <div class="btn add" @click="showAdd">添加用户</div>
  </div>
  <div class="bd table">
    <div class="table-tr">
      <div class="table-th">id</div>
      <div class="table-th">name</div>
      <div class="table-th">gender</div>
      <div class="table-th">edit</div>
    </div>
    <div class="table-tr" v-for="(item, i) in list" :key="i">
      <div class="table-td">{{ i + 1 }}</div>
      <div class="table-td">{{ item.name }}</div>
      <div class="table-td">{{ item.gender }}</div>
      <div class="table-td">
        <div class="btn edit" @click="showEdit(item,i)">edit</div>
      </div>
    </div>
  </div>

  <modal v-model="showModal" :echo="currentUser" @confirm="add" @edit="edit" />
</template>

<style scoped>
.hd {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.btn {
  background: #2b85e4 !important;
  color: #fff;
}

.add {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-bottom: 12px;
} 

.edit{
  margin: 0 auto;
  width: 88px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}

.bd {
  max-width: 1020px;
}

.table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
}

.table-tr {
  display: table-row;
  height: 46px;
}

.table-th {
  display: table-cell;
  font-weight: bold;
  border: 1px solid gray;
  text-align: center;
  vertical-align: middle;
}

.table-td {
  display: table-cell;
  border: 1px solid gray;
  text-align: center;
  vertical-align: middle;
}
</style>
