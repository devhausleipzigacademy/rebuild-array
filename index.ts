class MyArray<T extends unknown[]> {
  value: Record<number, T[number]> = {}

  constructor(...elements: T) {
    for (let index = 0; index < elements.length; index++) {
      this.value[index] = elements[index]
    }
  }

  get length() {
    let counter = 0
    for (const _ in this.value) {
      counter += 1
    }
    return counter
  }

  at(index: number) {
    return index >= 0 ? this.value[index] : this.value[this.length + index]
  }

  push(element: T[number]) {
    this.value[this.length] = element
    return this.length
  }

  pop() {
    const element = this.at(-1)
    delete this.value[this.length - 1]
    return element
  }

  static isArray(thing: any) {
    return thing instanceof MyArray
  }

  map<K>(
    callbackfn: (
      value: T[number],
      index: number,
      array: Record<number, T[number]>
    ) => K
  ): MyArray<K[]> {
    let newArray = new MyArray<K[]>()
    for (let index = 0; index < this.length; index++) {
      const newElement = callbackfn(this.value[index], index, this.value)
      newArray.push(newElement)
    }
    return newArray
  }

  filter(
    callbackfn: (
      value: T[number],
      index: number,
      array: Record<number, T[number]>
    ) => boolean
  ): MyArray<T[number][]> {
    let newArray = new MyArray<T[number][]>()
    for (let index = 0; index < this.length; index++) {
      callbackfn(this.value[index], index, this.value) &&
        newArray.push(this.value[index])
    }
    return newArray
  }
}

const array = new MyArray(1, "two", 3, "four")
console.log(array.value)
console.log(array.length)
console.log(array.push(5))
console.log(array.value)

console.log(array.pop())
console.log(array)
console.log(array.at(-1))

console.log(MyArray.isArray(array))

const arr = array.map((el) => {
  if (typeof el === "string") {
    return el + "!"
  }
  return el * 2
})

console.log(arr.value)

console.log(array.filter((el) => typeof el === "string"))
