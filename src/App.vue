<template>
<body>
    <section class="cli">
      <section class="cli-window">
        <div id="container" v-for="textValue in inputArray" :key="textValue.count">
          <div style="color:white">{{textValue.first}}</div>
          <div v-if="checkErrorText(textValue.last)" style="color: red">{{textValue.last}}</div>
          <div v-else style="color: green">{{textValue.last}}</div>
        </div>
      </section>  
      <form class="cli-input" v-on:submit="load">
          <input type="text" v-model="input"/>
      </form>
  </section>
</body>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      input: "",
      inputArray: [],
      storedValue: {},
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  },
  methods: {
    load(e){
      e.preventDefault();
      var inputArray = this.input.split(" ");
      switch (inputArray[0]) {
        case "SET":
          if (3 != inputArray.length) {
            this.loadInput("ERROR: Cannot SET value");
          } else {
            this.setKey(inputArray[1], inputArray[2]);
          }
          break;
        case "DEL":
          
      }
    },
    setKey: function (key, itemValue) {
      this.storedValue[key] = itemValue;
      this.loadInput("OK");
    },
    loadInput(input){
      let textVal = {};
      textVal.last = input;
      textVal.first = this.input;
      textVal.count = this.inputArray.length + 1;
      this.inputArray.push(textVal);
    },
    checkErrorText(text){
      if(text.includes("ERROR")){
        return true;
      }
    }
  }
}
</script>

<style>
html,
body {
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
	font-family: sans-serif;
	background: #1c1e22;
}
body {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
::-webkit-scrollbar {
	width: 4px;
  position: sticky;
}
::-webkit-scrollbar-thumb {
	background-color: #4c4c6a;
	border-radius: 2px;
}
.cli {
	width: 1200px;
	height: 1200px;
	max-height: 1000px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
}
.cli-window {
	flex: auto;
	max-height: calc(100% - 60px);
	background: #2f323b;
	overflow: auto;
}
.cli-input input {
	height: 59px;
	line-height: 60px;
	outline: 0 none;
	border: none;
	width: 100%;
	color: white;
	text-indent: 10px;
	font-size: 12pt;
	padding: 0;
	background: #40434e;
}
</style>
