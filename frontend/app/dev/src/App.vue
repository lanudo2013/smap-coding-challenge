<template>
    <div id="app-main" class="col-12">
        <!--img src="./assets/logo.png"-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <div class="collapse navbar-collapse" >
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <router-link  to="/consumers">
                            <a class="nav-link" >Consumers</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  to="/statistics">
                            <a class="nav-link" >Statistics</a>
                        </router-link>
                    </li>

                </ul>

            </div>
        </nav>


        <div class="col-lg-8 offset-md-2">
            <transition name="fade" mode="out-in">
            <router-view></router-view>
            </transition>
        </div>


    </div>
</template>

<script>


    export default {
        name: "App",
        components: {
        }
    };//lang="scss" type="text/scss"
</script>

<style >
    #app-main {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;


    }

    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
