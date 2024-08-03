<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal-content">
      <div class="hd">Add user</div>
      <div class="bd">
        <div class="form-item">
          <div class="label">name:</div>
          <input type="text" v-model="username" />
        </div>
        <div class="form-item">
          <div class="label">gender:</div>
          <label>
            <input type="radio" value="male" v-model="selectedOption" />
            male
          </label>
          <label>
            <input type="radio" value="female" v-model="selectedOption" />
            female
          </label>
        </div>
      </div>
      <div class="footer">
        <div class="btn cancel" @click="closeModal">cancel</div>
        <div class="btn" @click="handleConfirm">confirm</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";

const selectedOption = ref("male");
const username = ref("");
const isEdit = ref(false);
const props = defineProps({
  modelValue: Boolean,
  echo: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue"]);

watchEffect(() => {
  const echo = props.echo;
  if (echo) {
    username.value = echo.name || "";
    selectedOption.value = echo.gender || "male";
    isEdit.value = !!echo.name;
  }
});

const closeModal = () => {
  emit("update:modelValue", false);
};

const handleConfirm = () => {
  const name = username.value;

  if (!name) {
    alert("请输入姓名！");
    return;
  }

  const item = {
    id: props.echo.id,
    name: name,
    gender: selectedOption.value,
  };

  username.value = "";

  isEdit.value ? emit("edit", item) : emit("confirm", item);
  emit("update:modelValue", false);
};

onMounted(() => {});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  min-width: 400px;
  border-radius: 5px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .label {
    width: 100px;
    font-size: 16px;
    color: #666666;
  }
}

.bd {
  min-height: 100px;
  padding: 10px 24px;
}

.hd,
.footer {
  border: 1px solid #eeeeee;
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 6px;
}

.hd {
  justify-content: flex-start;
}

.footer {
  justify-content: flex-end;
}

.btn {
  width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b85e4 !important;
  color: #fff;
  font-size: 12px;
  margin-left: 10px;
}
</style>
