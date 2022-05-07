<template>
  <body>
    <section class="cli">
      <section class="cli-window">
        <div
          id="container"
          v-for="textValue in inputArray"
          :key="textValue.count"
        >
          <div style="color: white">>{{ textValue.first }}</div>
          <div v-if="checkErrorText(textValue.last)" style="color: red">
            {{ textValue.last }}
          </div>
          <div v-else style="color: green">{{ textValue.last }}</div>
        </div>
      </section>
      <form class="cli-input" v-on:submit="load">
        <input type="text" v-model="input" />
      </form>
    </section>
  </body>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      input: "",
      inputArray: [],
      storedValue: {},
      itemValues: {
        value: " ",
        type: " ",
      },
    };
  },
  methods: {
    load(e) {
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
        case "GET":
          if (2 != inputArray.length) {
            this.loadInput("ERROR: Cannot GET value wrong syntax");
          } else {
            if (this.storedValue[inputArray[1]] === undefined) {
              this.loadInput("ERROR: Keys does not exsist");
            }
            if (this.storedValue[inputArray[1]]["type"] === "String") {
              this.getKey(inputArray[1]);
            } else {
              this.loadInput("ERROR: this key belongs to a set using SREM.");
            }
          }
          break;
        case "SADD":
          if (3 > inputArray.length) {
            this.loadInput("ERROR: Cannot SADD value wrong syntax");
          } else {
            let dataArr = [],
              duplicatedArr = [];
            for (let i = 2; i < inputArray.length; i++) {
              /*
              if the string appear the first time it will not be in the dataArr yet
              then push it in.
              */
              if (-1 == dataArr.indexOf(inputArray[i])) {
                dataArr.push(inputArray[i]);
              } else {
                // if it already in the input dataArr then push in duplicatedArr
                duplicatedArr.push(inputArray[i]);
              }
            }
            this.SADDKey(inputArray[1], dataArr);
          }
          break;
        case "SREM":
          if (3 > inputArray.length) {
            this.loadInput("ERROR: Cannot SREM values wrong syntax");
          } else {
            let itemArr = [];
            for (let i = 2; i < inputArray.length; ++i) {
              itemArr.push(inputArray[i]);
            }
            this.SREMKey(inputArray[1], itemArr);
          }
          break;
        case "SMEMBERS":
          if(2 != inputArray.length){
            this.loadInput("ERROR: Cannot SMEMBERS wrong syntax");
          }else{
            this.SMEMBERSKey(inputArray[1]);
          }
          break;
      } 
    },
    setValue(value, type) {
      this.itemValues["value"] = value;
      this.itemValues["type"] = type;
    },
    setKey(key, itemValue) {
      this.setValue(itemValue, "String");
      this.storedValue[key] = this.itemValues;
      this.loadInput("OK");
      console.log(this.storedValue[key]);
    },
    getKey(key) {
      this.loadInput("Result: " + this.storedValue[key]["value"]);
    },
    SADDKey(key, itemValue) {
      this.setValue(itemValue, "Set");
      this.storedValue[key] = this.itemValues;
      this.loadInput("OK");
      console.log(this.storedValue[key]);
    },
    SREMKey(key, itemValue) {
      let dataArr = [];
      let result = "";
      dataArr = dataArr.concat(this.storedValue[key]["value"]);
      console.log(dataArr);
      if (this.storedValue[key]["type"] != "Set") {
        this.loadInput("This is not a Set");
      } else {
        for (let i = 0; i < itemValue.length; i++) {
          if (-1 == dataArr.indexOf(itemValue[i])) {
            result = result + " " + itemValue[i];
          } else {
            dataArr.splice(dataArr.indexOf(itemValue)[i], 1);
          }
        }
        this.storedValue[key]["value"] = dataArr;
        if (result.length > 0) {
          this.loadInput("current value: " + "\n" + this.storedValue[key]["value"] + " " +result + " " + "is/are not removed");
        }
      }
    },
    SMEMBERSKey(key){
      if(this.storedValue[key]["type"] == "Set"){
        this.loadInput("result:" +" "+this.storedValue[key]["value"]);
      }else{
        this.loadInput("This is a String.");
      }
    },
    loadInput(input) {
      let textVal = {};
      textVal.last = input;
      textVal.first = this.input;
      textVal.count = this.inputArray.length + 1;
      this.inputArray.push(textVal);
    },
    // check the error text return true if the string contains "ERROR".
    checkErrorText(text) {
      if (text.includes("ERROR")) {
        return true;
      }
    },
  },
};
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
