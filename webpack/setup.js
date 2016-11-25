import Vue from 'vue'
import greeting from 'components/greeting'

export default function (template) {
  return new Vue({
    template,
    components: {
      greeting
    }
  })
}
