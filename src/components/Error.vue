<template>
    <div>
        <p>{{ msg }}</p>
        <p>此页面不存在！</p>
    </div>
</template>

<script>
    export default {
        name: 'hi222',
        data() {
            return {
                msg: "Error : 404 not Found!"
            }
        }
    }
</script>

<style scoped>

</style>