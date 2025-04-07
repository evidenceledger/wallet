.PHONY: rundocker buiddocker

builddocker:
	docker build -t wallet .

rundev:
	docker run -v ${PWD}:/app -p 3030:3030 -t --name wallet -d wallet

