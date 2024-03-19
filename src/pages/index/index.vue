<template>
  <tmap-map mapKey="EPKBZ-6PG63-UQZ3M-33CHO-IEW7V-CPB55" :events="events" :center="center" :zoom="zoom"
    :doubleClickZoom="doubleClickZoom" :control="control">
    <div class="ctrl">
      <!-- <button @click.stop="zoomTo(10)">zoomTo 10</button>
        <button @click.stop="zoomTo(15)">zoomTo 15</button> -->
      <button @click="moveAlong">出发</button>
      <button @click="stopMove">停止移动</button>
      <button @click="pauseMove">暂停</button>
      <button @click="resumeMove">重新开始</button>
      <button @click.stop="move({ lat: 22.90, lng: 113.87 })">东莞理工学院</button>
    </div>
    <tmap-multi-polyline :id="state.id" :styles="state.styles" :geometries="geometries" />
    <tmap-multi-marker :styles="state.markerStyles" :geometries="state.markerGeometries" ref="markers"
      @click="state.print" @dblclick="state.print" />
  </tmap-map>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

//初始位置
const center = ref({ lat: 39.984104, lng: 116.307503 });
const zoom = ref(15);

//双击缩放
const doubleClickZoom = ref(true);
const move = (latLng: { lat: number; lng: number }) => {
  center.value = latLng;
};
const zoomTo = (value: number) => {
  zoom.value = value;
};

//控制
const control = ref(
  {
    scale: {},
    zoom: {
      position: 'bottomRight',
    },
  }
);

//事件
const print = (e: unknown) => {
  console.log(e);
};
const events = ref({
  dblclick: print,
})
//轨迹
const paths = [
  { lat: 39.98481500648338, lng: 116.30571126937866 },
  { lat: 39.982266575222155, lng: 116.30596876144409 },
  { lat: 39.982348784165886, lng: 116.3111400604248 },
  { lat: 39.978813710266024, lng: 116.3111400604248 },
  { lat: 39.978813710266024, lng: 116.31699800491333 },
];
const markers = ref();
const geometries = [
  {
    id: 'pl_1', // 折线唯一标识，删除时使用
    styleId: 'styleBlue', // 绑定样式名
    paths,
  },
];
const state = reactive({
  id: 'polyline-layer',
  styles: {
    styleBlue: {
      color: '#3777FF', // 线填充色
      width: 4, // 折线宽度
      borderWidth: 2, // 边线宽度
      borderColor: '#FFF', // 边线颜色
      lineCap: 'round', // 线端头方式
    },
  },
  markerStyles: {
    'car-down': {
      width: 40,
      height: 40,
      anchor: {
        x: 20,
        y: 20,
      },
      faceTo: 'map',
      rotate: 180,
      src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png',
    },
    start: {
      width: 25,
      height: 35,
      anchor: { x: 16, y: 32 },
      src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
    },
    end: {
      width: 25,
      height: 35,
      anchor: { x: 16, y: 32 },
      src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
    },
  },
  markerGeometries: [
    {
      id: 'car',
      styleId: 'car-down',
      position: { lat: 39.98481500648338, lng: 116.30571126937866 },
    },
    {
      id: 'start',
      styleId: 'start',
      position: { lat: 39.98481500648338, lng: 116.30571126937866 },
    },
    {
      id: 'end',
      styleId: 'end',
      position: { lat: 39.978813710266024, lng: 116.31699800491333 },
    },
  ],
}
)

const moveAlong = () => {
  markers.value.moveAlong(
    {
      car: {
        path: paths.map((p) => new window.TMap.LatLng(p.lat, p.lng)),
        speed: 250,
      },
    },
    {
      autoRotation: true,
    },
  );
};
const stopMove = () => {
  markers.value.stopMove();
};
const pauseMove = () => {
  markers.value.pauseMove();
};
const resumeMove = () => {
  markers.value.resumeMove();
};
</script>

<style lang="scss" scoped>
.ctrl {
  position: absolute;
  height: 7vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1001;

  button {
    top: 0;
    left: 0;
    height: 7vh;
  }
}
</style>