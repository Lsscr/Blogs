---
order: 1
icon: 'page'
data: 2022-06-03
category:
  - 算法
tag:
  - 排序
---

# 排序与二分

## 快速排序

### 主要思想 分治

1. 确定分界点: 一般为a[l]
2. 划分: **划分调整区间,左边部分全部小于=x,右边的部分全部大于=x**
3. 递归: 递归处理左右两部分

### 代码模块
```c++
#include <iostream>
using namespace std;
const int N = le6 + 10;

int n;
int a[N];

void quick_sort(int a[],int l,int r){
    //如果数组里没有数或者是一个数都不需要去排序
    if(l >= r) return;
    //定义开始的边界,两个指针分别在边界的两边,因为交换后两边都要往前一步,配合do..while效果比较好
    int x=a[l+r>>1],i=l-1,j=r+1;
    //循化迭代
    while(i<j){
        //i站到要交换的位置了
        do i++; while(a[i] < x);
        //j站到要交换的位置了
        do j--; while(a[j] > x);
        //如果两个不冲突,就交换位置
        if(i < j) swap(a[i],a[j]);
    }
    //递归
    quick_sort(a,l,j);
    quick_sort(a,j+1,r);
}

int main(){
    scanf("%d",&n);
    for(int i=0;i<n;i++) scanf("%d",&a[i]);
    
    quick_sort(a,0,n-1);
    
    for(int i=0;i<n;i++) printf("%d",a[i]);
    return 0;
}
```

## 归并排序

### 主要思想 分治

1. 确认分界点: mid=(l+r)/2
2. 递归排序: 递归排序左右两边部分
3. 归并: **归并左右两边,合二为一** O(n)


### 代码模块
```c++
void merge_sort(int a[],int l,int r){
    //当前只有一个数或者是没有数的话,不用排序
    if(l>=r) return;
    //取中点,用了位运算
    int mid = l + r >> 1;
    //递归排序左部分和右部分
    merge_sort(a,l,mid),merge_sort(a,mid+1,r);
    
    //k表示已经归并了几个数,i为左半边的边界,j为右半边的边界
    int k=0;i = l;j = mid+1;
    //左右两边排好序了,进行归并
    while(i <= mid && j <= r)
        //把左边最小的拿过来
        if(a[i] <= a[j]) tmp[k++] = a[i++];
   		//把右边最小的拿过来
    	ekse tmp[k++]= a[j++];
    //把左边剩下的拿过来
    while(i <= mid) tmp[k++]=a[i++];
    //把右边剩下的拿过来
    while(j <= r) tmp[k++]=a[j++];
    
    //临时的数组,重新赋值给原数组
    for(int i=l,j=0;i<=r;i++,j++) a[i] = tmp[j];
}
```

## 整数二分 