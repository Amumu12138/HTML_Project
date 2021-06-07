<template>
    <div>   
         <h1> 个人信息 </h1>
      <p>id: {{id }}</p>
    </div>
</template>

<script>
export default {
     props: ['id'],
    name: "UserProfile"
}
</script>

<style>

</style>