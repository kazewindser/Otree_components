# Otree_components
Components used in my otree programming
## otreeslider_countdown
+ 在基本的slider构架上，增添了一个参数用以判断用户有无输入。
+ 适用于有限时任务的实验。
+ 倒计时结束后，如果没有input，otree会把数值型，input的值改为0，此时无法分辨用户的0和默认的0，
+ 通过增添参数，可以通过辨认有没有click，来分辨两种情况 
