var todocnt,donecnt;
function getData(x)
{
	var s=localStorage.getItem(x);
	if (s==null) return "";
	return s;
}
function saveData(x,s)
{
	var s0=getData(x);
	s0+=s+'@';
	localStorage.setItem(x,s0);
}
function loadPage()
{
	var s,s0,i,k,a=[];
	s=getData("todo");
	k=0,a=[];
	for (i=0;i<s.length;i++)
		if (s[i]=='@')
		{
			a.push(s.substring(k,i));
			k=i+1;
		}
	todocnt=a.length;
	document.getElementById("todocnt").innerHTML=todocnt;
	s0="";
	for (i=todocnt-1;i>=0;i--)
		s0+="<li>"+a[i]+"<a href='javascript:window.del1("+i+")'>delete</a><a href='javascript:window.finish("+i+")'>finish</a></li>";
	document.getElementById("todolist").innerHTML=s0;
	s=getData("done");
	k=0,a=[];
	for (i=0;i<s.length;i++)
		if (s[i]=='@')
		{
			a.push(s.substring(k,i));
			k=i+1;
		}
	donecnt=a.length;
	document.getElementById("donecnt").innerHTML=donecnt;
	s0="";
	for (i=donecnt-1;i>=0;i--)
		s0+="<li>"+a[i]+"<a href='javascript:window.del2("+i+")'>delete</a></li>";
	document.getElementById("donelist").innerHTML=s0;
}
function add1()
{
	var shuru=document.getElementById("input");
	if (shuru.value=="")
	{
		alert("Please input a correct item!");
		return;
	}
	saveData("todo",shuru.value);
	document.getElementById("form").reset();
	loadPage();
}
function del1(t)
{
	var s,k,i;
	s=getData("todo");
	k=0,a=[];
	for (i=0;i<s.length;i++)
		if (s[i]=='@')
		{
			a.push(s.substring(k,i));
			k=i+1;
		}
	a.splice(t,1);
	todocnt=a.length;
	s="";
	for (i=0;i<todocnt;i++) s+=a[i]+'@';
	localStorage.setItem("todo",s);
	loadPage();
}
function del2(t)
{
	var s,k,i;
	s=getData("done");
	k=0,a=[];
	for (i=0;i<s.length;i++)
		if (s[i]=='@')
		{
			a.push(s.substring(k,i));
			k=i+1;
		}
	a.splice(t,1);
	donecnt=a.length;
	s="";
	for (i=0;i<donecnt;i++) s+=a[i]+'@';
	localStorage.setItem("done",s);
	loadPage();
}
function finish(t)
{
	var s,k,i;
	s=getData("todo");
	k=0,a=[];
	for (i=0;i<s.length;i++)
		if (s[i]=='@')
		{
			a.push(s.substring(k,i));
			k=i+1;
		}
	var name=a[t];
	a.splice(t,1);
	todocnt=a.length;
	s="";
	for (i=0;i<todocnt;i++) s+=a[i]+'@';
	localStorage.setItem("todo",s);
	s=getData("done");
	k=0,a=[];
	for (i=0;i<s.length;i++)
		if (s[i]=='@')
		{
			a.push(s.substring(k,i));
			k=i+1;
		}
	a.push(name);
	donecnt=a.length;
	s="";
	for (i=0;i<donecnt;i++) s+=a[i]+'@';
	localStorage.setItem("done",s);
	loadPage();
}
function clear()
{
	localStorage.clear();
	todocnt=0,donecnt=0;
	loadPage();
}
window.onload=function()
{
	loadPage();
}