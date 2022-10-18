class A {
  constructor() {
    this.nameA = 'a'
  }
  validateA() {
    console.log("A")
  }
}

class B extends A {
  constructor() {
    super()
    this.nameB = 'b'
  }

  validateB() {
    console.log("B")
  }
}

class C extends B {
  constructor() {
    super()
    this.nameC = 'c'
  }

  validateC() {
    console.log("C")
  }
}


var c = new C()

function findMembers(type, name, validate) {

  // 递归函数
  function _find(type) {
    // 判断type是否查到顶了 为null
    if (type.__proto__ === null) {
      // 返回数组
      return []
    }

    // 查找该对象中所有属性
    let names = Reflect.ownKeys(type);
    // 属性过滤是否匹配用户传入的参数
    names = names.filter(item => {
      return filterName(item)
    })
    return [...names, ..._find(type.__proto__)]
  }

  function filterName(item) {
    // 查找是否头部向匹配的
    if (item.startsWith(name) || item.startsWith(validate)) {
      return item
    }
  }

  return _find(type)
}

const members = findMembers(c, 'name', 'validate')
console.log(members)
