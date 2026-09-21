---
title: 为什么我坚持用 TypeScript
date: 2026-09-18
summary: 从"能用就行"到"类型即文档"，聊聊 TypeScript 在真实项目里带来的收益。
tags: [TypeScript, 工程化]
---

## 一个真实的翻车现场

刚工作时，我改了一个函数的返回值，忘了同步改调用方。上线后 3 小时才发现——

```ts
// 之前
function getUser(id: string) {
  return { id, name: '张三' }
}

// 之后（改了结构，忘了改调用方）
function getUser(id: string) {
  return { userId: id, name: '张三' }
}
```

JS 不会报错，运行时才炸。**TypeScript 会在编译期直接拦住你。**

## 类型即文档

```ts
interface Order {
  id: string
  userId: string
  amount: number
  status: 'pending' | 'paid' | 'cancelled'
}
```

看到 `status` 的联合类型，你就知道它只有这三种状态，不用去翻文档、翻数据库。

## 三条实践原则

1. **别用 `any` 逃逸** —— 用 `unknown` + 类型守卫
2. **边界处收窄** —— 外部数据进来先校验
3. **让类型帮你重构** —— 改接口后编译器会指出所有需要改的地方

## 小结

类型系统不是负担，是**免费的自测**。项目越大，收益越明显。
