<template>
  <div
    id="app-main"
    class="col-12"
  >
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li
            class="nav-item"
            :class="{'active': $route.path==='/home'}"
          >
            <RouterLink to="/home">
              <a class="nav-link ">
                Home
              </a>
            </RouterLink>
          </li>
          <li
            class="nav-item"
            :class="{'active': $route.path==='/consumers'}"
          >
            <RouterLink to="/consumers">
              <a class="nav-link">
                Consumers
              </a>
            </RouterLink>
          </li>
          <li
            class="nav-item"
            :class="{'active': $route.path==='/statistics'}"
          >
            <RouterLink to="/statistics">
              <a class="nav-link">
                Statistics
              </a>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>


    <div class="col-lg-12">
      <Transition
        name="fade"
        mode="out-in"
      >
        <RouterView />
      </Transition>
    </div>
  </div>
</template>

<script>


    export default {
        name: "App",
        components: {
        }
    };
</script>

<style lang="scss">
    @import './assets/variables';

    #app-main {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

    }

    .active{
        background-color: #ff933c;
    }
    .navbar{
        padding: 0 !important;
    }
    .nav-link{
        padding: 1rem 2rem !important;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
