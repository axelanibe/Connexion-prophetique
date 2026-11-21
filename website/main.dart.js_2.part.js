((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ga:function Ga(){},TW:function TW(d){this.$ti=d},aXG:function aXG(d){this.a=d},aXH:function aXH(d,e){this.a=d
this.b=e},
a3x(d){var x,w,v,u,t=new B.aui(),s=J.N(d),r=s.h(d,"id")
r=J.m(r==null?"":r)
x=s.h(d,"conversation_id")
J.m(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.m(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.m(w==null?"":w)
A.an(s.h(d,"appele_id"))
A.an(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.m(v==null?"audio":v)
u=s.h(d,"statut")
u=J.m(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.auh(r,x,w,v,u)},
c7t(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.m(s==null?"":s)
x=u.h(d,"appel_id")
J.m(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.m(x==null?"":x)
w=u.h(d,"type")
w=J.m(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mO(t,y.N,y.z):C.ej
if(u.h(d,"cree_le")!=null)A.c9(J.m(u.h(d,"cree_le")))
return new B.Je(s,x,w,v)},
ckT(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.V4
x=A.a([],y.t)
for(r=J.au(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mO(s,u,t))}return new B.a57(x)},
bTt(d){var x=C.d.aq(d.a,1e6)
return C.c.b_(C.d.j(C.d.aq(x,60)),2,"0")+":"+C.c.b_(C.d.j(C.d.ae(x,60)),2,"0")},
cct(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.pm(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.all(w,v)},
czX(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.alo(u,A.jE(w)?w:null,v)},
auh:function auh(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
aui:function aui(){},
Je:function Je(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a57:function a57(d){this.a=d},
c4p(d,e,f,g,h,i){return new B.pQ(e,f,i,h,d,null)},
c4o(d,e,f,g,h,i){return new B.AG(f,i,g,h,d,e,null)},
c8Q(d,e,f,g,h,i,j,k,l,m,n){return new B.afQ(g,f,e,i,h,d,m,l,k,j,n,null)},
pQ:function pQ(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Xm:function Xm(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.z=!1
_.c=_.a=null},
biP:function biP(d){this.a=d},
biQ:function biQ(d){this.a=d},
biM:function biM(d){this.a=d},
biN:function biN(d){this.a=d},
biJ:function biJ(d){this.a=d},
biK:function biK(d){this.a=d},
biL:function biL(d){this.a=d},
biG:function biG(d){this.a=d},
biH:function biH(d){this.a=d},
biI:function biI(d){this.a=d},
biO:function biO(d){this.a=d},
W0:function W0(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
AG:function AG(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.y=i
_.a=j},
Xl:function Xl(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.at=_.as=_.Q=_.z=_.y=_.x=!1
_.ax=!0
_.ay=null
_.ch=e
_.dx=_.db=_.cy=_.cx=_.CW=null
_.dy=$
_.fr=!1
_.fx=null
_.fy=!1
_.c=_.a=null},
bio:function bio(d){this.a=d},
bip:function bip(d){this.a=d},
biq:function biq(d){this.a=d},
bir:function bir(d){this.a=d},
bin:function bin(d){this.a=d},
bis:function bis(d){this.a=d},
bit:function bit(d){this.a=d},
biu:function biu(d){this.a=d},
bim:function bim(d,e){this.a=d
this.b=e},
biv:function biv(){},
biw:function biw(d){this.a=d},
biz:function biz(d){this.a=d},
biA:function biA(d){this.a=d},
biB:function biB(d){this.a=d},
biC:function biC(d){this.a=d},
biD:function biD(d){this.a=d},
biE:function biE(d){this.a=d},
bix:function bix(d,e){this.a=d
this.b=e},
biy:function biy(){},
bil:function bil(d,e){this.a=d
this.b=e},
bik:function bik(d,e){this.a=d
this.b=e},
bij:function bij(d,e){this.a=d
this.b=e},
biF:function biF(d){this.a=d},
afQ:function afQ(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.Q=m
_.as=n
_.a=o},
yA:function yA(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aX3:function aX3(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aX4:function aX4(d){this.a=d},
aX5:function aX5(d){this.a=d},
aX6:function aX6(d){this.a=d},
a4U:function a4U(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
axQ:function axQ(d){this.a=d},
axR:function axR(d){this.a=d},
ari(d){var x=y.U,w=A.G(new A.Y(A.a(d.split(" "),y.s),new B.bUo(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(C.b.gP(w),0).toUpperCase()
return(J.q(C.b.gP(w),0)+J.q(C.b.gaO(w),0)).toUpperCase()},
bUo:function bUo(){},
a8t:function a8t(){this.a=null},
aRO:function aRO(){},
tk:function tk(d,e){this.e=d
this.b=e},
aN5:function aN5(d){this.a=d},
aN6:function aN6(d){this.a=d},
bYo(d){var x=new B.a8Y(d)
x.azV(d)
return x},
a8Y:function a8Y(d){this.d=d},
aN2:function aN2(d){this.a=d},
aN3:function aN3(d){this.a=d},
aN4:function aN4(d){this.a=d},
aMP:function aMP(){},
aMR:function aMR(){},
aMS:function aMS(){},
aMT:function aMT(d){this.a=d},
aMQ:function aMQ(d){this.a=d},
cqB(d,e){var x=y.N
x=new B.aaF(d,e,A.E(x,y.E),A.E(x,y.z))
x.aA0(d,e)
return x},
aaF:function aaF(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aRQ:function aRQ(d){this.a=d},
aRR:function aRR(d){this.a=d},
aRS:function aRS(d){this.a=d},
aRT:function aRT(d){this.a=d},
aRU:function aRU(d){this.a=d},
aRV:function aRV(d){this.a=d},
aRW:function aRW(d){this.a=d},
aRX:function aRX(d){this.a=d},
aRP:function aRP(d){this.a=d},
aaG:function aaG(){},
bYY:function bYY(d){this.a=d},
cC3(){return C.b.mR(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bUw())!==-1},
bUw:function bUw(){},
c6P(){var x=A.a([],y.d),w=$.c6Q
$.c6Q=w+1
return new B.So(w,x,D.akW,$.aj())},
So:function So(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aS2:function aS2(d){this.a=d},
aRZ:function aRZ(d){this.a=d},
aS_:function aS_(d){this.a=d},
aS0:function aS0(d){this.a=d},
aS1:function aS1(){},
bYZ(d,e,f){return new B.Sq(d,f,e,null)},
Sq:function Sq(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Sr:function Sr(){this.c=this.a=null},
aS3:function aS3(){},
aS5:function aS5(d){this.a=d},
aS4:function aS4(d){this.a=d},
c50(d,e,f,g){var x,w={}
w.a=d
x=new B.a7j(g.i("a7j<0>"))
x.azL(e,f,w,g)
return x},
a7j:function a7j(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aGa:function aGa(d,e){this.a=d
this.b=e},
aG9:function aG9(d){this.a=d},
Ye:function Ye(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bns:function bns(){},
ad_:function ad_(d){this.b=this.a=$
this.$ti=d},
ad0:function ad0(){},
bX3(d,e){return B.ck5(d,e)},
ck5(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bX3=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.oT("ws")&&!d.oT("wss"))throw A.n(A.fq(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.zU(r,A.fI(null,null,null,!1,y.D))
u=new A.ay($.aI,y.u)
p=new A.b2(u,y.V)
if(J.t(r.readyState,1))p.co(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.h_(new B.K8("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.p9(r,"open",!1,y.C).gP(0).aB(new B.awp(p,q),y.H)
t=y.C
s=y.H
new A.p9(r,"error",!1,t).gP(0).aB(new B.awq(p,q),s)
A.ik(r,"message",new B.awr(q),!1,y.m)
new A.p9(r,"close",!1,t).gP(0).aB(new B.aws(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bX3,w)},
zU:function zU(d,e){this.a=d
this.b=e},
awp:function awp(d,e){this.a=d
this.b=e},
awq:function awq(d,e){this.a=d
this.b=e},
awr:function awr(d){this.a=d},
aws:function aws(d,e){this.a=d
this.b=e},
bZC(){return new B.K7("Connection Closed")},
ua:function ua(){},
JD:function JD(d){this.a=d},
Fl:function Fl(d){this.a=d},
FM:function FM(d,e){this.a=d
this.b=e},
K8:function K8(d){this.a=d},
K7:function K7(d){this.a=d},
cjB(d){var x=null,w=$.aI,v=new B.ad_(y.Z),u=y.X,t=A.fI(x,x,x,!0,u),s=A.fI(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.c50(new A.cA(s,r.i("cA<1>")),new A.Ez(t,q.i("Ez<1>")),!0,u)
v.b=B.c50(new A.cA(t,q.i("cA<1>")),new A.Ez(s,r.i("Ez<1>")),!1,u)
v=new B.asp(new A.b2(new A.ay(w,y.W),y.R),v)
v.azz(d)
return v},
asp:function asp(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ast:function ast(d){this.a=d},
asq:function asq(d){this.a=d},
asr:function asr(d){this.a=d},
ass:function ass(d,e){this.a=d
this.b=e},
asu:function asu(d){this.a=d},
ap7:function ap7(d,e){this.b=d
this.a=e},
aea:function aea(d){this.a=d},
cBD(d){switch(d){case"new":return D.akJ
case"checking":return D.akK
case"connected":return D.akM
case"completed":return D.akL
case"failed":return D.Lh
case"disconnected":return D.akO
case"closed":return D.Li
case"count":return D.akN}return D.Li},
cBE(d){switch(d){case"new":return D.Lj
case"gathering":return D.akP
case"complete":return D.akQ}return D.Lj},
cDx(d){switch(d){case"stable":return D.akR
case"have-local-offer":return D.akS
case"have-local-pranswer":return D.akU
case"have-remote-offer":return D.akT
case"have-remote-pranswer":return D.akV
case"closed":return D.Lp}return D.Lp},
cCP(d){switch(d){case"new":return D.Lm
case"connecting":return D.Ln
case"connected":return D.Lo
case"closed":return D.tl
case"disconnected":return D.Ll
case"failed":return D.Lk}return D.tl},
xH:function xH(d,e){this.a=d
this.b=e},
Sk:function Sk(d,e){this.a=d
this.b=e},
xG:function xG(d,e){this.a=d
this.b=e},
nw:function nw(d,e){this.a=d
this.b=e},
aaH:function aaH(d,e){this.a=d
this.b=e},
aRN:function aRN(){},
QY:function QY(){},
HA:function HA(){},
aMO:function aMO(){},
In:function In(d,e,f){this.a=d
this.b=e
this.c=f},
Sl:function Sl(){},
Sm:function Sm(){},
aRY:function aRY(){},
CK:function CK(d,e){this.a=d
this.b=e},
Sn:function Sn(d){this.b=d},
Sp:function Sp(d,e,f){this.a=d
this.b=e
this.c=f},
bY1(d){var x=0,w=A.k(y.y)
var $async$bY1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bY1,w)},
aP5(d){var x=0,w=A.k(y.H),v
var $async$aP5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b14("enableSpeakerphone",A.a9(["enable",d],y.N,v),v,v),$async$aP5)
case 2:return A.i(null,w)}})
return A.j($async$aP5,w)},
b14(d,e,f,g){return B.ctl(d,e,f,g,f.i("0?"))},
ctl(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b14=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b13(),$async$b14)
case 3:v=D.GV.cc(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b14,w)},
b13(){var x=0,w=A.k(y.H),v,u
var $async$b13=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c8B?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.GV.cc("initialize",A.a9(["options",A.E(v,u)],v,u),!1,y.H),$async$b13)
case 4:$.c8B=!0
case 3:return A.i(null,w)}})
return A.j($async$b13,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[29]
E=c[19]
B.Ga.prototype={
D(d,e){this.a.D(0,e)},
dd(d,e){this.a.dd(d,e)},
a0(d){return this.a.a0(0)},
$idV:1}
B.TW.prototype={
hb(d){var x=A.cs("subscription"),w=A.fI(new B.aXG(x),null,null,!0,this.$ti.y[1])
x.b=d.fc(new B.aXH(this,w),w.gmK(w),w.got())
return new A.cA(w,A.x(w).i("cA<1>"))}}
B.auh.prototype={}
B.Je.prototype={}
B.a57.prototype={}
B.pQ.prototype={
N(){return new B.Xm()}}
B.Xm.prototype={
U(){var x,w=this
w.X()
w.a.toString
w.z=!0
x=new B.a8t()
w.y!==$&&A.bi()
w.y=x
x.rS("assets/audio/sonnerie-appel.wav")
w.My()
w.r=A.dk(C.c0,new B.biP(w))
w.w=A.hV(C.y7,new B.biQ(w))},
l(){var x=this,w=x.r
if(w!=null)w.W(0)
w=x.w
if(w!=null)w.W(0)
w=x.x
if(w!=null)w.W(0)
w=x.y
w===$&&A.d()
w.i6()
if(x.z)w.hk()
x.a1()},
a_7(){var x=this.x
if(x!=null)x.W(0)
this.x=A.dk(C.h0,new B.biM(this))},
Qn(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Qn=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.Ce(p.c),$async$Qn)
case 7:r=e
q=B.a3x(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.biN(s))
p=s.r
if(p!=null)p.W(0)
p=s.w
if(p!=null)p.W(0)
p=s.y
p===$&&A.d()
p.i6()
s.a_7()}u=2
x=6
break
case 4:u=3
m=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Qn,w)},
My(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$My=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.aa()
x=7
return A.e(n.Ce(o.c),$async$My)
case 7:r=e
q=B.a3x(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gJQ()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.biJ(s))
o=s.y
o===$&&A.d()
o.i6()
s.a_7()
x=1
break}s.m(new B.biK(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.biL(s))
o=s.y
o===$&&A.d()
o.i6()
s.a_7()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$My,w)},
Mk(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Mk=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.m(new B.biG(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.e(p.S5(q.c,"accepte"),$async$Mk)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.R(n)
if(s.c==null){x=1
break}s.m(new B.biH(s))
q=s.c
q.toString
p=J.m(r)
q.u(y.q).f.B(A.B(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.W(0)
q=s.w
if(q!=null)q.W(0)
q=s.y
q===$&&A.d()
q.i6()
q=s.c
q.toString
A.ad(q,!1).yD(A.ek(new B.biI(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Mk,w)},
GK(d){return this.aVO(d)},
aVN(){return this.GK(!1)},
aVO(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$GK=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.W(0)
r=s.w
if(r!=null)r.W(0)
r=s.y
r===$&&A.d()
r.i6()
u=4
r=s.a
r.toString
q=$.aa()
x=7
return A.e(q.S5(r.c,"refuse"),$async$GK)
case 7:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.ad(r,!1).bL()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GK,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.kq(C.r,s,A.c(B.ari(r.d),s,s,s,s,D.NI,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.Nz,C.W,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.au,new A.a1(D.yv,x,s),C.k,A.c(q,s,s,s,s,D.ux,s,s,s),D.MV],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.biO(t)
v=A.b("Accepter")
u=t.f?s:t.gaAH()
q.push(A.V(A.a([new B.W0(D.ze,C.aE,r,x,s),D.aor,new B.W0(D.qu,C.cE,v,u,s)],w),C.o,C.bA,C.i,s))}if(t.d)q.push(C.wP)
return A.eQ(s,C.n,A.fy(!0,A.cM(A.K(q,C.o,C.f,C.V),s,s),!0,C.aa,!0,!0),s,s,s)}}
B.W0.prototype={
C(d){var x=this,w=null,v=A.dg(x.d,w,w,C.aa,C.cT,w)
return A.K(A.a([A.ae(A.b8(!1,A.cd(x.c,C.l,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e0,w,w,w)],y.p),C.o,C.f,C.V)}}
B.AG.prototype={
N(){return new B.Xl(A.b3(y.N),C.S)}}
B.Xl.prototype={
U(){var x,w,v=this,u=null
v.X()
v.r=v.a.c
x=B.c6P()
w=B.c6P()
v.d!==$&&A.bi()
v.d=new B.aX3(x,w)
x=v.a
x.toString
w=new B.a4U(new A.dI(u,u,y.g),new A.dI(u,u,y.n))
v.e!==$&&A.bi()
v.e=w
v.fr=!0
w=new B.a8t()
v.dy!==$&&A.bi()
v.dy=w
if(x.f)w.rS("assets/audio/tonalite-appel.wav")
v.a.toString
v.qS()},
l(){var x=this,w=x.CW
if(w!=null)w.W(0)
w=x.cx
if(w!=null)w.W(0)
w=x.cy
if(w!=null)w.W(0)
w=x.db
if(w!=null)w.W(0)
w=x.dx
if(w!=null)w.W(0)
w=x.dy
w===$&&A.d()
w.i6()
if(x.fr)w.hk()
if(x.at){x.at=!1
x.zJ(!1)}w=x.d
w===$&&A.d()
w.hk()
w=x.e
w===$&&A.d()
w.Iz()
x.a1()},
qS(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$qS=A.f(function(a0,a1){if(a0===1){t=a1
x=u}while(true)switch(x){case 0:s.cx=A.dk(C.c0,new B.bio(s))
r="appel"
u=4
q=null
h=s.a
g=h.y
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$qS)
case 10:q=a1
s.r=B.a3x(q).a
x=8
break
case 9:g=$.aa()
x=11
return A.e(g.Ce(h.c),$async$qS)
case 11:q=a1
s.r=s.a.c
case 8:p=B.a3x(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.nn(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.aa()
s.w=h.gJQ()
r="ice"
s.a.toString
o=h.Sd()
n=s.Gw()
x=12
return A.e(o,$async$qS)
case 12:m=a1
l=B.ckT(m)
x=15
return A.e(n,$async$qS)
case 15:x=!a1?13:14
break
case 13:if(s.c==null){x=1
break}s.m(new B.bip(s))
x=16
return A.e(A.jX(C.jI,null,y.z),$async$qS)
case 16:if(s.c==null){x=1
break}s.nn(null)
x=1
break
case 14:if(s.a.f&&!s.x&&!s.y){s.as=s.at=!0
s.zJ(!0)}r="webrtc"
g=s.d
g===$&&A.d()
f=s.a.d
x=17
return A.e(g.yB(A.a9(["iceServers",l.a],y.N,y.z),f==="video"),$async$qS)
case 17:g.f=new B.biq(s)
g.r=new B.bir(s)
g.w=new B.bis(s)
if(s.c==null){x=1
break}s.m(new B.bit(s))
s.cy=A.hV(C.cq,new B.biu(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.c5(f,A.x(f).i("c5<1>")).cL(s.gb08())
f=g.w
s.dx=new A.c5(f,A.x(f).i("c5<1>")).cL(new B.biv())
s.a.toString
k=h.b
if(k!=null&&J.a4(k)!==0){s.a.toString
g.Rj(C.c.UB("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eM(C.bN,k,C.ad,!0))}s.CW=A.hV(C.h0,new B.biw(s))
s.G6()
u=2
x=6
break
case 4:u=3
d=t
j=A.R(d)
i=A.bg(d)
if(s.c==null){x=1
break}A.uJ().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.de?j.a:s.aQZ(r)
h.u(y.q).f.B(A.B(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.nn(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$qS,w)},
aQZ(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Gw(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Gw=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.WY(),$async$Gw)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.D1(s.a.d==="video"),$async$Gw)
case 8:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
p=t
v=!1
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gw,w)},
WY(){var x=0,w=A.k(y.y),v
var $async$WY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$WY,w)},
G6(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$G6=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.aa()
x=7
return A.e(p.c0("/messagerie/appels/"+s.r+"/signaux"),$async$G6)
case 7:r=e
for(p=J.au(r);p.A();){q=p.gK(p)
s.aik(B.c7t(q))}u=2
x=6
break
case 4:u=3
n=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$G6,w)},
aik(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cct(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.BJ(A.a9(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.biz(s),y.a).fo(new B.biA(s))
break
case"reponse":if(!s.a.f)return
u=B.cct(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.QS(A.a9(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.biB(s),y.a).fo(new B.biC(s))
break
case"candidat_ice":t=B.czX(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.QL(A.a9(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.It().aB(new B.biD(s),y.a).fo(new B.biE(s))
break
case"refuse":s.nn(A.b("Appel refus\xe9"))
break
case"annule":s.nn(A.b("Appel annul\xe9"))
break
case"termine":s.nn(A.b("Appel termin\xe9"))
break}},
afe(){var x,w,v=this
if(v.x)return
x=v.cx
if(x!=null)x.W(0)
x=v.dy
x===$&&A.d()
x.i6()
w=v.at
v.m(new B.bix(v,w))
if(w)v.zJ(!1)},
A4(d,e,f){return this.aI1(d,e,f)},
abA(d,e){return this.A4(d,e,!0)},
aI1(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$A4=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.aa()
x=6
return A.e(s.amf(t.r,e,d),$async$A4)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$A4,w)},
GG(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$GG=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.W(0)
r=s.dy
r===$&&A.d()
r.i6()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.aa()
x=9
return A.e(q.S5(r,"termine"),$async$GG)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.ad(r,!1).bL()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GG,w)},
nn(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.W(0)
x=v.dy
x===$&&A.d()
x.i6()
x=v.r
if(x.length!==0){v.a.toString
w=$.aa()
w.S5(x,"termine").fo(new B.biy())}if(d!=null&&v.c!=null)v.c.u(y.q).f.B(A.B(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.m,u,u,u,u,u,u,u,u,u))
x=v.c
if(x!=null)A.ad(x,!1).bL()},
MI(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MI=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.VS(u),$async$MI)
case 2:if(v.c!=null)v.m(new B.bil(v,u))
return A.i(null,w)}})
return A.j($async$MI,w)},
MH(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MH=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Eh(u),$async$MH)
case 2:if(v.c!=null)v.m(new B.bik(v,u))
return A.i(null,w)}})
return A.j($async$MH,w)},
zJ(d){return this.aBP(d)},
aBP(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$zJ=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.d
r===$&&A.d()
x=6
return A.e(r.Eh(d),$async$zJ)
case 6:v=1
x=5
break
case 3:v=2
p=u
s=A.R(p)
A.uJ().$1("Appel : haut-parleur sonnerie impossible : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$zJ,w)},
ME(){var x=0,w=A.k(y.H),v=this,u,t
var $async$ME=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.VP(u),$async$ME)
case 2:if(v.c!=null)v.m(new B.bij(v,u))
return A.i(null,w)}})
return A.j($async$ME,w)},
MF(){var x=0,w=A.k(y.H),v=this,u
var $async$MF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.QX(),$async$MF)
case 2:return A.i(null,w)}})
return A.j($async$MF,w)},
C(d){var x,w,v,u,t,s,r,q,p=this,o=null,n="Appel en cours\u2026",m="\xc7a sonne\u2026",l="Connexion\u2026",k=p.d
k===$&&A.d()
x=k.c
w=p.a
if(w.d==="video"&&p.z){if(x!=null)x=B.bYZ(k.e,!1,D.Lq)
else{x=A.kq(C.r,o,A.c(B.ari(w.e),o,o,o,o,D.arW,o,o,o),o,48)
w=p.a
v=A.c(w.e,o,o,o,o,D.arA,o,o,o)
if(p.x)w=A.b(n)+" "+B.bTt(p.ch)
else w=w.f&&p.z?A.b(m):A.b(l)
w=A.cM(A.K(A.a([x,C.p,v,C.k,A.c(w,o,o,o,o,D.ux,o,o,o)],y.p),C.o,C.f,C.V),o,o)
x=w}x=A.S2(0,x)
k=A.fk(o,A.f9(A.P(12),B.bYZ(k.d,!0,D.Lq),C.ap),160,o,o,16,16,110)
w=p.x
v=B.bTt(p.ch)
u=p.Q
t=p.as
u=A.em(C.aX,A.a([x,k,A.fk(24,B.c8Q(p.ax,v,w,!0,t,u,p.ga99(),p.ga98(),p.ga9a(),p.ga9b(),p.gafy()),o,o,0,0,o,o)],y.p),C.h,C.aW,o)
k=u}else{x=y.p
w=A.a([],x)
if(p.fy)w.push(A.fk(o,A.tp(B.bYZ(k.e,!1,D.tm),0),1,o,0,o,0,1))
k=A.kq(C.r,o,A.c(B.ari(p.a.e),o,o,o,o,D.NI,o,o,o),o,56)
v=p.a
u=A.c(v.e,o,o,o,o,D.Nz,C.W,o,o)
t=p.fx
if(t==null)if(p.x)v=A.b(n)+" "+B.bTt(p.ch)
else if(p.z)v=v.f?A.b(m):A.b(n)
else v=A.b(l)
else v=t
v=A.c(v,o,o,o,o,D.ux,C.W,o,o)
t=p.x
s=B.bTt(p.ch)
r=p.Q
q=p.as
w.push(A.cM(A.K(A.a([k,C.au,new A.a1(D.yv,u,o),C.k,v,D.MV,B.c8Q(p.ax,s,t,!1,q,r,p.ga99(),p.ga98(),p.ga9a(),p.ga9b(),p.gafy())],x),C.o,C.f,C.V),o,o))
w=A.em(C.aX,w,C.h,C.aW,o)
k=w}return A.bYQ(!1,A.eQ(o,C.n,A.fy(!0,k,!0,C.aa,!0,!0),o,o,o),new B.biF(p),y.K)}}
B.afQ.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.NL,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_O:D.a_N
t=A.a([new B.yA(x,r,A.b("Muet"),v.x,u,u),D.o5,new B.yA(D.a_U,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.o5)
if(r){x=v.w
w=x?D.zk:D.a_T
t.push(new B.yA(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.o5)
if(r)t.push(new B.yA(D.a_S,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.o5)
t.push(new B.yA(D.ze,!1,A.b("Raccrocher"),v.as,C.aE,u))
s.push(A.V(t,C.o,C.bA,C.i,u))
return A.K(s,C.o,C.f,C.V)}}
B.yA.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lY
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dg(u,v,v,C.aa,C.cT,v)
return A.K(A.a([A.ae(A.b8(!1,A.cd(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aV,A.c(w.e,v,v,v,v,C.NM,v,v,v)],y.p),C.o,C.f,C.V)}}
B.aX3.prototype={
D1(d){return this.bdu(d)},
bdu(d){var x=0,w=A.k(y.H),v,u=this,t,s,r
var $async$D1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.iU(0),$async$D1)
case 3:$.c1_()
if(d){s=y.N
s=A.a9(["facingMode","user"],s,s)}else s=!1
x=4
return A.e(new B.aMP().E4(0,A.a9(["audio",!0,"video",s],y.N,y.z)),$async$D1)
case 4:r=f
u.b=r
t.sa7b(0,r)
case 1:return A.i(v,w)}})
return A.j($async$D1,w)},
yB(d,e){return this.bed(d,e)},
bed(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$yB=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.iU(0),$async$yB)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.D1(e),$async$yB)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.c1_().a23(d,A.E(y.N,y.z)),$async$yB)
case 6:t=v.a=g
s=u.a6p(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a0V(0,s[q],u),$async$yB)
case 10:case 8:s.length===r||(0,A.Q)(s),++q
x=7
break
case 9:t.e=new B.aX4(v)
t.Q=new B.aX5(v)
t.d=new B.aX6(v)
return A.i(null,w)}})
return A.j($async$yB,w)},
aGk(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa7b(0,d)
x=w.r
if(x!=null)x.$0()}},
It(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$It=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ag("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Rx(0),$async$It)
case 3:t=e
x=4
return A.e(s.Ej(0,t),$async$It)
case 4:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$It,w)},
BJ(d){return this.b5z(d)},
b5z(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$BJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ag("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.El(0,new B.CK(d.h(0,"sdp"),d.h(0,"type"))),$async$BJ)
case 3:x=4
return A.e(s.Ru(0),$async$BJ)
case 4:t=f
x=5
return A.e(s.Ej(0,t),$async$BJ)
case 5:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$BJ,w)},
QS(d){return this.b2x(d)},
b2x(d){var x=0,w=A.k(y.H),v=this,u
var $async$QS=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.ag("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.El(0,new B.CK(d.h(0,"sdp"),d.h(0,"type"))),$async$QS)
case 2:return A.i(null,w)}})
return A.j($async$QS,w)},
QL(d){return this.b2i(d)},
b2i(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$QL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Qy(new B.In(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dO(d.h(0,"sdpMLineIndex")))),$async$QL)
case 3:case 1:return A.i(v,w)}})
return A.j($async$QL,w)},
VS(d){return this.ati(d)},
ati(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$VS=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Vs(0)
if(r==null)r=C.dw
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.Q)(r),++s)r[s].sl5(0,t)
return A.i(null,w)}})
return A.j($async$VS,w)},
Eh(d){return this.at8(d)},
at8(d){var x=0,w=A.k(y.H)
var $async$Eh=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aP5(d),$async$Eh)
case 2:return A.i(null,w)}})
return A.j($async$Eh,w)},
VP(d){return this.at0(d)},
at0(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$VP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Lk(0)
if(s==null)s=C.dw
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.Q)(s),++t)s[t].sl5(0,d)
return A.i(null,w)}})
return A.j($async$VP,w)},
QX(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$QX=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Lk(0)
if(s==null)s=D.acf
if(s.length===0){x=1
break}x=3
return A.e(B.bY1(C.b.gP(s)),$async$QX)
case 3:case 1:return A.i(v,w)}})
return A.j($async$QX,w)},
hk(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$hk=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a0(0)
x=7
return A.e(y.x.b(q)?q:A.dm(q,y.H),$async$hk)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:s.a=null
q=s.b
q=q==null?null:q.a6p(0)
if(q==null)q=C.dw
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.cjv(r)
if(!m.b(k)){j=new A.ay($.aI,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$hk)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.Q)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.l(),$async$hk)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:u=22
x=25
return A.e(s.e.l(),$async$hk)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$hk,w)}}
B.a4U.prototype={
Rj(d){return this.b3S(d)},
b3S(d){var x=0,w=A.k(y.H),v=this
var $async$Rj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.ES(),$async$Rj)
case 2:return A.i(null,w)}})
return A.j($async$Rj,w)},
ES(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$ES=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.cjB(B.bX3(A.cK(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$ES)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cA(p,A.x(p).i("cA<1>")).aV(s.gaVw(),!0,s.gaUx(),new B.axQ(s))
u=2
x=6
break
case 4:u=3
n=t
s.ZW()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ES,w)},
aVx(d){var x,w,v,u
try{x=C.Y.cG(0,J.m(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.c7t(w))}catch(u){}},
ZW(){var x,w=this,v=w.c
if(v!=null)v.W(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a8r[v]
w.f=v+1
v=w.d
if(v!=null)v.W(0)
w.d=A.dk(A.df(0,0,0,0,x),new B.axR(w))},
Iz(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Iz=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.W(0)
s=t.c
s=s==null?null:s.W(0)
x=2
return A.e(y.x.b(s)?s:A.dm(s,y.H),$async$Iz)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b1()
r=s.w=new B.ap7(s,q)}s=r.a0(0)}x=7
return A.e(y._.b(s)?s:A.dm(s,y.z),$async$Iz)
case 7:v=1
x=6
break
case 4:v=3
o=u
x=6
break
case 3:x=1
break
case 6:t.b=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Iz,w)}}
B.a8t.prototype={
rS(d){return this.bb1(d)},
bb1(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$rS=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.a3J():r).aL(0),$async$rS)
case 6:x=7
return A.e(t.a.a6I(d),$async$rS)
case 7:x=8
return A.e(t.a.j1(C.GD),$async$rS)
case 8:x=9
return A.e(t.a.i1(1),$async$rS)
case 9:x=10
return A.e(t.a.d_(0),$async$rS)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.R(p)
A.uJ().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$rS,w)},
i6(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$i6=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aL(0)
x=6
return A.e(y.x.b(s)?s:A.dm(s,y.H),$async$i6)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$i6,w)},
hk(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hk=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.l()
x=6
return A.e(y.x.b(s)?s:A.dm(s,y.H),$async$hk)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:t.a=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$hk,w)}}
B.aRO.prototype={
a23(d,e){return this.b5p(d,e)},
b5p(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a23=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a9(["mandatory",A.E(r,r),"optional",A.a([A.a9(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fu(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.c1(t)))
t=J.m(s)
v=B.cqB(C.c7.gjK().b5(new A.f0(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a23,w)}}
B.tk.prototype={
Vs(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cX(w,A.X(w).i("cX<1,aB>"))
J.h6(w,new B.aN5(x))
return x},
Lk(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cX(w,A.X(w).i("cX<1,aB>"))
J.h6(w,new B.aN6(x))
return x},
a6p(d){var x=A.G(this.Vs(0),!0,y.G)
C.b.t(x,this.Lk(0))
return x}}
B.a8Y.prototype={
azV(d){var x=this,w=x.d
w.addEventListener("ended",A.bP(new B.aN2(x)))
w.addEventListener("mute",A.bP(new B.aN3(x)))
w.addEventListener("unmute",A.bP(new B.aN4(x)))},
sl5(d,e){this.d.enabled=e},
aL(d){var x=0,w=A.k(y.H),v=this
var $async$aL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aL,w)}}
B.aMP.prototype={
E4(d,e){return this.as6(0,e)},
as6(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$E4=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cC3())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.jb(e.h(0,"video"),"facingMode")
e.cz(0,"video",new B.aMR())
e.cz(0,"audio",new B.aMS())}catch(a0){A.o1("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.ig(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.E(y.N,y.z)
J.h6(s,new B.aMT(r))
J.jb(e.h(0,"audio"),"optional")
J.ja(e.h(0,"audio"),r)}}catch(a0){q=A.R(a0)
p=A.bg(a0)
A.o1("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.c1(e)
x=10
return A.e(A.e2(o.getUserMedia(h.a(n)),h),$async$E4)
case 10:m=a2
v=new B.tk(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.e2(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$E4)
case 11:l=a2
v=new B.tk(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.R(f)
i=J.m(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$E4,w)}}
B.aaF.prototype={
aA0(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bP(new B.aRQ(x)))
w.addEventListener("icecandidate",A.bP(new B.aRR(x)))
w.addEventListener("iceconnectionstatechange",A.bP(new B.aRS(x)))
w.onicegatheringstatechange=A.bP(new B.aRT(x))
w.addEventListener("signalingstatechange",A.bP(new B.aRU(x)))
if(!$.c0M())w.addEventListener("connectionstatechange",A.bP(new B.aRV(x)))
w.addEventListener("negotiationneeded",A.bP(new B.aRW(x)))
w.addEventListener("track",A.bP(new B.aRX(x)))},
Rx(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Rx=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e2(s.createOffer(y.m.a(A.c1(A.E(y.N,y.z)))),y.A),$async$Rx)
case 3:t=f
v=new B.CK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Rx,w)},
Ru(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Ru=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e2(s.createAnswer(y.m.a(A.c1(A.E(y.N,y.z)))),y.A),$async$Ru)
case 3:t=f
v=new B.CK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ru,w)},
Ej(d,e){return this.atc(0,e)},
atc(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Ej=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e2(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Ej)
case 2:return A.i(null,w)}})
return A.j($async$Ej,w)},
El(d,e){return this.att(0,e)},
att(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$El=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e2(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$El)
case 2:return A.i(null,w)}})
return A.j($async$El,w)},
Qy(d){return this.b1X(d)},
b1X(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qy=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.e2(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Qy)
case 2:return A.i(null,w)}})
return A.j($async$Qy,w)},
a0(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cV(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0,w)},
a0V(d,e,f){return this.b2c(0,e,f)},
b2c(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a0V=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.aaG()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0V,w)}}
B.aaG.prototype={}
B.bYY.prototype={
aL(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.R(r)
if(y.L.b(s)){u=s
s=u
J.m(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aL,w)}}
B.So.prototype={
saot(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.J5()
if(x!=null)x.style.objectFit=e},
ais(){var x=this,w=x.J5(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.alj(u,x.z!=null,0,t))},
sa7b(d,e){var x,w,v,u,t=this
t.z=e
if(e.Lk(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.au(y.l.b(x)?x:new A.cX(x,A.X(x).i("cX<1,aB>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Vs(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.au(y.l.b(x)?x:new A.cX(x,A.X(x).i("cX<1,aB>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aHQ()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.J5()
if(u!=null){u.srcObject=t.x
x=t.J5()
x.toString
t.a8Z(x)}t.sp(0,t.a.b4f(t.z!=null))},
aHQ(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
J5(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.Q)(t),++r)t[r].W(0)
q=u.J5()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eG()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$l,w)},
iU(d){var x=0,w=A.k(y.H),v=this
var $async$iU=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.F_()
$.po().t3("RTCVideoRenderer-"+v.Q,new B.aS2(v),!0)
return A.i(null,w)}})
return A.j($async$iU,w)},
a8Z(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Sq.prototype={
N(){return new B.Sr()}}
B.Sr.prototype={
U(){var x,w,v=this
v.X()
v.a.c.a9(0,v.gaSz())
x=v.a
w=x.c
w.as=x.e
w.saot(0,x.d===D.tm?"contain":"cover")},
aSA(){if(this.c!=null)this.m(new B.aS3())},
l(){if(this.c!=null)this.a1()},
aX(d){var x,w
this.be(d)
A.dk(A.df(0,0,10,0,0),new B.aS5(this))
x=this.a
w=x.c
w.saot(0,x.d===D.tm?"contain":"cover")},
C(d){return new A.iy(new B.aS4(this),null)}}
B.a7j.prototype={
azL(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.Ye(d,x,new A.b2(new A.ay(w,y.c),y.r),e,g.i("Ye<0>"))
if(f.a.giv())f.a=new B.TW(g.i("@<0>").c1(g).i("TW<1,2>")).hb(f.a)
w=A.fI(null,new B.aGa(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aeT(){var x,w
this.d=!0
x=this.c
if(x!=null)x.W(0)
w=this.b
w===$&&A.d()
w.a0(0)}}
B.Ye.prototype={
D(d,e){if(this.e)throw A.n(A.ag("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
dd(d,e){if(this.e)throw A.n(A.ag("Cannot add event after closing."))
if(this.d)return
this.aKm(d,e)},
hw(d){return this.dd(d,null)},
aKm(d,e){var x=this
if(x.w){x.a.a.dd(d,e)
return}x.c.fK(d,e)
x.aeU()
x.b.aeT()
x.a.a.a0(0).fo(new B.bns())},
a0(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aeT()
x.c.co(0,x.a.a.a0(0))}return x.c.a},
aeU(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.ds(0)
return},
$idV:1}
B.ad_.prototype={}
B.ad0.prototype={}
B.zU.prototype={
aag(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.FM(d,e))
x.a0(0)},
a6H(d){var x
if((this.b.b&4)!==0)throw A.n(B.bZC())
x=A.c1(d)
x.toString
this.a.send(x)},
xm(d,e,f){return this.b3D(0,e,f)},
b3D(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$xm=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bZC())
u.a0(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$xm,w)},
$ibZB:1}
B.ua.prototype={}
B.JD.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.JD&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Fl.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Fl&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hh(this.a)},
j(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.FM.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.FM&&e.a===this.a&&e.b===this.b},
gH(d){return A.hh([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.K8.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibK:1}
B.K7.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.asp.prototype={
azz(d){d.eY(new B.ast(this),new B.asu(this),y.a)}}
B.ap7.prototype={
a0(d){var x=this.b
x.e=x.d=null
return this.avb(0)}}
B.aea.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.xH.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Sk.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.xG.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.nw.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.aaH.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aRN.prototype={}
B.QY.prototype={}
B.HA.prototype={
j(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aMO.prototype={}
B.In.prototype={}
B.Sl.prototype={}
B.Sm.prototype={}
B.aRY.prototype={}
B.CK.prototype={}
B.Sn.prototype={}
B.Sp.prototype={
alj(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Sp(x,w,v)},
b4f(d){return this.alj(null,d,null,null)},
j(d){var x=this
return A.a6(x).j(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","AG(I)","~(Je)","bt(In)","bt(Sn)","bt(nw)","~(@)","tk(@)","bt(bZB)","~(ua)"])
B.aXG.prototype={
$0(){return J.ciP(this.a.b8())},
$S:1}
B.aXH.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.R(v)
if(y.i.b(u)){x=u
w=A.bg(v)
this.b.dd(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aui.prototype={
$1(d){if(d==null)return null
return A.c9(J.m(d))},
$S:150}
B.biP.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.GK(!0)},
$S:0}
B.biQ.prototype={
$1(d){return this.a.Qn()},
$S:30}
B.biM.prototype={
$0(){var x=this.a.c
if(x!=null)A.ad(x,!1).bL()},
$S:0}
B.biN.prototype={
$0(){return this.a.e=!0},
$S:0}
B.biJ.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.biK.prototype={
$0(){return this.a.d=!1},
$S:0}
B.biL.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.biG.prototype={
$0(){return this.a.f=!0},
$S:0}
B.biH.prototype={
$0(){return this.a.f=!1},
$S:0}
B.biI.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.c4o(x.w,null,w,u,!1,v)},
$S:z+2}
B.biO.prototype={
$0(){return this.a.aVN()},
$S:0}
B.bio.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.A4("annule",C.ej,!1)
x.nn(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bip.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.biq.prototype={
$1(d){this.a.A4("candidat_ice",d,!1)},
$S:385}
B.bir.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bin(x))},
$S:0}
B.bin.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bis.prototype={
$0(){this.a.nn(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bit.prototype={
$0(){return this.a.z=!0},
$S:0}
B.biu.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bim(x,w))},
$S:30}
B.bim.prototype={
$0(){return this.a.ch=new A.az(Date.now(),0,!1).eH(this.b)},
$S:0}
B.biv.prototype={
$1(d){},
$S:167}
B.biw.prototype={
$1(d){this.a.G6()},
$S:30}
B.biz.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.afe()
x.abA("reponse",d)},
$S:386}
B.biA.prototype={
$1(d){this.a.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.biB.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.afe()},
$S:28}
B.biC.prototype={
$1(d){this.a.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.biD.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.abA("offre",d)},
$S:386}
B.biE.prototype={
$1(d){this.a.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bix.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.az(Date.now(),0,!1)
x.ch=C.S
if(this.b)x.as=x.at=!1},
$S:0}
B.biy.prototype={
$1(d){return A.E(y.N,y.z)},
$S:131}
B.bil.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bik.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bij.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.biF.prototype={
$2(d,e){if(!d)this.a.GG()},
$S:1151}
B.aX4.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a9(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aX5.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gP(x):null
if(w!=null)this.a.aGk(w)},
$S:z+5}
B.aX6.prototype={
$1(d){var x
if(d===D.Lh){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.axQ.prototype={
$1(d){return this.a.ZW()},
$S:21}
B.axR.prototype={
$0(){var x=this.a
if(!x.e)x.ES()},
$S:0}
B.bUo.prototype={
$1(d){return d.length!==0},
$S:11}
B.aN5.prototype={
$1(d){return this.a.push(B.bYo(d))},
$S:21}
B.aN6.prototype={
$1(d){return this.a.push(B.bYo(d))},
$S:21}
B.aN2.prototype={
$1(d){},
$S:22}
B.aN3.prototype={
$1(d){},
$S:22}
B.aN4.prototype={
$1(d){},
$S:22}
B.aMR.prototype={
$0(){return!1},
$S:46}
B.aMS.prototype={
$0(){return!1},
$S:46}
B.aMT.prototype={
$1(d){J.h6(d,new B.aMQ(this.a))},
$S:385}
B.aMQ.prototype={
$2(d,e){this.a.k(0,d,e)},
$S:47}
B.aRQ.prototype={
$1(d){},
$S:22}
B.aRR.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.In(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aRS.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cBD(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.c0M())switch(w.cx.a){case 0:w.cy=D.Lm
break
case 1:w.cy=D.Ln
break
case 3:w.cy=D.Lo
break
case 5:w.cy=D.Lk
break
case 6:w.cy=D.Ll
break
case 7:w.cy=D.tl
break
default:break}},
$S:31}
B.aRT.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cBE(w.iceGatheringState)},
$S:31}
B.aRU.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cDx(w.signalingState)},
$S:31}
B.aRV.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cCP(w.connectionState)},
$S:31}
B.aRW.prototype={
$1(d){},
$S:31}
B.aRX.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bYo(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cX(x,A.X(x).i("cX<1,aB>"))
w=J.dx(x,new B.aRP(w),y.h)
v.$1(new B.Sn(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aRP.prototype={
$1(d){return new B.tk(d,this.a.as)},
$S:z+8}
B.bUw.prototype={
$1(d){return J.fU(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:11}
B.aS2.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.Q)(w),++u)w[u].W(0)
C.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a8Z(t)
v=y.k.c
w.push(A.ik(t,"canplay",new B.aRZ(x),!1,v))
w.push(A.ik(t,"resize",new B.aS_(x),!1,v))
w.push(A.ik(t,"error",new B.aS0(t),!1,v))
w.push(A.ik(t,"ended",new B.aS1(),!1,v))
return t},
$S:158}
B.aRZ.prototype={
$1(d){this.a.ais()},
$S:21}
B.aS_.prototype={
$1(d){this.a.ais()},
$S:21}
B.aS0.prototype={
$1(d){var x,w,v=this.a.error
A.o1("RTCVideoRenderer: videoElement.onError, "+J.m(v))
v.toString
x=C.GJ.h(0,A.at(v,"code"))
x.toString
w=!J.t(A.at(v,"message"),"")?A.at(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nr(x,C.GI.h(0,A.at(v,"code")),w,null))},
$S:25}
B.aS1.prototype={
$1(d){},
$S:21}
B.aS3.prototype={
$0(){},
$S:0}
B.aS5.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aS4.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a7A("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cM(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1152}
B.aGa.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fc(w.ghN(w),new B.aG9(v),w.got())},
$S:0}
B.aG9.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aeU()
x=x.b
x===$&&A.d()
x.a0(0)},
$S:0}
B.bns.prototype={
$1(d){},
$S:16}
B.awp.prototype={
$1(d){this.a.co(0,this.b)},
$S:22}
B.awq.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.h_(new B.K8("Failed to connect WebSocket"))
else this.b.aag(1006,"error")},
$S:22}
B.awr.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cs("data")
if(typeof x==="string")w.b=new B.JD(A.bk(x))
else if(typeof x==="object"&&A.c5s(y.m.a(x),"ArrayBuffer"))w.b=new B.Fl(A.Rn(y.o.a(x),0,null))
else throw A.n(A.ag("unexpected message type: "+J.aF(x).j(0)))
v.D(0,w.b8())},
$S:25}
B.aws.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.co(0,this.b)
this.b.aag(d.code,d.reason)},
$S:22}
B.ast.prototype={
$1(d){var x=d.b,w=this.a
new A.cA(x,A.x(x).i("cA<1>")).cL(new B.asq(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cA(x,A.x(x).i("cA<1>")).bbi(new B.asr(d),new B.ass(w,d))
w.f.ds(0)},
$S:z+9}
B.asq.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.JD
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Fl
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.FM){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a0(0)}}},
$S:z+10}
B.asr.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bZC())
s=A.c1(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a6H(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a6H(new Uint8Array(A.cv(u)))
break $label1$1}t=A.aQ("Cannot send "+J.aF(d).j(0))
throw A.n(t)}}catch(r){if(!(A.R(r) instanceof B.K7))throw r}},
$S:18}
B.ass.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.xm(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.R(q) instanceof B.K7))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.asu.prototype={
$1(d){var x,w=d instanceof A.UW?d:new B.aea(J.m(d)),v=this.a
v.f.h_(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hw(w)
v=v.a
v===$&&A.d()
v.a0(0)},
$S:31};(function aliases(){var x=B.Ga.prototype
x.avb=x.a0})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Xm.prototype,"gaAH","Mk",0)
var v
w(v=B.Xl.prototype,"gb08","aik",3)
x(v,"gafy","GG",0)
x(v,"ga9b","MI",0)
x(v,"ga9a","MH",0)
x(v,"ga98","ME",0)
x(v,"ga99","MF",0)
w(v=B.a4U.prototype,"gaVw","aVx",7)
x(v,"gaUx","ZW",1)
x(B.So.prototype,"gdZ","l",0)
x(B.Sr.prototype,"gaSz","aSA",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a3,[B.Ga,B.auh,B.Je,B.a57,B.aX3,B.a4U,B.a8t,B.aRN,B.QY,B.HA,B.aMO,B.Sl,B.Sm,B.aRY,B.ad0,B.Ye,B.ad_,B.zU,B.ua,B.K8,B.aea,B.In,B.CK,B.Sn,B.Sp])
w(B.TW,A.fJ)
x(A.jL,[B.aXG,B.biP,B.biM,B.biN,B.biJ,B.biK,B.biL,B.biG,B.biH,B.biO,B.bio,B.bip,B.bir,B.bin,B.bis,B.bit,B.bim,B.bix,B.bil,B.bik,B.bij,B.axR,B.aMR,B.aMS,B.aS3,B.aS5,B.aGa,B.aG9,B.ass])
x(A.iU,[B.aXH,B.aui,B.biQ,B.biI,B.biq,B.biu,B.biv,B.biw,B.biz,B.biA,B.biB,B.biC,B.biD,B.biE,B.biy,B.aX4,B.aX5,B.aX6,B.axQ,B.bUo,B.aN5,B.aN6,B.aN2,B.aN3,B.aN4,B.aMT,B.aRQ,B.aRR,B.aRS,B.aRT,B.aRU,B.aRV,B.aRW,B.aRX,B.aRP,B.bUw,B.aS2,B.aRZ,B.aS_,B.aS0,B.aS1,B.bns,B.awp,B.awq,B.awr,B.aws,B.ast,B.asq,B.asr,B.asu])
x(A.O,[B.pQ,B.AG,B.Sq])
x(A.W,[B.Xm,B.Xl,B.Sr])
x(A.aw,[B.W0,B.afQ,B.yA])
x(A.ry,[B.biF,B.aMQ,B.aS4])
w(B.aRO,B.aRN)
w(B.tk,B.QY)
w(B.a8Y,B.HA)
w(B.aMP,B.aMO)
w(B.aaF,B.Sl)
w(B.aaG,B.Sm)
w(B.bYY,B.aRY)
w(B.So,A.di)
x(B.ad0,[B.a7j,B.asp])
x(B.ua,[B.JD,B.Fl,B.FM])
w(B.K7,B.K8)
w(B.ap7,B.Ga)
x(A.KE,[B.xH,B.Sk,B.xG,B.nw,B.aaH])})()
A.nW(b.typeUniverse,JSON.parse('{"Ga":{"dV":["1"]},"TW":{"fJ":["1","2"],"fJ.S":"1","fJ.T":"2"},"AG":{"O":[],"p":[]},"pQ":{"O":[],"p":[]},"Xm":{"W":["pQ"]},"W0":{"aw":[],"p":[]},"Xl":{"W":["AG"]},"afQ":{"aw":[],"p":[]},"yA":{"aw":[],"p":[]},"tk":{"QY":[]},"a8Y":{"HA":[]},"aaF":{"Sl":[]},"aaG":{"Sm":[]},"So":{"di":["Sp"],"aZ":[]},"Sq":{"O":[],"p":[]},"Sr":{"W":["Sq"]},"Ye":{"dV":["1"]},"zU":{"bZB":[]},"JD":{"ua":[]},"Fl":{"ua":[]},"FM":{"ua":[]},"K8":{"bK":[]},"K7":{"bK":[]},"ap7":{"dV":["@"]},"aea":{"bK":[]}}'))
A.c_9(b.typeUniverse,JSON.parse('{"Ga":1,"ad0":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("zU"),L:x("bK"),_:x("av<@>"),x:x("av<~>"),S:x("H<ai<o,M>>"),t:x("H<ai<o,@>>"),Q:x("H<HA>"),d:x("H<j0<@>>"),s:x("H<o>"),p:x("H<p>"),m:x("aB"),l:x("D<aB>"),F:x("D<ai<o,@>>"),j:x("D<@>"),I:x("D<v>"),P:x("ai<o,@>"),f:x("ai<@,@>"),E:x("QY"),G:x("HA"),h:x("tk"),o:x("qb"),a:x("bt"),K:x("a3"),J:x("Sl"),e:x("Sm"),v:x("CK"),Z:x("ad_<a3?>"),N:x("o"),i:x("qH"),M:x("e9"),D:x("ua"),U:x("Y<o>"),g:x("dI<Je>"),n:x("dI<~>"),V:x("b2<zU>"),r:x("b2<@>"),R:x("b2<~>"),k:x("Xw<aB>"),C:x("p9<aB>"),u:x("ay<zU>"),c:x("ay<@>"),W:x("ay<~>"),q:x("kf"),y:x("M"),z:x("@"),A:x("aB?"),X:x("a3?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.V4=new B.a57(C.kg)
D.yv=new A.ar(32,0,32,0)
D.qu=new A.aq(57638,"MaterialIcons",null,!1)
D.ze=new A.aq(57639,"MaterialIcons",null,!1)
D.a_N=new A.aq(58337,"MaterialIcons",null,!1)
D.a_O=new A.aq(58341,"MaterialIcons",null,!1)
D.a_S=new A.aq(58923,"MaterialIcons",null,!1)
D.zk=new A.aq(59048,"MaterialIcons",null,!1)
D.a_T=new A.aq(59049,"MaterialIcons",null,!1)
D.a_U=new A.aq(59077,"MaterialIcons",null,!1)
D.a8r=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.acf=A.a(x([]),y.Q)
D.GV=new A.fH("FlutterWebRTC.Method",C.bc,null)
D.akJ=new B.nw(0,"RTCIceConnectionStateNew")
D.akK=new B.nw(1,"RTCIceConnectionStateChecking")
D.akL=new B.nw(2,"RTCIceConnectionStateCompleted")
D.akM=new B.nw(3,"RTCIceConnectionStateConnected")
D.akN=new B.nw(4,"RTCIceConnectionStateCount")
D.Lh=new B.nw(5,"RTCIceConnectionStateFailed")
D.akO=new B.nw(6,"RTCIceConnectionStateDisconnected")
D.Li=new B.nw(7,"RTCIceConnectionStateClosed")
D.Lj=new B.Sk(0,"RTCIceGatheringStateNew")
D.akP=new B.Sk(1,"RTCIceGatheringStateGathering")
D.akQ=new B.Sk(2,"RTCIceGatheringStateComplete")
D.tl=new B.xG(0,"RTCPeerConnectionStateClosed")
D.Lk=new B.xG(1,"RTCPeerConnectionStateFailed")
D.Ll=new B.xG(2,"RTCPeerConnectionStateDisconnected")
D.Lm=new B.xG(3,"RTCPeerConnectionStateNew")
D.Ln=new B.xG(4,"RTCPeerConnectionStateConnecting")
D.Lo=new B.xG(5,"RTCPeerConnectionStateConnected")
D.akR=new B.xH(0,"RTCSignalingStateStable")
D.akS=new B.xH(1,"RTCSignalingStateHaveLocalOffer")
D.akT=new B.xH(2,"RTCSignalingStateHaveRemoteOffer")
D.akU=new B.xH(3,"RTCSignalingStateHaveLocalPrAnswer")
D.akV=new B.xH(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Lp=new B.xH(5,"RTCSignalingStateClosed")
D.akW=new B.Sp(0,0,0)
D.tm=new B.aaH(0,"RTCVideoViewObjectFitContain")
D.Lq=new B.aaH(1,"RTCVideoViewObjectFitCover")
D.o5=new A.c8(20,null,null,null)
D.aor=new A.c8(48,null,null,null)
D.MV=new A.c8(null,64,null,null)
D.arA=new A.A(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nz=new A.A(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.arW=new A.A(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.NI=new A.A(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ux=new A.A(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c8B=!1
$.c6Q=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cIM","c1_",()=>new B.aRO())
x($,"cFp","c0M",()=>C.c.q(A.at(A.at(A.at(A.c0r(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"Yx884ce7AzcGvIdkTIiG5+uwqss=");