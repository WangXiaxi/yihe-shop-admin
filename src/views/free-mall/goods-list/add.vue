<template>
  <form-data :is-edit="false"></form-data>
</template>

<script>
import FormData from './components/form-data.vue'
export default {
  name: 'FreeMallGoodsAdd',
  components: {
    FormData
  }
}
</script>