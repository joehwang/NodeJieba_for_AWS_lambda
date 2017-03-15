在aws lambda運行含有binary code的 module
========================================

以NodeJieba為例

據amazon文件所述(http://docs.aws.amazon.com/zh_cn/lambda/latest/dg/current-supported-versions.html)

`
底层 AWS Lambda 执行环境建立在以下各项的基础之上：

公用 Amazon Linux AMI 版本（AMI 名称：amzn-ami-hvm-2016.03.3.x86_64-gp2）：
有关使用 AMI 的信息，请参阅Amazon EC2 用户指南（适用于 Linux 实例） 中的 Amazon 系统映像 (AMI)。
Linux 内核版本 - 4.4.35-33.55.amzn1.x86_64
如果您使用代码中的任何本机二进制文件，请确保在此环境编译这些文件。注意，在 AWS Lambda 上仅支持 64 位二进制文件。

AWS Lambda 支持以下运行时版本：

Node.js - v0.10.36，v4.3.2（建议）
`

最快的方法就是在ec2上開一台 Amazon Linux AMI的機器，在機器中進行打包

參考https://blogs.csc.com/2016/08/02/creating-your-own-lambda-function-using-node-js/

設定環境

`sudo yum groupinstall 'Development Tools'`

`wget https://nodejs.org/dist/v4.3.2/node-v4.3.2-linux-x64.tar.gz`

解開`node-v4.3.2-linux-x64.tar.gz`

設定路徑`PATH=$PATH:~/node-v4.3.2-linux-x64/bin/`

建立aws command tool的登入認證

mkdir ~/.aws && cd ~/.aws

vim config

`
[default]
output = json
region = ap-northeast-1(你的region)`

vim credentials

`[default]
aws_access_key_id = xxxxxxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxx`

複製你的lambda function到這台機器然後運行、測試

然後打包

`zip -r xxx.zip index.js node_modules`

`aws lambda update-function-code --function-name xxxxxx --zip-file fileb://xxx.zip`

完成!
