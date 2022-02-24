<template>
  <div class="customInput-container">
    <label for="" id="customInputLabel">{{ label }}</label>
    <input
      id="customInput"
      :type="type"
      autocomplete="off"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "customInput",
  props: ["type", "label", "value", "modelValue"],
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style>
#customInput {
  width: 80%;
  font-size: 16pt;
  padding: 10px 20px;
  border: none;
  border-bottom: 3px solid #ebebeb;
}
#customInput:focus {
  outline: none;
  border-bottom: 3px solid #5e5e5e;
  transition: 0.3s ease;
}
#customInputLabel {
  font-weight: 500;
  font-size: 12pt;
  line-height: 110%;
  color: #82869a;
}
.customInput-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
</style>
