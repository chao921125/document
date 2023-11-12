生成随机正整数的概率相等的几种情况
(1) 生成 [n,m)，包含n但不包含m的正整数：
parseInt(Math.random()*(m-n)+n)

(2) 生成 (n,m]，不包含n但包含m的正整数：
parseInt(Math.random()*(m-n)+n)+1

(3) 生成 [n,m]，包含n和m的随机数：
parseInt(Math.random()*(m-n+1)+n)

(4) 生成 (n,m)，不包含n和m的正整数：
parseInt(Math.random()*(m-n-1)+n+1)

