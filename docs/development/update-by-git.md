# 通过 Git 更新

我们推荐您使用 Git 管理系统的代码，这是目前世界上最好的版本管理工具，没有之一。

除了下面的命令，可能图形化的界面也适合您，例如：`SourceTree`

## 更新代码

```shell
# 保存工作现场（将目前还不想提交的但是已经修改的代码保存至堆栈中）
git stash

# 从远程仓库获取最新代码并自动合并到本地
git pull

# 恢复工作现场
git stash pop
```

## 更新时额外可能会用到的命令

```shell
# 查看远程仓库信息
git remote -v

# 查看 stash 队列
git stash list

# 清空 stash 队列
git stash clear
```
