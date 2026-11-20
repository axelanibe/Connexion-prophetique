((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ga:function Ga(){},TW:function TW(d){this.$ti=d},aXF:function aXF(d){this.a=d},aXG:function aXG(d,e){this.a=d
this.b=e},
a3x(d){var x,w,v,u,t,s=new B.auh(),r=J.N(d),q=r.h(d,"id")
q=J.n(q==null?"":q)
x=r.h(d,"conversation_id")
J.n(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.n(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.n(w==null?"":w)
v=A.an(r.h(d,"appele_id"))
A.an(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.n(u==null?"audio":u)
t=r.h(d,"statut")
t=J.n(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.aug(q,x,w,v,u,t)},
c7p(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.n(s==null?"":s)
x=u.h(d,"appel_id")
J.n(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.n(x==null?"":x)
w=u.h(d,"type")
w=J.n(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mO(t,y.N,y.z):C.ej
if(u.h(d,"cree_le")!=null)A.c9(J.n(u.h(d,"cree_le")))
return new B.Je(s,x,w,v)},
ckP(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.V_
x=A.a([],y.t)
for(r=J.au(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mO(s,u,t))}return new B.a57(x)},
bTp(d){var x=C.d.aq(d.a,1e6)
return C.c.b_(C.d.j(C.d.aq(x,60)),2,"0")+":"+C.c.b_(C.d.j(C.d.ae(x,60)),2,"0")},
ccp(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.pm(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.alk(w,v)},
czT(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aln(u,A.jE(w)?w:null,v)},
aug:function aug(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
auh:function auh(){},
Je:function Je(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a57:function a57(d){this.a=d},
c4l(d,e,f,g,h,i){return new B.pP(e,f,i,h,d,null)},
c4k(d,e,f,g,h,i){return new B.AF(f,i,g,h,d,e,null)},
c8M(d,e,f,g,h,i,j,k,l,m,n){return new B.afP(g,f,e,i,h,d,m,l,k,j,n,null)},
pP:function pP(d,e,f,g,h,i){var _=this
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
biO:function biO(d){this.a=d},
biP:function biP(d){this.a=d},
biL:function biL(d){this.a=d},
biM:function biM(d){this.a=d},
biI:function biI(d){this.a=d},
biJ:function biJ(d){this.a=d},
biK:function biK(d){this.a=d},
biF:function biF(d){this.a=d},
biG:function biG(d){this.a=d},
biH:function biH(d){this.a=d},
biN:function biN(d){this.a=d},
W0:function W0(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
AF:function AF(d,e,f,g,h,i,j){var _=this
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
_.as=_.Q=_.z=_.y=_.x=!1
_.at=!0
_.ax=null
_.ay=e
_.db=_.cy=_.cx=_.CW=_.ch=null
_.dx=$
_.dy=!1
_.fr=null
_.fx=!1
_.c=_.a=null},
bin:function bin(d){this.a=d},
bio:function bio(d){this.a=d},
bip:function bip(d){this.a=d},
biq:function biq(d){this.a=d},
bim:function bim(d){this.a=d},
bir:function bir(d){this.a=d},
bis:function bis(d){this.a=d},
bit:function bit(d){this.a=d},
bil:function bil(d,e){this.a=d
this.b=e},
biu:function biu(){},
biv:function biv(d){this.a=d},
biy:function biy(d){this.a=d},
biz:function biz(d){this.a=d},
biA:function biA(d){this.a=d},
biB:function biB(d){this.a=d},
biC:function biC(d){this.a=d},
biD:function biD(d){this.a=d},
biw:function biw(d){this.a=d},
bix:function bix(){},
bik:function bik(d,e){this.a=d
this.b=e},
bij:function bij(d,e){this.a=d
this.b=e},
bii:function bii(d,e){this.a=d
this.b=e},
biE:function biE(d){this.a=d},
afP:function afP(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
yz:function yz(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aX2:function aX2(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aX3:function aX3(d){this.a=d},
aX4:function aX4(d){this.a=d},
aX5:function aX5(d){this.a=d},
a4U:function a4U(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
axP:function axP(d){this.a=d},
axQ:function axQ(d){this.a=d},
arh(d){var x=y.U,w=A.G(new A.X(A.a(d.split(" "),y.s),new B.bUk(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(C.b.gP(w),0).toUpperCase()
return(J.q(C.b.gP(w),0)+J.q(C.b.gaO(w),0)).toUpperCase()},
bUk:function bUk(){},
a8t:function a8t(){this.a=null},
aRN:function aRN(){},
tj:function tj(d,e){this.e=d
this.b=e},
aN4:function aN4(d){this.a=d},
aN5:function aN5(d){this.a=d},
bYk(d){var x=new B.a8X(d)
x.azQ(d)
return x},
a8X:function a8X(d){this.d=d},
aN1:function aN1(d){this.a=d},
aN2:function aN2(d){this.a=d},
aN3:function aN3(d){this.a=d},
aMO:function aMO(){},
aMQ:function aMQ(){},
aMR:function aMR(){},
aMS:function aMS(d){this.a=d},
aMP:function aMP(d){this.a=d},
cqx(d,e){var x=y.N
x=new B.aaE(d,e,A.E(x,y.E),A.E(x,y.z))
x.azW(d,e)
return x},
aaE:function aaE(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aRP:function aRP(d){this.a=d},
aRQ:function aRQ(d){this.a=d},
aRR:function aRR(d){this.a=d},
aRS:function aRS(d){this.a=d},
aRT:function aRT(d){this.a=d},
aRU:function aRU(d){this.a=d},
aRV:function aRV(d){this.a=d},
aRW:function aRW(d){this.a=d},
aRO:function aRO(d){this.a=d},
aaF:function aaF(){},
bYU:function bYU(d){this.a=d},
cC_(){return C.b.mR(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bUs())!==-1},
bUs:function bUs(){},
c6L(){var x=A.a([],y.d),w=$.c6M
$.c6M=w+1
return new B.So(w,x,D.akP,$.aj())},
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
aS1:function aS1(d){this.a=d},
aRY:function aRY(d){this.a=d},
aRZ:function aRZ(d){this.a=d},
aS_:function aS_(d){this.a=d},
aS0:function aS0(){},
bYV(d,e,f){return new B.Sq(d,f,e,null)},
Sq:function Sq(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Sr:function Sr(){this.c=this.a=null},
aS2:function aS2(){},
aS4:function aS4(d){this.a=d},
aS3:function aS3(d){this.a=d},
c4X(d,e,f,g){var x,w={}
w.a=d
x=new B.a7j(g.i("a7j<0>"))
x.azG(e,f,w,g)
return x},
a7j:function a7j(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aG9:function aG9(d,e){this.a=d
this.b=e},
aG8:function aG8(d){this.a=d},
Ye:function Ye(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bnr:function bnr(){},
acZ:function acZ(d){this.b=this.a=$
this.$ti=d},
ad_:function ad_(){},
bX_(d,e){return B.ck1(d,e)},
ck1(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bX_=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.oT("ws")&&!d.oT("wss"))throw A.m(A.fp(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.zT(r,A.fI(null,null,null,!1,y.D))
u=new A.ay($.aI,y.u)
p=new A.b2(u,y.V)
if(J.t(r.readyState,1))p.co(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.h_(new B.K8("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.p9(r,"open",!1,y.C).gP(0).aB(new B.awo(p,q),y.H)
t=y.C
s=y.H
new A.p9(r,"error",!1,t).gP(0).aB(new B.awp(p,q),s)
A.ij(r,"message",new B.awq(q),!1,y.m)
new A.p9(r,"close",!1,t).gP(0).aB(new B.awr(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bX_,w)},
zT:function zT(d,e){this.a=d
this.b=e},
awo:function awo(d,e){this.a=d
this.b=e},
awp:function awp(d,e){this.a=d
this.b=e},
awq:function awq(d){this.a=d},
awr:function awr(d,e){this.a=d
this.b=e},
bZy(){return new B.K7("Connection Closed")},
u9:function u9(){},
JD:function JD(d){this.a=d},
Fl:function Fl(d){this.a=d},
FM:function FM(d,e){this.a=d
this.b=e},
K8:function K8(d){this.a=d},
K7:function K7(d){this.a=d},
cjx(d){var x=null,w=$.aI,v=new B.acZ(y.Z),u=y.X,t=A.fI(x,x,x,!0,u),s=A.fI(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.c4X(new A.cA(s,r.i("cA<1>")),new A.Ey(t,q.i("Ey<1>")),!0,u)
v.b=B.c4X(new A.cA(t,q.i("cA<1>")),new A.Ey(s,r.i("Ey<1>")),!1,u)
v=new B.aso(new A.b2(new A.ay(w,y.W),y.R),v)
v.azu(d)
return v},
aso:function aso(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ass:function ass(d){this.a=d},
asp:function asp(d){this.a=d},
asq:function asq(d){this.a=d},
asr:function asr(d,e){this.a=d
this.b=e},
ast:function ast(d){this.a=d},
ap6:function ap6(d,e){this.b=d
this.a=e},
ae9:function ae9(d){this.a=d},
cBz(d){switch(d){case"new":return D.akC
case"checking":return D.akD
case"connected":return D.akF
case"completed":return D.akE
case"failed":return D.Lh
case"disconnected":return D.akH
case"closed":return D.Li
case"count":return D.akG}return D.Li},
cBA(d){switch(d){case"new":return D.Lj
case"gathering":return D.akI
case"complete":return D.akJ}return D.Lj},
cDt(d){switch(d){case"stable":return D.akK
case"have-local-offer":return D.akL
case"have-local-pranswer":return D.akN
case"have-remote-offer":return D.akM
case"have-remote-pranswer":return D.akO
case"closed":return D.Lp}return D.Lp},
cCL(d){switch(d){case"new":return D.Lm
case"connecting":return D.Ln
case"connected":return D.Lo
case"closed":return D.tl
case"disconnected":return D.Ll
case"failed":return D.Lk}return D.tl},
xG:function xG(d,e){this.a=d
this.b=e},
Sk:function Sk(d,e){this.a=d
this.b=e},
xF:function xF(d,e){this.a=d
this.b=e},
nw:function nw(d,e){this.a=d
this.b=e},
aaG:function aaG(d,e){this.a=d
this.b=e},
aRM:function aRM(){},
QY:function QY(){},
HA:function HA(){},
aMN:function aMN(){},
In:function In(d,e,f){this.a=d
this.b=e
this.c=f},
Sl:function Sl(){},
Sm:function Sm(){},
aRX:function aRX(){},
CJ:function CJ(d,e){this.a=d
this.b=e},
Sn:function Sn(d){this.b=d},
Sp:function Sp(d,e,f){this.a=d
this.b=e
this.c=f},
bXY(d){var x=0,w=A.k(y.y)
var $async$bXY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.m("The is not a video track => "+d.j(0))
throw A.m("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bXY,w)},
aP4(d){var x=0,w=A.k(y.H),v
var $async$aP4=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b13("enableSpeakerphone",A.a9(["enable",d],y.N,v),v,v),$async$aP4)
case 2:return A.i(null,w)}})
return A.j($async$aP4,w)},
b13(d,e,f,g){return B.cth(d,e,f,g,f.i("0?"))},
cth(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b13=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b12(),$async$b13)
case 3:v=D.GV.cc(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b13,w)},
b12(){var x=0,w=A.k(y.H),v,u
var $async$b12=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c8x?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.GV.cc("initialize",A.a9(["options",A.E(v,u)],v,u),!1,y.H),$async$b12)
case 4:$.c8x=!0
case 3:return A.i(null,w)}})
return A.j($async$b12,w)}},D,E
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
hb(d){var x=A.cs("subscription"),w=A.fI(new B.aXF(x),null,null,!0,this.$ti.y[1])
x.b=d.fc(new B.aXG(this,w),w.gmK(w),w.got())
return new A.cA(w,A.x(w).i("cA<1>"))}}
B.aug.prototype={}
B.Je.prototype={}
B.a57.prototype={}
B.pP.prototype={
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
w.Mu()
w.r=A.dk(C.c9,new B.biO(w))
w.w=A.iH(C.y7,new B.biP(w))},
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
a_0(){var x=this.x
if(x!=null)x.W(0)
this.x=A.dk(C.h0,new B.biL(this))},
Qh(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Qh=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.Cd(p.c),$async$Qh)
case 7:r=e
q=B.a3x(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.biM(s))
p=s.r
if(p!=null)p.W(0)
p=s.w
if(p!=null)p.W(0)
p=s.y
p===$&&A.d()
p.i6()
s.a_0()}u=2
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
return A.j($async$Qh,w)},
Mu(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Mu=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.aa()
x=7
return A.e(n.Cd(o.c),$async$Mu)
case 7:r=e
q=B.a3x(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gao9()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.biI(s))
o=s.y
o===$&&A.d()
o.i6()
s.a_0()
x=1
break}s.m(new B.biJ(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.biK(s))
o=s.y
o===$&&A.d()
o.i6()
s.a_0()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Mu,w)},
Mg(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Mg=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.m(new B.biF(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.e(p.S_(q.c,"accepte"),$async$Mg)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.R(n)
if(s.c==null){x=1
break}s.m(new B.biG(s))
q=s.c
q.toString
p=J.n(r)
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
A.ad(q,!1).yD(A.ek(new B.biH(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Mg,w)},
GH(d){return this.aVI(d)},
aVH(){return this.GH(!1)},
aVI(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$GH=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.S_(r.c,"refuse"),$async$GH)
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
return A.j($async$GH,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.kq(C.r,s,A.c(B.arh(r.d),s,s,s,s,D.NI,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.Nz,C.V,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.au,new A.a1(D.yv,x,s),C.k,A.c(q,s,s,s,s,D.ux,s,s,s),D.MV],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.biN(t)
v=A.b("Accepter")
u=t.f?s:t.gaAC()
q.push(A.V(A.a([new B.W0(D.ze,C.aE,r,x,s),D.aok,new B.W0(D.qu,C.cE,v,u,s)],w),C.o,C.bA,C.i,s))}if(t.d)q.push(C.wP)
return A.eQ(s,C.n,A.fx(!0,A.cM(A.K(q,C.o,C.f,C.W),s,s),!0,C.aa,!0,!0),s,s,s)}}
B.W0.prototype={
C(d){var x=this,w=null,v=A.dg(x.d,w,w,C.aa,C.cT,w)
return A.K(A.a([A.ae(A.b8(!1,A.cd(x.c,C.l,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e0,w,w,w)],y.p),C.o,C.f,C.W)}}
B.AF.prototype={
N(){return new B.Xl(A.b3(y.N),C.S)}}
B.Xl.prototype={
U(){var x,w,v=this,u=null
v.X()
v.r=v.a.c
x=B.c6L()
w=B.c6L()
v.d!==$&&A.bi()
v.d=new B.aX2(x,w)
x=v.a
x.toString
w=new B.a4U(new A.dH(u,u,y.g),new A.dH(u,u,y.n))
v.e!==$&&A.bi()
v.e=w
v.dy=!0
w=new B.a8t()
v.dx!==$&&A.bi()
v.dx=w
if(x.f)w.rS("assets/audio/tonalite-appel.wav")
v.qS()},
l(){var x=this,w=x.ch
if(w!=null)w.W(0)
w=x.CW
if(w!=null)w.W(0)
w=x.cx
if(w!=null)w.W(0)
w=x.cy
if(w!=null)w.W(0)
w=x.db
if(w!=null)w.W(0)
w=x.dx
w===$&&A.d()
w.i6()
if(x.dy)w.hk()
w=x.d
w===$&&A.d()
w.hk()
w=x.e
w===$&&A.d()
w.Iw()
x.a1()},
qS(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$qS=A.f(function(a0,a1){if(a0===1){t=a1
x=u}while(true)switch(x){case 0:s.CW=A.dk(C.c9,new B.bin(s))
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
return A.e(g.Cd(h.c),$async$qS)
case 11:q=a1
s.r=s.a.c
case 8:p=B.a3x(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.nn(A.b("Appel termin\xe9"))
x=1
break}s.w=s.a.f?p.c:p.e
r="ice"
h=$.aa()
o=h.S7()
n=s.Gt()
x=12
return A.e(o,$async$qS)
case 12:m=a1
l=B.ckP(m)
x=15
return A.e(n,$async$qS)
case 15:x=!a1?13:14
break
case 13:if(s.c==null){x=1
break}s.m(new B.bio(s))
x=16
return A.e(A.jX(C.mg,null,y.z),$async$qS)
case 16:if(s.c==null){x=1
break}s.nn(null)
x=1
break
case 14:r="webrtc"
g=s.d
g===$&&A.d()
f=s.a.d
x=17
return A.e(g.yB(A.a9(["iceServers",l.a],y.N,y.z),f==="video"),$async$qS)
case 17:g.f=new B.bip(s)
g.r=new B.biq(s)
g.w=new B.bir(s)
if(s.c==null){x=1
break}s.m(new B.bis(s))
s.cx=A.iH(C.cq,new B.bit(s))
g=s.e
g===$&&A.d()
f=g.r
s.cy=new A.c5(f,A.x(f).i("c5<1>")).cL(s.gb02())
f=g.w
s.db=new A.c5(f,A.x(f).i("c5<1>")).cL(new B.biu())
s.a.toString
k=h.b
if(k!=null&&J.a4(k)!==0){s.a.toString
g.Rd(C.c.Uv("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eM(C.bN,k,C.ad,!0))}s.ch=A.iH(C.h0,new B.biv(s))
s.G4()
u=2
x=6
break
case 4:u=3
d=t
j=A.R(d)
i=A.bg(d)
if(s.c==null){x=1
break}A.EU().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.de?j.a:s.aQT(r)
h.u(y.q).f.B(A.B(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.nn(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$qS,w)},
aQT(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Gt(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Gt=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.WS(),$async$Gt)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.D0(s.a.d==="video"),$async$Gt)
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
return A.j($async$Gt,w)},
WS(){var x=0,w=A.k(y.y),v
var $async$WS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$WS,w)},
G4(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$G4=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.aa()
x=7
return A.e(p.c1("/messagerie/appels/"+s.r+"/signaux"),$async$G4)
case 7:r=e
for(p=J.au(r);p.A();){q=p.gK(p)
s.aie(B.c7p(q))}u=2
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
return A.j($async$G4,w)},
aie(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.ccp(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.BI(A.a9(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.biy(s),y.a).fo(new B.biz(s))
break
case"reponse":if(!s.a.f)return
u=B.ccp(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.QM(A.a9(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.biA(s),y.a).fo(new B.biB(s))
break
case"candidat_ice":t=B.czT(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.QF(A.a9(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Iq().aB(new B.biC(s),y.a).fo(new B.biD(s))
break
case"refuse":s.nn(A.b("Appel refus\xe9"))
break
case"annule":s.nn(A.b("Appel annul\xe9"))
break
case"termine":s.nn(A.b("Appel termin\xe9"))
break}},
af8(){var x,w=this
if(w.x)return
x=w.CW
if(x!=null)x.W(0)
x=w.dx
x===$&&A.d()
x.i6()
w.m(new B.biw(w))},
A3(d,e,f){return this.aHW(d,e,f)},
abt(d,e){return this.A3(d,e,!0)},
aHW(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$A3=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.aa()
x=6
return A.e(s.am9(t.r,e,d),$async$A3)
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
return A.j($async$A3,w)},
GD(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$GD=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.CW
if(r!=null)r.W(0)
r=s.dx
r===$&&A.d()
r.i6()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.aa()
x=9
return A.e(q.S_(r,"termine"),$async$GD)
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
return A.j($async$GD,w)},
nn(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.CW
if(x!=null)x.W(0)
x=v.dx
x===$&&A.d()
x.i6()
x=v.r
if(x.length!==0){v.a.toString
w=$.aa()
w.S_(x,"termine").fo(new B.bix())}if(d!=null&&v.c!=null)v.c.u(y.q).f.B(A.B(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.m,u,u,u,u,u,u,u,u,u))
x=v.c
if(x!=null)A.ad(x,!1).bL()},
ME(){var x=0,w=A.k(y.H),v=this,u,t
var $async$ME=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.VM(u),$async$ME)
case 2:if(v.c!=null)v.m(new B.bik(v,u))
return A.i(null,w)}})
return A.j($async$ME,w)},
MD(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MD=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Lv(u),$async$MD)
case 2:if(v.c!=null)v.m(new B.bij(v,u))
return A.i(null,w)}})
return A.j($async$MD,w)},
MA(){var x=0,w=A.k(y.H),v=this,u,t
var $async$MA=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.at
t=v.d
t===$&&A.d()
x=2
return A.e(t.VJ(u),$async$MA)
case 2:if(v.c!=null)v.m(new B.bii(v,u))
return A.i(null,w)}})
return A.j($async$MA,w)},
MB(){var x=0,w=A.k(y.H),v=this,u
var $async$MB=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.QR(),$async$MB)
case 2:return A.i(null,w)}})
return A.j($async$MB,w)},
C(d){var x,w,v,u,t,s,r,q,p=this,o=null,n="Connexion\u2026",m=p.d
m===$&&A.d()
x=m.c
w=p.a
if(w.d==="video"&&p.z){if(x!=null)x=B.bYV(m.e,!1,D.Lq)
else{x=A.kq(C.r,o,A.c(B.arh(w.e),o,o,o,o,D.arP,o,o,o),o,48)
w=A.c(p.a.e,o,o,o,o,D.art,o,o,o)
x=A.cM(A.K(A.a([x,C.p,w,C.k,A.c(p.x?B.bTp(p.ay):A.b(n),o,o,o,o,D.ux,o,o,o)],y.p),C.o,C.f,C.W),o,o)}x=A.S2(0,x)
m=A.fk(o,A.f9(A.P(12),B.bYV(m.d,!0,D.Lq),C.ap),160,o,o,16,16,110)
w=p.x
v=B.bTp(p.ay)
u=p.Q
t=p.as
u=A.em(C.aX,A.a([x,m,A.fk(24,B.c8M(p.at,v,w,!0,t,u,p.ga92(),p.ga91(),p.ga93(),p.ga94(),p.gafs()),o,o,0,0,o,o)],y.p),C.h,C.aW,o)
m=u}else{x=y.p
w=A.a([],x)
if(p.fx)w.push(A.fk(o,A.to(B.bYV(m.e,!1,D.tm),0),1,o,0,o,0,1))
m=A.kq(C.r,o,A.c(B.arh(p.a.e),o,o,o,o,D.NI,o,o,o),o,56)
v=A.c(p.a.e,o,o,o,o,D.Nz,C.V,o,o)
u=p.fr
if(u==null)if(p.x)u=B.bTp(p.ay)
else u=p.z?A.b("Appel en cours\u2026"):A.b(n)
u=A.c(u,o,o,o,o,D.ux,C.V,o,o)
t=p.x
s=B.bTp(p.ay)
r=p.Q
q=p.as
w.push(A.cM(A.K(A.a([m,C.au,new A.a1(D.yv,v,o),C.k,u,D.MV,B.c8M(p.at,s,t,!1,q,r,p.ga92(),p.ga91(),p.ga93(),p.ga94(),p.gafs())],x),C.o,C.f,C.W),o,o))
w=A.em(C.aX,w,C.h,C.aW,o)
m=w}return A.bYM(!1,A.eQ(o,C.n,A.fx(!0,m,!0,C.aa,!0,!0),o,o,o),new B.biE(p),y.K)}}
B.afP.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.NL,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_J:D.a_I
t=A.a([new B.yz(x,r,A.b("Muet"),v.x,u,u),D.o5,new B.yz(D.a_P,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.o5)
if(r){x=v.w
w=x?D.zk:D.a_O
t.push(new B.yz(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.o5)
if(r)t.push(new B.yz(D.a_N,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.o5)
t.push(new B.yz(D.ze,!1,A.b("Raccrocher"),v.as,C.aE,u))
s.push(A.V(t,C.o,C.bA,C.i,u))
return A.K(s,C.o,C.f,C.W)}}
B.yz.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lX
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dg(u,v,v,C.aa,C.cT,v)
return A.K(A.a([A.ae(A.b8(!1,A.cd(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aV,A.c(w.e,v,v,v,v,C.NM,v,v,v)],y.p),C.o,C.f,C.W)}}
B.aX2.prototype={
D0(d){return this.bdn(d)},
bdn(d){var x=0,w=A.k(y.H),v,u=this,t,s,r
var $async$D0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.iU(0),$async$D0)
case 3:$.c0W()
if(d){s=y.N
s=A.a9(["facingMode","user"],s,s)}else s=!1
x=4
return A.e(new B.aMO().E3(0,A.a9(["audio",!0,"video",s],y.N,y.z)),$async$D0)
case 4:r=f
u.b=r
t.sa74(0,r)
case 1:return A.i(v,w)}})
return A.j($async$D0,w)},
yB(d,e){return this.be6(d,e)},
be6(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$yB=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.iU(0),$async$yB)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.D0(e),$async$yB)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.c0W().a1X(d,A.E(y.N,y.z)),$async$yB)
case 6:t=v.a=g
s=u.a6i(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a0O(0,s[q],u),$async$yB)
case 10:case 8:s.length===r||(0,A.Q)(s),++q
x=7
break
case 9:t.e=new B.aX3(v)
t.Q=new B.aX4(v)
t.d=new B.aX5(v)
return A.i(null,w)}})
return A.j($async$yB,w)},
aGe(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa74(0,d)
x=w.r
if(x!=null)x.$0()}},
Iq(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Iq=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.m(A.ag("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Rr(0),$async$Iq)
case 3:t=e
x=4
return A.e(s.Eh(0,t),$async$Iq)
case 4:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Iq,w)},
BI(d){return this.b5t(d)},
b5t(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$BI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.m(A.ag("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Ej(0,new B.CJ(d.h(0,"sdp"),d.h(0,"type"))),$async$BI)
case 3:x=4
return A.e(s.Ro(0),$async$BI)
case 4:t=f
x=5
return A.e(s.Eh(0,t),$async$BI)
case 5:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$BI,w)},
QM(d){return this.b2r(d)},
b2r(d){var x=0,w=A.k(y.H),v=this,u
var $async$QM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.m(A.ag("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.Ej(0,new B.CJ(d.h(0,"sdp"),d.h(0,"type"))),$async$QM)
case 2:return A.i(null,w)}})
return A.j($async$QM,w)},
QF(d){return this.b2c(d)},
b2c(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$QF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Qs(new B.In(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dO(d.h(0,"sdpMLineIndex")))),$async$QF)
case 3:case 1:return A.i(v,w)}})
return A.j($async$QF,w)},
VM(d){return this.atd(d)},
atd(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$VM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Vm(0)
if(r==null)r=C.dw
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.Q)(r),++s)r[s].sl5(0,t)
return A.i(null,w)}})
return A.j($async$VM,w)},
Lv(d){return this.at3(d)},
at3(d){var x=0,w=A.k(y.H)
var $async$Lv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aP4(d),$async$Lv)
case 2:return A.i(null,w)}})
return A.j($async$Lv,w)},
VJ(d){return this.asW(d)},
asW(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$VJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Lf(0)
if(s==null)s=C.dw
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.Q)(s),++t)s[t].sl5(0,d)
return A.i(null,w)}})
return A.j($async$VJ,w)},
QR(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$QR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Lf(0)
if(s==null)s=D.aca
if(s.length===0){x=1
break}x=3
return A.e(B.bXY(C.b.gP(s)),$async$QR)
case 3:case 1:return A.i(v,w)}})
return A.j($async$QR,w)},
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
q=q==null?null:q.a6i(0)
if(q==null)q=C.dw
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.cjr(r)
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
Rd(d){return this.b3M(d)},
b3M(d){var x=0,w=A.k(y.H),v=this
var $async$Rd=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.EQ(),$async$Rd)
case 2:return A.i(null,w)}})
return A.j($async$Rd,w)},
EQ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$EQ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.cjx(B.bX_(A.cK(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$EQ)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cA(p,A.x(p).i("cA<1>")).aV(s.gaVq(),!0,s.gaUr(),new B.axP(s))
u=2
x=6
break
case 4:u=3
n=t
s.ZP()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$EQ,w)},
aVr(d){var x,w,v,u
try{x=C.Y.cG(0,J.n(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.c7p(w))}catch(u){}},
ZP(){var x,w=this,v=w.c
if(v!=null)v.W(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a8m[v]
w.f=v+1
v=w.d
if(v!=null)v.W(0)
w.d=A.dk(A.df(0,0,0,0,x),new B.axQ(w))},
Iw(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Iw=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.W(0)
s=t.c
s=s==null?null:s.W(0)
x=2
return A.e(y.x.b(s)?s:A.dm(s,y.H),$async$Iw)
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
r=s.w=new B.ap6(s,q)}s=r.a0(0)}x=7
return A.e(y._.b(s)?s:A.dm(s,y.z),$async$Iw)
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
return A.j($async$Iw,w)}}
B.a8t.prototype={
rS(d){return this.baV(d)},
baV(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$rS=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e((s==null?t.a=A.a3J():s).aL(0),$async$rS)
case 6:x=7
return A.e(t.a.a6B(d),$async$rS)
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
q=u
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
B.aRN.prototype={
a1X(d,e){return this.b5j(d,e)},
b5j(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a1X=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a9(["mandatory",A.E(r,r),"optional",A.a([A.a9(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.ft(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.c1(t)))
t=J.n(s)
v=B.cqx(C.c6.gjK().b5(new A.f0(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a1X,w)}}
B.tj.prototype={
Vm(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cX(w,A.W(w).i("cX<1,aB>"))
J.h6(w,new B.aN4(x))
return x},
Lf(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cX(w,A.W(w).i("cX<1,aB>"))
J.h6(w,new B.aN5(x))
return x},
a6i(d){var x=A.G(this.Vm(0),!0,y.G)
C.b.t(x,this.Lf(0))
return x}}
B.a8X.prototype={
azQ(d){var x=this,w=x.d
w.addEventListener("ended",A.bP(new B.aN1(x)))
w.addEventListener("mute",A.bP(new B.aN2(x)))
w.addEventListener("unmute",A.bP(new B.aN3(x)))},
sl5(d,e){this.d.enabled=e},
aL(d){var x=0,w=A.k(y.H),v=this
var $async$aL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aL,w)}}
B.aMO.prototype={
E3(d,e){return this.as1(0,e)},
as1(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$E3=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cC_())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.jb(e.h(0,"video"),"facingMode")
e.cz(0,"video",new B.aMQ())
e.cz(0,"audio",new B.aMR())}catch(a0){A.o1("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.ie(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.E(y.N,y.z)
J.h6(s,new B.aMS(r))
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
return A.e(A.e2(o.getUserMedia(h.a(n)),h),$async$E3)
case 10:m=a2
v=new B.tj(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.e2(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$E3)
case 11:l=a2
v=new B.tj(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.R(f)
i=J.n(k)
throw A.m("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$E3,w)}}
B.aaE.prototype={
azW(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bP(new B.aRP(x)))
w.addEventListener("icecandidate",A.bP(new B.aRQ(x)))
w.addEventListener("iceconnectionstatechange",A.bP(new B.aRR(x)))
w.onicegatheringstatechange=A.bP(new B.aRS(x))
w.addEventListener("signalingstatechange",A.bP(new B.aRT(x)))
if(!$.c0I())w.addEventListener("connectionstatechange",A.bP(new B.aRU(x)))
w.addEventListener("negotiationneeded",A.bP(new B.aRV(x)))
w.addEventListener("track",A.bP(new B.aRW(x)))},
Rr(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Rr=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e2(s.createOffer(y.m.a(A.c1(A.E(y.N,y.z)))),y.A),$async$Rr)
case 3:t=f
v=new B.CJ(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Rr,w)},
Ro(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Ro=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e2(s.createAnswer(y.m.a(A.c1(A.E(y.N,y.z)))),y.A),$async$Ro)
case 3:t=f
v=new B.CJ(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ro,w)},
Eh(d,e){return this.at7(0,e)},
at7(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Eh=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e2(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Eh)
case 2:return A.i(null,w)}})
return A.j($async$Eh,w)},
Ej(d,e){return this.ato(0,e)},
ato(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Ej=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e2(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$Ej)
case 2:return A.i(null,w)}})
return A.j($async$Ej,w)},
Qs(d){return this.b1R(d)},
b1R(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qs=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.e2(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Qs)
case 2:return A.i(null,w)}})
return A.j($async$Qs,w)},
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
a0O(d,e,f){return this.b26(0,e,f)},
b26(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a0O=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.aaF()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0O,w)}}
B.aaF.prototype={}
B.bYU.prototype={
aL(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.R(r)
if(y.L.b(s)){u=s
s=u
J.n(s)
throw A.m("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aL,w)}}
B.So.prototype={
saoo(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.J2()
if(x!=null)x.style.objectFit=e},
ail(){var x=this,w=x.J2(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.ald(u,x.z!=null,0,t))},
sa74(d,e){var x,w,v,u,t=this
t.z=e
if(e.Lf(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.au(y.l.b(x)?x:new A.cX(x,A.W(x).i("cX<1,aB>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Vm(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.au(y.l.b(x)?x:new A.cX(x,A.W(x).i("cX<1,aB>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aHK()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.J2()
if(u!=null){u.srcObject=t.x
x=t.J2()
x.toString
t.a8S(x)}t.sp(0,t.a.b49(t.z!=null))},
aHK(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
J2(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.Q)(t),++r)t[r].W(0)
q=u.J2()
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
$.po().t3("RTCVideoRenderer-"+v.Q,new B.aS1(v),!0)
return A.i(null,w)}})
return A.j($async$iU,w)},
a8S(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Sq.prototype={
N(){return new B.Sr()}}
B.Sr.prototype={
U(){var x,w,v=this
v.X()
v.a.c.a9(0,v.gaSt())
x=v.a
w=x.c
w.as=x.e
w.saoo(0,x.d===D.tm?"contain":"cover")},
aSu(){if(this.c!=null)this.m(new B.aS2())},
l(){if(this.c!=null)this.a1()},
aX(d){var x,w
this.be(d)
A.dk(A.df(0,0,10,0,0),new B.aS4(this))
x=this.a
w=x.c
w.saoo(0,x.d===D.tm?"contain":"cover")},
C(d){return new A.ix(new B.aS3(this),null)}}
B.a7j.prototype={
azG(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.Ye(d,x,new A.b2(new A.ay(w,y.c),y.r),e,g.i("Ye<0>"))
if(f.a.giv())f.a=new B.TW(g.i("@<0>").c0(g).i("TW<1,2>")).hb(f.a)
w=A.fI(null,new B.aG9(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aeM(){var x,w
this.d=!0
x=this.c
if(x!=null)x.W(0)
w=this.b
w===$&&A.d()
w.a0(0)}}
B.Ye.prototype={
D(d,e){if(this.e)throw A.m(A.ag("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
dd(d,e){if(this.e)throw A.m(A.ag("Cannot add event after closing."))
if(this.d)return
this.aKg(d,e)},
hw(d){return this.dd(d,null)},
aKg(d,e){var x=this
if(x.w){x.a.a.dd(d,e)
return}x.c.fK(d,e)
x.aeN()
x.b.aeM()
x.a.a.a0(0).fo(new B.bnr())},
a0(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aeM()
x.c.co(0,x.a.a.a0(0))}return x.c.a},
aeN(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.ds(0)
return},
$idV:1}
B.acZ.prototype={}
B.ad_.prototype={}
B.zT.prototype={
aa9(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.FM(d,e))
x.a0(0)},
a6A(d){var x
if((this.b.b&4)!==0)throw A.m(B.bZy())
x=A.c1(d)
x.toString
this.a.send(x)},
xm(d,e,f){return this.b3x(0,e,f)},
b3x(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$xm=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.m(B.bZy())
u.a0(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$xm,w)},
$ibZx:1}
B.u9.prototype={}
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
B.aso.prototype={
azu(d){d.eY(new B.ass(this),new B.ast(this),y.a)}}
B.ap6.prototype={
a0(d){var x=this.b
x.e=x.d=null
return this.av6(0)}}
B.ae9.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.xG.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Sk.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.xF.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.nw.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.aaG.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aRM.prototype={}
B.QY.prototype={}
B.HA.prototype={
j(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aMN.prototype={}
B.In.prototype={}
B.Sl.prototype={}
B.Sm.prototype={}
B.aRX.prototype={}
B.CJ.prototype={}
B.Sn.prototype={}
B.Sp.prototype={
ald(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Sp(x,w,v)},
b49(d){return this.ald(null,d,null,null)},
j(d){var x=this
return A.a6(x).j(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","AF(I)","~(Je)","bt(In)","bt(Sn)","bt(nw)","~(@)","tj(@)","bt(bZx)","~(u9)"])
B.aXF.prototype={
$0(){return J.ciL(this.a.b8())},
$S:1}
B.aXG.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.R(v)
if(y.i.b(u)){x=u
w=A.bg(v)
this.b.dd(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.auh.prototype={
$1(d){if(d==null)return null
return A.c9(J.n(d))},
$S:150}
B.biO.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.GH(!0)},
$S:0}
B.biP.prototype={
$1(d){return this.a.Qh()},
$S:32}
B.biL.prototype={
$0(){var x=this.a.c
if(x!=null)A.ad(x,!1).bL()},
$S:0}
B.biM.prototype={
$0(){return this.a.e=!0},
$S:0}
B.biI.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.biJ.prototype={
$0(){return this.a.d=!1},
$S:0}
B.biK.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.biF.prototype={
$0(){return this.a.f=!0},
$S:0}
B.biG.prototype={
$0(){return this.a.f=!1},
$S:0}
B.biH.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.c4k(x.w,null,w,u,!1,v)},
$S:z+2}
B.biN.prototype={
$0(){return this.a.aVH()},
$S:0}
B.bin.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.A3("annule",C.ej,!1)
x.nn(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bio.prototype={
$0(){var x=this.a
x.fr=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bip.prototype={
$1(d){this.a.A3("candidat_ice",d,!1)},
$S:385}
B.biq.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bim(x))},
$S:0}
B.bim.prototype={
$0(){return this.a.fx=!0},
$S:0}
B.bir.prototype={
$0(){this.a.nn(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bis.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bit.prototype={
$1(d){var x=this.a,w=x.ax
if(x.c!=null&&w!=null&&x.x)x.m(new B.bil(x,w))},
$S:32}
B.bil.prototype={
$0(){return this.a.ay=new A.az(Date.now(),0,!1).eH(this.b)},
$S:0}
B.biu.prototype={
$1(d){},
$S:167}
B.biv.prototype={
$1(d){this.a.G4()},
$S:32}
B.biy.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.af8()
x.abt("reponse",d)},
$S:386}
B.biz.prototype={
$1(d){this.a.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.biA.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.af8()},
$S:28}
B.biB.prototype={
$1(d){this.a.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.biC.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.abt("offre",d)},
$S:386}
B.biD.prototype={
$1(d){this.a.nn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.biw.prototype={
$0(){var x=this.a
x.x=!0
x.ax=new A.az(Date.now(),0,!1)
x.ay=C.S},
$S:0}
B.bix.prototype={
$1(d){return A.E(y.N,y.z)},
$S:131}
B.bik.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bij.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bii.prototype={
$0(){return this.a.at=this.b},
$S:0}
B.biE.prototype={
$2(d,e){if(!d)this.a.GD()},
$S:1151}
B.aX3.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a9(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aX4.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gP(x):null
if(w!=null)this.a.aGe(w)},
$S:z+5}
B.aX5.prototype={
$1(d){var x
if(d===D.Lh){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.axP.prototype={
$1(d){return this.a.ZP()},
$S:21}
B.axQ.prototype={
$0(){var x=this.a
if(!x.e)x.EQ()},
$S:0}
B.bUk.prototype={
$1(d){return d.length!==0},
$S:11}
B.aN4.prototype={
$1(d){return this.a.push(B.bYk(d))},
$S:21}
B.aN5.prototype={
$1(d){return this.a.push(B.bYk(d))},
$S:21}
B.aN1.prototype={
$1(d){},
$S:22}
B.aN2.prototype={
$1(d){},
$S:22}
B.aN3.prototype={
$1(d){},
$S:22}
B.aMQ.prototype={
$0(){return!1},
$S:46}
B.aMR.prototype={
$0(){return!1},
$S:46}
B.aMS.prototype={
$1(d){J.h6(d,new B.aMP(this.a))},
$S:385}
B.aMP.prototype={
$2(d,e){this.a.k(0,d,e)},
$S:47}
B.aRP.prototype={
$1(d){},
$S:22}
B.aRQ.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.In(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aRR.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cBz(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.c0I())switch(w.cx.a){case 0:w.cy=D.Lm
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
$S:30}
B.aRS.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cBA(w.iceGatheringState)},
$S:30}
B.aRT.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cDt(w.signalingState)},
$S:30}
B.aRU.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cCL(w.connectionState)},
$S:30}
B.aRV.prototype={
$1(d){},
$S:30}
B.aRW.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bYk(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cX(x,A.W(x).i("cX<1,aB>"))
w=J.dx(x,new B.aRO(w),y.h)
v.$1(new B.Sn(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aRO.prototype={
$1(d){return new B.tj(d,this.a.as)},
$S:z+8}
B.bUs.prototype={
$1(d){return J.fU(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:11}
B.aS1.prototype={
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
x.a8S(t)
v=y.k.c
w.push(A.ij(t,"canplay",new B.aRY(x),!1,v))
w.push(A.ij(t,"resize",new B.aRZ(x),!1,v))
w.push(A.ij(t,"error",new B.aS_(t),!1,v))
w.push(A.ij(t,"ended",new B.aS0(),!1,v))
return t},
$S:158}
B.aRY.prototype={
$1(d){this.a.ail()},
$S:21}
B.aRZ.prototype={
$1(d){this.a.ail()},
$S:21}
B.aS_.prototype={
$1(d){var x,w,v=this.a.error
A.o1("RTCVideoRenderer: videoElement.onError, "+J.n(v))
v.toString
x=C.GJ.h(0,A.at(v,"code"))
x.toString
w=!J.t(A.at(v,"message"),"")?A.at(v,"message"):"No further diagnostic information can be determined or provided."
throw A.m(A.nr(x,C.GI.h(0,A.at(v,"code")),w,null))},
$S:25}
B.aS0.prototype={
$1(d){},
$S:21}
B.aS2.prototype={
$0(){},
$S:0}
B.aS4.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aS3.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a7A("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cM(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1152}
B.aG9.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fc(w.ghN(w),new B.aG8(v),w.got())},
$S:0}
B.aG8.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aeN()
x=x.b
x===$&&A.d()
x.a0(0)},
$S:0}
B.bnr.prototype={
$1(d){},
$S:16}
B.awo.prototype={
$1(d){this.a.co(0,this.b)},
$S:22}
B.awp.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.h_(new B.K8("Failed to connect WebSocket"))
else this.b.aa9(1006,"error")},
$S:22}
B.awq.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cs("data")
if(typeof x==="string")w.b=new B.JD(A.bk(x))
else if(typeof x==="object"&&A.c5o(y.m.a(x),"ArrayBuffer"))w.b=new B.Fl(A.Rn(y.o.a(x),0,null))
else throw A.m(A.ag("unexpected message type: "+J.aF(x).j(0)))
v.D(0,w.b8())},
$S:25}
B.awr.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.co(0,this.b)
this.b.aa9(d.code,d.reason)},
$S:22}
B.ass.prototype={
$1(d){var x=d.b,w=this.a
new A.cA(x,A.x(x).i("cA<1>")).cL(new B.asp(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cA(x,A.x(x).i("cA<1>")).bbb(new B.asq(d),new B.asr(w,d))
w.f.ds(0)},
$S:z+9}
B.asp.prototype={
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
B.asq.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bZy())
s=A.c1(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a6A(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a6A(new Uint8Array(A.cv(u)))
break $label1$1}t=A.aQ("Cannot send "+J.aF(d).j(0))
throw A.m(t)}}catch(r){if(!(A.R(r) instanceof B.K7))throw r}},
$S:18}
B.asr.prototype={
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
B.ast.prototype={
$1(d){var x,w=d instanceof A.UW?d:new B.ae9(J.n(d)),v=this.a
v.f.h_(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hw(w)
v=v.a
v===$&&A.d()
v.a0(0)},
$S:30};(function aliases(){var x=B.Ga.prototype
x.av6=x.a0})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Xm.prototype,"gaAC","Mg",0)
var v
w(v=B.Xl.prototype,"gb02","aie",3)
x(v,"gafs","GD",0)
x(v,"ga94","ME",0)
x(v,"ga93","MD",0)
x(v,"ga91","MA",0)
x(v,"ga92","MB",0)
w(v=B.a4U.prototype,"gaVq","aVr",7)
x(v,"gaUr","ZP",1)
x(B.So.prototype,"gdY","l",0)
x(B.Sr.prototype,"gaSt","aSu",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a3,[B.Ga,B.aug,B.Je,B.a57,B.aX2,B.a4U,B.a8t,B.aRM,B.QY,B.HA,B.aMN,B.Sl,B.Sm,B.aRX,B.ad_,B.Ye,B.acZ,B.zT,B.u9,B.K8,B.ae9,B.In,B.CJ,B.Sn,B.Sp])
w(B.TW,A.fJ)
x(A.jL,[B.aXF,B.biO,B.biL,B.biM,B.biI,B.biJ,B.biK,B.biF,B.biG,B.biN,B.bin,B.bio,B.biq,B.bim,B.bir,B.bis,B.bil,B.biw,B.bik,B.bij,B.bii,B.axQ,B.aMQ,B.aMR,B.aS2,B.aS4,B.aG9,B.aG8,B.asr])
x(A.iU,[B.aXG,B.auh,B.biP,B.biH,B.bip,B.bit,B.biu,B.biv,B.biy,B.biz,B.biA,B.biB,B.biC,B.biD,B.bix,B.aX3,B.aX4,B.aX5,B.axP,B.bUk,B.aN4,B.aN5,B.aN1,B.aN2,B.aN3,B.aMS,B.aRP,B.aRQ,B.aRR,B.aRS,B.aRT,B.aRU,B.aRV,B.aRW,B.aRO,B.bUs,B.aS1,B.aRY,B.aRZ,B.aS_,B.aS0,B.bnr,B.awo,B.awp,B.awq,B.awr,B.ass,B.asp,B.asq,B.ast])
x(A.O,[B.pP,B.AF,B.Sq])
x(A.U,[B.Xm,B.Xl,B.Sr])
x(A.aw,[B.W0,B.afP,B.yz])
x(A.rx,[B.biE,B.aMP,B.aS3])
w(B.aRN,B.aRM)
w(B.tj,B.QY)
w(B.a8X,B.HA)
w(B.aMO,B.aMN)
w(B.aaE,B.Sl)
w(B.aaF,B.Sm)
w(B.bYU,B.aRX)
w(B.So,A.di)
x(B.ad_,[B.a7j,B.aso])
x(B.u9,[B.JD,B.Fl,B.FM])
w(B.K7,B.K8)
w(B.ap6,B.Ga)
x(A.KE,[B.xG,B.Sk,B.xF,B.nw,B.aaG])})()
A.nW(b.typeUniverse,JSON.parse('{"Ga":{"dV":["1"]},"TW":{"fJ":["1","2"],"fJ.S":"1","fJ.T":"2"},"AF":{"O":[],"p":[]},"pP":{"O":[],"p":[]},"Xm":{"U":["pP"]},"W0":{"aw":[],"p":[]},"Xl":{"U":["AF"]},"afP":{"aw":[],"p":[]},"yz":{"aw":[],"p":[]},"tj":{"QY":[]},"a8X":{"HA":[]},"aaE":{"Sl":[]},"aaF":{"Sm":[]},"So":{"di":["Sp"],"aZ":[]},"Sq":{"O":[],"p":[]},"Sr":{"U":["Sq"]},"Ye":{"dV":["1"]},"zT":{"bZx":[]},"JD":{"u9":[]},"Fl":{"u9":[]},"FM":{"u9":[]},"K8":{"bK":[]},"K7":{"bK":[]},"ap6":{"dV":["@"]},"ae9":{"bK":[]}}'))
A.c_5(b.typeUniverse,JSON.parse('{"Ga":1,"ad_":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("zT"),L:x("bK"),_:x("av<@>"),x:x("av<~>"),S:x("H<ai<o,M>>"),t:x("H<ai<o,@>>"),Q:x("H<HA>"),d:x("H<j0<@>>"),s:x("H<o>"),p:x("H<p>"),m:x("aB"),l:x("D<aB>"),F:x("D<ai<o,@>>"),j:x("D<@>"),I:x("D<v>"),P:x("ai<o,@>"),f:x("ai<@,@>"),E:x("QY"),G:x("HA"),h:x("tj"),o:x("qa"),a:x("bt"),K:x("a3"),J:x("Sl"),e:x("Sm"),v:x("CJ"),Z:x("acZ<a3?>"),N:x("o"),i:x("qG"),M:x("e9"),D:x("u9"),U:x("X<o>"),g:x("dH<Je>"),n:x("dH<~>"),V:x("b2<zT>"),r:x("b2<@>"),R:x("b2<~>"),k:x("Xw<aB>"),C:x("p9<aB>"),u:x("ay<zT>"),c:x("ay<@>"),W:x("ay<~>"),q:x("kf"),y:x("M"),z:x("@"),A:x("aB?"),X:x("a3?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.V_=new B.a57(C.kf)
D.yv=new A.ar(32,0,32,0)
D.qu=new A.aq(57638,"MaterialIcons",null,!1)
D.ze=new A.aq(57639,"MaterialIcons",null,!1)
D.a_I=new A.aq(58337,"MaterialIcons",null,!1)
D.a_J=new A.aq(58341,"MaterialIcons",null,!1)
D.a_N=new A.aq(58923,"MaterialIcons",null,!1)
D.zk=new A.aq(59048,"MaterialIcons",null,!1)
D.a_O=new A.aq(59049,"MaterialIcons",null,!1)
D.a_P=new A.aq(59077,"MaterialIcons",null,!1)
D.a8m=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.aca=A.a(x([]),y.Q)
D.GV=new A.fH("FlutterWebRTC.Method",C.bc,null)
D.akC=new B.nw(0,"RTCIceConnectionStateNew")
D.akD=new B.nw(1,"RTCIceConnectionStateChecking")
D.akE=new B.nw(2,"RTCIceConnectionStateCompleted")
D.akF=new B.nw(3,"RTCIceConnectionStateConnected")
D.akG=new B.nw(4,"RTCIceConnectionStateCount")
D.Lh=new B.nw(5,"RTCIceConnectionStateFailed")
D.akH=new B.nw(6,"RTCIceConnectionStateDisconnected")
D.Li=new B.nw(7,"RTCIceConnectionStateClosed")
D.Lj=new B.Sk(0,"RTCIceGatheringStateNew")
D.akI=new B.Sk(1,"RTCIceGatheringStateGathering")
D.akJ=new B.Sk(2,"RTCIceGatheringStateComplete")
D.tl=new B.xF(0,"RTCPeerConnectionStateClosed")
D.Lk=new B.xF(1,"RTCPeerConnectionStateFailed")
D.Ll=new B.xF(2,"RTCPeerConnectionStateDisconnected")
D.Lm=new B.xF(3,"RTCPeerConnectionStateNew")
D.Ln=new B.xF(4,"RTCPeerConnectionStateConnecting")
D.Lo=new B.xF(5,"RTCPeerConnectionStateConnected")
D.akK=new B.xG(0,"RTCSignalingStateStable")
D.akL=new B.xG(1,"RTCSignalingStateHaveLocalOffer")
D.akM=new B.xG(2,"RTCSignalingStateHaveRemoteOffer")
D.akN=new B.xG(3,"RTCSignalingStateHaveLocalPrAnswer")
D.akO=new B.xG(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Lp=new B.xG(5,"RTCSignalingStateClosed")
D.akP=new B.Sp(0,0,0)
D.tm=new B.aaG(0,"RTCVideoViewObjectFitContain")
D.Lq=new B.aaG(1,"RTCVideoViewObjectFitCover")
D.o5=new A.c8(20,null,null,null)
D.aok=new A.c8(48,null,null,null)
D.MV=new A.c8(null,64,null,null)
D.art=new A.A(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nz=new A.A(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.arP=new A.A(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.NI=new A.A(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ux=new A.A(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c8x=!1
$.c6M=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cII","c0W",()=>new B.aRN())
x($,"cFl","c0I",()=>C.c.q(A.at(A.at(A.at(A.c0n(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"HyzJ50z5Pv3uOw7tIkWt2h7AXw0=");