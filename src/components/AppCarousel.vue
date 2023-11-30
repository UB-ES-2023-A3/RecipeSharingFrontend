<template>
  <!-- The carousel container -->
    <div class="carousel">
        <!-- Swiper component with options and slide change event -->
        <swiper :options="swiperOptions" @slideChange="handleSlideChange">
            <!-- Loop through items and create slides -->
            <swiper-slide v-for="(item, index) in items" :key="index">
                <!-- Content for each slide -->
                <img :src="item.image" alt="Slide Image">
                <h2>{{ item.title }}</h2>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>

// Import necessary styles and components
import 'swiper/swiper-bundle.css';
import {Swiper, SwiperSlide} from 'vue-awesome-swiper';

export default {
    data() {
        return {
            // Swiper options to control the carousel
            swiperOptions: {
                loop: true,           // Enable looping of slides
                slidesPerView: 1,     // Number of slides visible at a time
            },
            // Data for each slide
            items: [
                {
                    title: 'Slide 1',
                    image: require('@/assets/images/HeaderImage.jpg'),
                },
                {
                    title: 'Slide 2',
                    image: require('@/assets/images/DefaultUser.jpg'),
                },
                {
                    title: 'Slide 3',
                    image: require('@/assets/images/HeaderImage.jpg'),
                },
            ],
            // Keep track of the active slide
            activeSlide: 0,
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        // Handle slide change event
        handleSlideChange() {
            // Get the index of the currently active slide
            const activeIndex = this.$refs.mySwiper.swiper.activeIndex;

            // Activate a timer to change to the next slide after 3 seconds
            setTimeout(() => {
                this.$refs.mySwiper.swiper.slideTo(activeIndex + 1);
            }, 3000);
        },
    },
};

</script>

<style scoped>

.carousel {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

/* Additional styles according to your design can be added here */
</style>