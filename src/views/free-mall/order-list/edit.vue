<template>
  <form-data :is-edit="true"></form-data>
</template>

<script>
import FormData from './components/form-data.vue'
export default {
  name: 'FreeMallOrderEdit',
  components: {
    FormData
  }
}
</script>