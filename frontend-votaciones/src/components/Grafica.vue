<script setup>
    import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
    Chart.register(DoughnutController, ArcElement, Tooltip);
    


</script>
<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>