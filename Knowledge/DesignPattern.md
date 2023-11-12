# 面向对象
```text
面向对象的基本特征
面向对象的三个基本特征是：封装、继承、多态

封装

封装最好理解了。封装是面向对象的特征之一，是对象和类概念的主要特性。封装，也就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。

继承

继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。通过继承创建的新类称为“子类”或“派生类”，被继承的类称为“基类”、“父类”或“超类”。

要实现继承，可以通过“继承”（Inheritance）和“组合”（Composition）来实现。

多态性

多态性（polymorphisn）是允许你将父对象设置成为和一个或更多的他的子对象相等的技术，赋值之后，父对象就可以根据当前赋值给它的子对象的特性以不同的方式运作。简单的说，就是一句话：允许将子类类型的指针赋值给父类类型的指针。

实现多态，有两种方式，覆盖和重载。覆盖和重载的区别在于，覆盖在运行时决定，重载是在编译时决定。并且覆盖和重载的机制不同，例如在 Java 中，重载方法的签名必须不同于原先方法的，但对于覆盖签名必须相同。
```
# 设计模式
```text
设计模式
简介
在 1994 年，由 Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides 四人合著出版了一本名为 Design Patterns - Elements of Reusable Object-Oriented Software（中文译名：设计模式 - 可复用的面向对象软件元素） 的书，该书首次提到了软件开发中设计模式的概念。 四位作者合称 GOF（四人帮，全拼 Gang of Four）。他们所提出的设计模式主要是基于以下的面向对象设计原则。

对接口编程而不是对实现编程。
优先使用对象组合而不是继承。
设计模式六大原则
单一职责原则：即一个类应该只负责一项职责
里氏替换原则：所有引用基类的地方必须能透明地使用其子类的对象
依赖倒转原则：高层模块不应该依赖低层模块，二者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象
接口隔离原则：客户端不应该依赖它不需要的接口；一个类对另一个类的依赖应该建立在最小的接口上
迪米特法则：一个对象应该对其他对象保持最少的了解
开闭原则：对扩展开放，对修改关闭
设计模式归纳

单例模式（Singleton）
单例模式是一种常见的设计模式，在 Cocoa 开发中也经常使用。

一个简单的单例模式示例代码如下：

/* Singleton.h */ 
#import "Foundation/Foundation.h"
@interface Singleton : NSObject 
+ (Singleton *)shardInstance; 
@end 

/* Singleton.m */ 
#import "Singleton.h" 
static Singleton *instance = nil; 

@implementation Singleton 
+ (Singleton *)sharedInstance { 
    if (!instance) { 
        instance = [[super allocWithZone:NULL] init]; 
    } 
    return instance; 
}
Cocoa 库本身在一些地方也使用了单例模式，例如[NSNotificationCenter defaultCenter]，[UIColor redColor]等。

这种写法的优点是，可以延迟加载，按需分配内存以节省开销。

但是，这并非一个线程安全的写法，比如两个或多个线程并发的调用 sharedInstance 方法，有可能会得到多个实例，这里列出两种方法来创建一个线程安全的单例。

@synchronized
可以使用@synchronized进行加锁，代码如下：

/* Singleton.h */
#import <Foundation/Foundation.h>
@interface Singleton : NSObject
+ (Singleton *)sharedInstance;
@end
/* Singleton.m */
#import "Singleton.h"
static Singleton *instance = nil;
@implementation Singleton 
+ (Singleton *)sharedInstance { 
    @synchronized (self) {
        if (!instance) { 
            instance = [[super alloc] init];
        } 
    }
    return instance; 
}
这种写法也是懒加载，不过虽然保证了线程安全但是由于锁的存在当多线程访问时，性能会降低。

GCD
这里主要利用GCD中的dispatch_once方法，这是最普遍也是苹果最推荐的方法，函数原型如下：

void dispatch_once(
   dispatch_once_t *predicate,
   dispatch_block_t block);
单例实现代码如下：

/* Singleton.h */
#import <Foundation/Foundation.h>
@interface Singleton : NSObject
+ (Singleton *)sharedInstance;
@end
/* Singleton.m */
#import "Singleton.h"
static Singleton *instance = nil;
@implementation Singleton 
+ (Singleton *)sharedInstance { 
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        instance = [[Singleton alloc] init];
    });
    return instance; 
}
这样的方法有很多优势，首先满足了线程安全问题，其次很好满足静态分析器要求。

GCD 可以确保以更快的方式完成这些检测，它可以保证 block 中的代码在任何线程通过 dispatch_once 调用之前被执行，但它不会强制每次调用这个函数都让代码进行同步控制。

苹果的文档 documentation for dispatch_once 是这么说的：

The predicate must point to a variable stored in global or static scope. The result of using a predicate with automatic or dynamic storage (including Objective-C instance variables) is undefined.

所以，如果你的 predicate 不是静态的、不是全局的，还是不能用GCD。其实如果去看这个函数所在的头文件，你会发现目前它的实现其实是一个宏。

工厂模式（Factory）
工厂模式是另一种常见的设计模式，本质上是使用方法来简化类的选择和初始化过程。

下面是一个网上到处都是的简单工厂模式的例子：

//
//  OperationFactory.m
//  FactoryPattern

#import "OperationFactory.h"
#import "Operation.h"
#import "OperationAdd.h"
#import "OperationSub.h"
#import "OperationMul.h"
#import "OperationDiv.h"

@implementation OperationFactory

+ (Operation *) createOperat:(char)operate{
    Operation *oper = nil;
    switch (operate) {
        case '+':
        {
            oper = [[OperationAdd alloc] init];
            break;
        }
        case '-':
        {
            oper = [[OperationSub alloc] init];
            break;
        }
        case '*':
        {
            oper = [[OperationMul alloc] init];
            break;
        }
        case '/':
        {
            oper = [[OperationDiv alloc] init];
            break;
        }
        default:
            break;
    }
    return oper;
}
@end
由于 Objective-C 本身的动态特性，还可以用反射来改写：

@implementation OperationFactory
+ (Operation *) createOperat:(NSString *)operate{
    Operation *oper = nil;
    Class class = NSClassFromString(operate);
    oper = [(Operation *)[class alloc] init];
    if ([oper respondsToSelector:@selector(getResult)]) {
        [oper getResult];
    }
    return oper;
}
@end
使用时，可以传入类名，来获取对应类的对象：

Operation *oper = [OperationFactory createOperat: @"OperationAdd"];
oper.numberA = 10;
oper.numberB = 20;
NSLog(@"%f", oper.getResult);
委托模式（Delegate）
委托模式是 Cocoa 中十分常见的设计模式，在 Cocoa 库中被大量的使用。在 Objective-C 中，委托模式通常使用协议（protocol）来实现。

委托模式的示例代码：

@protocol PrintDelegate <NSObject>
- (void)print;
@end


@interface AClass : NSObject<PrintDelegate>
@property id<PrintDelegate> delegate;
@end

@implementation AClass

-(void)sayHello {
    [self.delegate print];
}

-(void)print {
    NSLog(@"Do Print");
}
@end

// 使用 AClass
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        AClass * a = [AClass new];
        a.delegate = a;
        [a sayHello];
    }
    return 0;
}
这里对象a的 delegate 设置为自己，也可以是任何一个实现了 PrintDelegate 协议的对象。

观察者模式（Observer）
Cocoa 中提供了两种用于实现观察者模式的办法，一直是使用NSNotification，另一种是KVO(Key Value Observing)。

NSNotification
NSNotification 基于 Cocoa 自己的消息中心组件 NSNotificationCenter 实现。

观察者需要统一在消息中心注册，说明自己要观察哪些值的变化。观察者通过类似下面的函数来进行注册：

[[NSNotificationCenter defaultCenter] addObserver:self
                         selector:@selector(printName:)
                             name: @"messageName"
                           object:nil];
上面的函数表明把自身注册成 "messageName" 消息的观察者，当有消息时，会调用自己的 printName 方法。

消息发送者使用类似下面的函数发送消息：

[[NSNotificationCenter defaultCenter] postNotificationName:@"messageName"
                                    object:nil
                                  userInfo:nil];
KVO(Key Value Observing)
KVO的实现依赖于 Objective-C 本身强大的 KVC(Key Value Coding) 特性，可以实现对于某个属性变化的动态监测。

示例代码如下：

// Book类
@interface Book : NSObject

@property NSString *name;
@property CGFloat price;

@end

// AClass类
@class Book;
@interface AClass : NSObject

@property (strong) Book *book;

@end

@implementation AClass

- (id)init:(Book *)theBook {
    if(self = [super init]){
        self.book = theBook;
        [self.book addObserver:self forKeyPath:@"price" options:NSKeyValueObservingOptionOld|NSKeyValueObservingOptionNew context:nil];
    }
    return self;
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context{
    if([keyPath isEqual:@"price"]){
        NSLog(@"------price is changed------");
        NSLog(@"old price is %@",[change objectForKey:@"old"]);
        NSLog(@"new price is %@",[change objectForKey:@"new"]);
    }
}

- (void)dealloc{
    [self.book removeObserver:self forKeyPath:@"price"];
}
@end

// 使用 KVO
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Book *aBook = [Book new];
        aBook.price = 10.9;
        AClass * a = [[AClass alloc] init:aBook];
        aBook.price = 11; // 输出 price is changed
    }
    return 0;
}
```
# MVC & MVVM
```text
Model View Controller

Model View ViewModel（invented dom）
```
# 链表
```text
例题
单链表翻转 LeetCode 206
这个问题可以使用递归和非递归两种方法解决。

递归算法实现：

ListNode* reverseList(ListNode* head)
{
    if(NULL == head || NULL == head->next)
        return head;
    ListNode * p = reverseList(head->next);
    head->next->next = head;
    head->next = NULL;

    return p;
}
非递归算法实现：

ListNode* reverseList(ListNode* head) {
    ListNode *curr = head;
    if (curr == NULL) {
        return NULL;
    }

    ListNode *prev = NULL, *temp = NULL;
    while (curr != NULL) {
        temp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = temp;
    }

    return prev;
}
单链表判断是否有环 LeetCode 141
最容易想到的思路是存一个所有 Node 地址的 Hash 表，从头开始遍历，将 Node 存到 Hash 表中，如果出现了重复，则说明链表有环。

一个经典的方法是双指针（也叫快慢指针），使用两个指针遍历链表，一个指针一次走一步，另一个一次走两步，如果链表有环，两个指针必然相遇。

双指针算法实现：

bool hasCycle(ListNode *head) {
    if (head == nullptr) {
        return false;
    }
    ListNode *fast,*slow;
    slow = head;
    fast = head->next;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
单链表找环入口 LeetCode 141
作为上一题的扩展，为了找到环所在的位置，在快慢指针相遇的时候，此时慢指针没有遍历完链表，再设置一个指针从链表头部开始遍历，这两个指针相遇的点，就是链表环的入口。

算法实现：

ListNode *detectCycle(ListNode *head) {
    if (head == nullptr) {
        return nullptr;
    }
    ListNode *fast,*slow;
    slow = head;
    fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            ListNode *slow2 = head;
            while (slow2 != slow) {
                slow = slow->next;
                slow2 = slow2->next;
            }
            return slow2;
        }
    }
    return nullptr;
}
单链表找交点 LeetCode 160
和找环的方法类似，同样可以使用 Hash 表存储所有节点，发现重复的节点即交点。

一个容易想到的方法是，先得到两个链表的长度，然后得到长度的差值 distance，两个指针分别从两个链表头部遍历，其中较长链表指针先走 distance 步，然后同时向后走，当两个指针相遇的时候，即链表的交点：

int getListLength(ListNode *head) {
    if (head == nullptr) {
        return 0;
    }
    int length = 0;
    ListNode *p = head;
    while (p!=nullptr) {
        p = p->next;
        length ++;
    }
    return length;
}

ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
    int lengthA = getListLength(headA);
    int lengthB = getListLength(headB);

    if (lengthA > lengthB) {
        std::swap(headA, headB);
    };
    int distance = abs(lengthB - lengthA);
    ListNode *p1 = headA;
    ListNode *p2 = headB;
    while(distance--) {
        p2 = p2->next;
    }
    while (p1 != nullptr && p2 != nullptr) {
        if (p1 == p2)
            return p1;
        p1 = p1->next;
        p2 = p2->next;
    }
    return NULL;
}
另一个较快的方法时，两个指针 pa，pb 分别从 headA，headB开始遍历，当 pa 遍历到尾部的时候，指向 headB，当 pb 遍历到尾部的时候，转向 headA。当两个指针再次相遇的时候，如果两个链表有交点，则指向交点，如果没有则指向 NULL：

ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
    ListNode *pa = headA;
    ListNode *pb = headB;

    while (pa != pb) {
        pa = pa != nullptr ? pa->next : headB;
        pb = pb != nullptr ? pb->next : headA;
    }

    return pa;
}
单链表找中间节点 LeetCode 876
用快慢指针法，当快指针走到链表结尾时，慢指针刚好走到链表的中间：

ListNode* middleNode(ListNode* head) {
    ListNode *slow = head;
    ListNode *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    return slow;
}
单链表合并 LeetCode 21
两个链表本身都是排序过的，把两个链表从头节点开始，逐个节点开始进行比较，最后剩下的节点接到尾部：

ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
    if (l1 == nullptr) {
        return l2;
    }
    if (l2 == nullptr) {
        return l1;
    }
    ListNode dummy(-1);
    ListNode *p = &dummy;
    for (; l1 && l2; p = p->next) {
        if (l1->val < l2->val) {
            p->next = l1;
            l1 = l1->next;
        } else {
            p->next = l2;
            l2 = l2->next;
        }
    }
    p->next = l1 != nullptr ? l1 : l2;
    return dummy.next;
}
```
# 树
```text
基本知识
二叉树
二叉树：二叉树是有限个结点的集合，这个集合或者是空集，或者是由一个根结点和两株互不相交的二叉树组成，其中一株叫根的做左子树，另一棵叫做根的右子树。

二叉树的性质：

性质1：在二叉树中第 i 层的结点数最多为2^(i-1)（i ≥ 1）
性质2：高度为k的二叉树其结点总数最多为2^k－1（ k ≥ 1）
性质3：对任意的非空二叉树 T ，如果叶结点的个数为 n0，而其度为 2 的结点数为 n2，则：n0 = n2 + 1
满二叉树：深度为k且有2^k －1个结点的二叉树称为满二叉树

完全二叉树：深度为 k 的，有n个结点的二叉树，当且仅当其每个结点都与深度为 k 的满二叉树中编号从 1 至 n 的结点一一对应，称之为完全二叉树。（除最后一层外，每一层上的节点数均达到最大值；在最后一层上只缺少右边的若干结点）

性质4：具有 n 个结点的完全二叉树的深度为 log2n + 1
注意：

仅有前序和后序遍历，不能确定一个二叉树，必须有中序遍历的结果
堆
如果一棵完全二叉树的任意一个非终端结点的元素都不小于其左儿子结点和右儿子结点（如果有的话） 的元素，则称此完全二叉树为最大堆。

同样，如果一棵完全二叉树的任意一个非终端结点的元素都不大于其左儿子结点和右儿子结点（如果 有的话）的元素，则称此完全二叉树为最小堆。

最大堆的根结点中的元素在整个堆中是最大的；

最小堆的根结点中的元素在整个堆中是最小的。

哈弗曼树
定义：给定n个权值作为n的叶子结点，构造一棵二叉树，若带权路径长度达到最小，称这样的二叉树为最优二叉树，也称为哈夫曼树(Huffman tree)。

构造：

假设有n个权值，则构造出的哈夫曼树有n个叶子结点。 n个权值分别设为 w1、w2、…、wn，则哈夫曼树的构造规则为：

将w1、w2、…，wn看成是有 n 棵树的森林(每棵树仅有一个结点)；
在森林中选出两个根结点的权值最小的树合并，作为一棵新树的左、右子树，且新树的根结点权值为其左、右子树根结点权值之和；
从森林中删除选取的两棵树，并将新树加入森林；
重复(2)、(3)步，直到森林中只剩一棵树为止，该树即为所求得的哈夫曼树。
二叉排序树
二叉排序树（Binary Sort Tree）又称二叉查找树（Binary Search Tree），亦称二叉搜索树。

二叉排序树或者是一棵空树，或者是具有下列性质的二叉树：

若左子树不空，则左子树上所有结点的值均小于它的根结点的值；
若右子树不空，则右子树上所有结点的值均大于或等于它的根结点的值；
左、右子树也分别为二叉排序树；
没有键值相等的节点
二分查找的时间复杂度是O(log(n))，最坏情况下的时间复杂度是O(n)（相当于顺序查找）

平衡二叉树
平衡二叉树（balanced binary tree）,又称 AVL 树。它或者是一棵空树,或者是具有如下性质的二叉树：

它的左子树和右子树都是平衡二叉树，
左子树和右子树的深度之差的绝对值不超过1。
平衡二叉树是对二叉搜索树(又称为二叉排序树)的一种改进。二叉搜索树有一个缺点就是，树的结构是无法预料的，随意性很大，它只与节点的值和插入的顺序有关系，往往得到的是一个不平衡的二叉树。在最坏的情况下，可能得到的是一个单支二叉树，其高度和节点数相同，相当于一个单链表，对其正常的时间复杂度有O(log(n))变成了O(n)，从而丧失了二叉排序树的一些应该有的优点。

B-树
B-树：B-树是一种非二叉的查找树， 除了要满足查找树的特性，还要满足以下结构特性：

一棵 m 阶的B-树：

树的根或者是一片叶子(一个节点的树),或者其儿子数在 2 和 m 之间。
除根外，所有的非叶子结点的孩子数在 m/2 和 m 之间。
所有的叶子结点都在相同的深度。
B-树的平均深度为logm/2(N)。执行查找的平均时间为O(logm)；

Trie 树
Trie 树，又称前缀树，字典树， 是一种有序树，用于保存关联数组，其中的键通常是字符串。与二叉查找树不同，键不是直接保存在节点中，而是由节点在树中的位置决定。一个节点的所有子孙都有相同的前缀，也就是这个节点对应的字符串，而根节点对应空字符串。一般情况下，不是所有的节点都有对应的值，只有叶子节点和部分内部节点所对应的键才有相关的值。

Trie 树查询和插入时间复杂度都是 O(n)，是一种以空间换时间的方法。当节点树较多的时候，Trie 树占用的内存会很大。

Trie 树常用于搜索提示。如当输入一个网址，可以自动搜索出可能的选择。当没有完全匹配的搜索结果，可以返回前缀最相似的可能。

例题
二叉树的遍历
二叉树前中后序遍历
二叉树的前中后序遍历，使用递归算法实现最为简单，以前序遍历（LeetCode 144）为例：

 void preorder(TreeNode *p, vector<int>& result) {
    if (p == NULL) {
        return;
    }

    result.push_back(p->val);
    preorder(p->left, result);
    preorder(p->right, result);
}

vector<int> preorderTraversal(TreeNode* root) {
    vector<int> result;
        if (root == nullptr) {
        return result;
    }

    preorder(root, result);
    return result;
}
二叉树的非递归遍历，主要的思想是使用栈（Stack）来进行存储操作，记录经过的节点。

非递归前序遍历（LeetCode 144）：

vector<int> preorderTraversal(TreeNode* root) {
    TreeNode *p = root;
    vector<int> result;
    if (!p) {
        return result;
    }

    stack<TreeNode *> q;
    while (p || !q.empty()) {
        if (p) {
            result.push_back(p->val);
            q.push(p);
            p = p->left;
        }
        else {
            p = q.top();
            q.pop();
            p = p->right;
        }
    }
    return result;
}
非递归中序遍历（LeetCode 94）：

vector<int> inorderTraversal(TreeNode* root) {
    TreeNode *p = root;
    vector<int> result;
    if (!p) {
        return result;
    }

    stack<TreeNode *> q;
    while (p || !q.empty()) {
        if (p) {
            q.push(p);
            p = p->left;
        }
        else {
            p = q.top();
            result.push_back(p->val);
            q.pop();
            p = p->right;
        }
    }
    return result;
}
非递归遍历中，后序遍历相对更难实现，因为需要在遍历完左右子节点之后，再遍历根节点，因此不能直接将根节点出栈。这里使用一个 last 指针记录上次出栈的节点，当且仅当节点的右孩子为空（top->right == NULL），或者右孩子已经出栈（top->right == last），才将本节点出栈：

非递归后序遍历（LeetCode 145）：

 vector<int> postorderTraversal(TreeNode* root) {
    TreeNode *p = root;
    vector<int> result;
    if (!p) {
        return result;
    }

    TreeNode *top, *last = NULL;
    stack<TreeNode *> q;
    while (p || !q.empty()) {
        if (p) {
            q.push(p);
            p = p->left;
        } else {
            top = q.top();
            if (top->right == NULL || top->right == last) {
                q.pop();
                result.push_back(top->val);
                last = top;
            } else {
                p = top->right;
            }
        }
    }

    return result;
}
二叉树层序遍历 LeetCode 102
二叉树层序遍历有两种方法，分别是深度优先和广度优先：

深度优先（DFS）实现：

void traversal(TreeNode *root, int level, vector<vector<int>> &result) {
    if (!root) {
        return;
    }
    // 保证每一层只有一个vector
    if (level > result.size()) {
        result.push_back(vector<int>());
    }
    result[level-1].push_back(root->val);
    traversal(root->left, level+1, result);
    traversal(root->right, level+1, result);
}

vector<vector<int> > levelOrder(TreeNode *root) {
    vector<vector<int>> result;
    traversal(root, 1, result);
    return result;
}
广度优先（BFS）实现：

vector<vector<int>> levelOrder(TreeNode* root) {
    std:queue<TreeNode *> q;
    TreeNode *p;

    vector<vector<int>> result;
    if (root == NULL) return result;

    q.push(root);

    while (!q.empty()) {
        int size = q.size();
        vector<int> levelResult;

        for (int i = 0; i < size; i++) {
            p = q.front();
            q.pop();

            levelResult.push_back(p->val);

            if (p->left) {
                q.push(p->left);
            }
            if (p->right) {
                q.push(p->right);
            }
        }

        result.push_back(levelResult);
    }

    return result;
}
二叉树子树 LeetCode 572
判断二叉树是否是另一棵二叉树的子树，使用递归实现：

bool isSubtree(TreeNode* s, TreeNode* t) {
    if (!s) return false;
    if (sameTree(s, t)) return true;
    return isSubtree(s->left, t) || isSubtree(s->right, t);
}

bool sameTree(TreeNode* s, TreeNode* t) {
    if (!s && !t) return true;
    if (!s || !t) return false;
    if (s->val != t->val) return false;
    return sameTree(s->left, t->left) && sameTree(s->right, t->right);
}
翻转二叉树 LeetCode 226
交互树的左右儿子节点，使用递归实现：

TreeNode* invertTree(TreeNode* root) {
    if (root == nullptr) {
        return nullptr;
    }
    TreeNode *tmp = root->left;
    root->left = root->right;
    root->right = tmp;
    if (root->left) {
        invertTree(root->left);
    }
    if (root->right) {
        invertTree(root->right);
    }
    return root;
}
```
# 哈希表
```text
哈希表
哈希表（Hash Table，也叫散列表），是根据关键码值 (Key-Value) 而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。哈希表的实现主要需要解决两个问题，哈希函数和冲突解决。

哈希函数
哈希函数也叫散列函数，它对不同的输出值得到一个固定长度的消息摘要。理想的哈希函数对于不同的输入应该产生不同的结构，同时散列结果应当具有同一性（输出值尽量均匀）和雪崩效应（微小的输入值变化使得输出值发生巨大的变化）。

冲突解决
现实中的哈希函数不是完美的，当两个不同的输入值对应一个输出值时，就会产生“碰撞”，这个时候便需要解决冲突。

常见的冲突解决方法有开放定址法，链地址法，建立公共溢出区等。实际的哈希表实现中，使用最多的是链地址法

链地址法
链地址法的基本思想是，为每个 Hash 值建立一个单链表，当发生冲突时，将记录插入到链表中。

例 2 设有 8 个元素 { a,b,c,d,e,f,g,h } ，采用某种哈希函数得到的地址分别为： {0 ， 2 ， 4 ， 1 ， 0 ， 8 ， 7 ， 2} ，当哈希表长度为 10 时，采用链地址法解决冲突的哈希表
```
# 排序
```text
排序算法的评价
稳定性
稳定排序算法会依照相等的关键（换言之就是值）维持纪录的相对次序。也就是一个排序算法是稳定的，就是当有两个有相等关键的纪录R和S，且在原本的串行中R出现在S之前，在排序过的串行中R也将会是在S之前。

计算复杂度（最差、平均、和最好表现）
依据串行（list）的大小（n），一般而言，好的表现是O(nlogn)，且坏的行为是O(n2)。对于一个排序理想的表现是O(n)。仅使用一个抽象关键比较运算的排序算法总平均上总是至少需要O(nlogn)。

所有基于比较的排序的时间复杂度至少是 O(nlogn)。

常见排序算法
常见的稳定排序算法有：

冒泡排序（Bubble Sort） — O(n²)
插入排序（Insertion Sort）— O(n²)
桶排序（Bucket Sort）— O(n); 需要 O(k) 额外空间
计数排序 (Counting Sort) — O(n+k); 需要 O(n+k) 额外空间
合并排序（Merge Sort）— O(nlogn); 需要 O(n) 额外空间
二叉排序树排序 （Binary tree sort） — O(n log n) 期望时间; O(n²)最坏时间; 需要 O(n) 额外空间
基数排序（Radix sort）— O(n·k); 需要 O(n) 额外空间
常见的不稳定排序算法有：

选择排序（Selection Sort）— O(n²)
希尔排序（Shell Sort）— O(nlogn)
堆排序（Heapsort）— O(nlogn)
快速排序（Quicksort）— O(nlogn) 期望时间, O(n²) 最坏情况; 对于大的、乱数串行一般相信是最快的已知排序
冒泡排序
冒泡排序是最简单最容易理解的排序算法之一，其思想是通过无序区中相邻记录关键字间的比较和位置的交换,使关键字最小的记录如气泡一般逐渐往上“漂浮”直至“水面”。 冒泡排序的复杂度，在最好情况下，即正序有序，则只需要比较n次。故，为O(n) ，最坏情况下，即逆序有序，则需要比较(n-1)+(n-2)+……+1，故，为O(n²)。

乌龟和兔子
在冒泡排序中，最大元素的移动速度是最快的，哪怕一开始最大元素处于序列开头，也可以在一轮内层循环之后，移动到序列末尾。而对于最小元素，每一轮内层循环只能向前挪动一位，如果最小元素在序列末尾，就需要 n-1 次交换才能移动到序列开头。这两种类型的元素分别被称为兔子和乌龟。

代码实现：
private static void BubbleSort(int[] array)
{
    for (var i = 0; i < array.Length - 1; i++)  // 若最小元素在序列末尾，需要 n-1 次交换，才能交换到序列开头
    {
        for (var j = 0; j < array.Length - 1; j++)
        {
            if (array[j] > array[j + 1])   // 若这里的条件是 >=，则变成不稳定排序
            {
                Swap(array, j, j+1);
            }
        }
    }
}
优化
在非最坏的情况下，冒泡排序过程中，可以检测到整个序列是否已经排序完成，进而可以避免掉后续的循环：

private static void BubbleSort(int[] array)
{
    for (var i = 0; i < array.Length - 1; i++)
    {
        var swapped = false;
        for (var j = 0; j < array.Length - 1; j++)
        {
            if (array[j] > array[j + 1])
            {
                Swap(array, j, j+1);
                swapped = true;
            }
        }

        if (!swapped)  // 没有发生交互，证明排序已经完成
        {
            break;
        }
    }
}
进一步地，在每轮循环之后，可以确认，最后一次发生交换的位置之后的元素，都是已经排好序的，因此可以不再比较那个位置之后的元素，大幅度减少了比较的次数：

private static void BubbleSort(int[] array)
{
    var n = array.Length;
    for (var i = 0; i < array.Length - 1; i++)
    {
        var newn = 0;
        for (var j = 0; j < n - 1; j++)
        {
            if (array[j] > array[j + 1])
            {
                Swap(array, j, j+1);
                newn = j + 1;   // newn 以及之后的元素，都是排好序的
            }
        }

        n = newn;

        if (n == 0)
        {
            break;
        }
    }
}
更进一步地，为了优化之前提到的乌龟和兔子问题，可以进行双向的循环，正向循环把最大元素移动到末尾，逆向循环把最小元素移动到最前，这种优化过的冒泡排序，被称为鸡尾酒排序：

private static void CocktailSort(int[] array)
{
    var begin = 0;
    var end = array.Length - 1;
    while (begin <= end)
    {
    var newBegin = end;
    var newEnd = begin;

    for (var j = begin; j < end; j++)
    {
        if (array[j] > array[j + 1])
        {
        Swap(array, j, j + 1);
        newEnd = j + 1;
        }
    }

    end = newEnd - 1;

    for (var j = end; j > begin - 1; j--)
    {
        if (array[j] > array[j + 1])
        {
        Swap(array, j, j + 1);
        newBegin = j;
        }
    }

    begin = newBegin + 1;
    }
}
插入排序
插入排序也是一个简单的排序算法，它的思想是，每次只处理一个元素，从后往前查找，找到该元素合适的插入位置，最好的情况下，即正序有序(从小到大)，这样只需要比较n次，不需要移动。因此时间复杂度为O(n) ，最坏的情况下，即逆序有序，这样每一个元素就需要比较n次，共有n个元素，因此实际复杂度为O(n²) 。

算法实现：
private static void InsertionSort(int[] array)
{
    int i = 1;
    while (i < array.Length)
    {
    var j = i;
    while (j > 0 && array[j - 1] > array[j])
    {
        Swap(array, j, j - 1);
        j--;
    }

    i++;
    }
}
快排
快排是经典的 divide & conquer 问题，如下用于描述快排的思想、伪代码、代码、复杂度计算以及快排的变形。

快排的思想
如下的三步用于描述快排的流程：

在数组中随机取一个值作为标兵
对标兵左、右的区间进行划分(将比标兵大的数放在标兵的右面，比标兵小的数放在标兵的左面，如果倒序就反过来)
重复如上两个过程，直到选取了所有的标兵并划分(此时每个标兵决定的区间中只有一个值，故有序)
伪代码
如下是快排的主体伪代码

QUCIKSORT(A, p, r)
if p < r
    q = PARTITION(A, p, r)
    QUICKSORT(A, p, q-1)
    QUICKSORT(A, q+1, r)
如下是用于选取标兵以及划分的伪代码

PARTITION(A, p, r)
x = A[r]
i = p - 1
for j = p to r - 1
    if A[j] <= x
        i++
        swap A[i] with A[j]
swap A[i+1] with A[j]
return i+1
代码
func quickSort(inout targetArray: [Int], begin: Int, end: Int) {
    if begin < end {
        let pivot = partition(&targetArray, begin: begin, end: end)
        quickSort(&targetArray, begin: begin, end: pivot - 1)
        quickSort(&targetArray, begin: pivot + 1, end: end)
    }
}

func partition(inout targetArray: [Int], begin: Int, end: Int) -> Int {
    let value = targetArray[end]
    var i = begin - 1
    for j in begin ..< end {
        if  targetArray[j] <= value {
            i += 1;
            swapTwoValue(&targetArray[i], b: &targetArray[j])
        }
    }
    swapTwoValue(&targetArray[i+1], b: &targetArray[end])
    return i+1
}

func swapTwoValue(inout a: Int, inout b: Int) {
    let c = a
    a = b
    b = c
}

var testArray :[Int] = [123,3333,223,231,3121,245,1123]

quickSort(&testArray, begin: 0, end: testArray.count-1)
复杂度分析
在最好的情况下，每次 partition 都会把数组一分为二，所以时间复杂度 T(n) = 2T(n/2) + O(n)

解为 T(n) = O(nlog(n))

在最坏的情况下，数组刚好和想要的结果顺序相同，每次 partition 到的都是当前无序区中最小(或最大)的记录，因此只得到一个比上一次划分少一个记录的子序列。T(n) = O(n) + T(n-1)

解为 T(n) = O(n²)

在平均的情况下，快排的时间复杂度是 O(nlog(n))

变形
可以利用快排的 PARTITION 思想求数组中第K大元素这样的问题，步骤如下：

在数组中随机取一个值作为标兵，左右分化后其顺序为X
如果 X == Kth 说明这就是第 K 大的数
如果 X > Kth 说明第 K 大的数在标兵左边，继续在左边寻找第 Kth 大的数
如果 X < Kth 说明第 K 大的数在标兵右边，继续在右边需找第 Kth - X 大的数
这个问题的时间复杂度是 O(n)

T(n) = n + n/2 + n/4 + ... = O(n)
```
# 随机
```text
洗牌算法
洗牌算法，顾名思义，就是只利用一次循环等概率的取到不同的元素(牌)。

如果元素存在于数组中，即可将每次 random 到的元素 与 最后一个元素进行交换，然后 count--，即可。

这相当于把这个元素删除，代码如下：

#include <iostream>
#include <ctime> 
using namespace std;

const int maxn = 10;

int a[maxn];

int randomInt(int a) {
    return rand()%a;
}
void swapTwoElement(int*x,int*y) {
     int temp;
     temp=*x;
     *x=*y;
     *y=temp;
}

int main(){
    int count = sizeof(a)/sizeof(int);
    int count_b = count;
    srand((unsigned)time(NULL));
    for (int i = 0; i < count; ++i) { a[i] = i; }
    for (int i = 0; i < count_b; ++i) {
        int random = randomInt(count);
        cout<<a[random]<<" ";
        swapTwoElement(&a[random],&a[count-1]);
        count--;
    }
}
```
# T
```text

```
