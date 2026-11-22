((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={HV:function HV(){},Wq:function Wq(d){this.$ti=d},b30:function b30(d){this.a=d},b31:function b31(d,e){this.a=d
this.b=e},
cuB(d){var x
B.c7Q()
if(d.length===0)return
x=A.c6(new B.c9I(d))
self.window.addEventListener("beforeunload",x)
$.chr=new B.c9H(x)},
c7Q(){var x=$.chr
if(x!=null)x.$0()
$.chr=null},
c9I:function c9I(d){this.a=d},
c9H:function c9H(d){this.a=d},
a73(d){var x,w,v,u,t=new B.azF(),s=J.Q(d),r=s.h(d,"id")
r=J.l(r==null?"":r)
x=s.h(d,"conversation_id")
J.l(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.l(w==null?"":w)
A.az(s.h(d,"appele_id"))
A.az(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.l(v==null?"audio":v)
u=s.h(d,"statut")
u=J.l(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.azE(r,x,w,v,u)},
cg_(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mw(t,y.N,y.z):C.bn
if(u.h(d,"cree_le")!=null)A.bT(J.l(u.h(d,"cree_le")))
return new B.Ld(s,x,w,v)},
cE_(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.YU
x=A.a([],y.t)
for(r=J.ap(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mw(s,u,t))}return new B.a8G(x)},
cvr(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oI(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.apS(w,v)},
cUr(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.apV(u,A.hZ(w)?w:null,v)},
azE:function azE(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azF:function azF(){},
Ld:function Ld(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8G:function a8G(d){this.a=d},
cmy(d,e,f,g,h,i,j){return new B.qE(f,g,j,i,e,d,null)},
cek(d,e,f,g,h,i,j,k,l,m){return new B.qD(f,m,h,l,i,d,j,k,e,g,null)},
crl(d,e,f,g,h,i,j,k,l,m,n){return new B.ak3(e,g,f,d,n,j,i,h,m,k,l,null)},
ctl(d,e){var x=null
return new A.W(D.rD,A.c(d.toUpperCase(),2,C.a4,x,x,A.be(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
qE:function qE(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_f:function a_f(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
buj:function buj(d){this.a=d},
buk:function buk(d){this.a=d},
bug:function bug(d){this.a=d},
buh:function buh(d){this.a=d},
bud:function bud(d){this.a=d},
bue:function bue(d){this.a=d},
buf:function buf(d){this.a=d},
bua:function bua(d){this.a=d},
bub:function bub(d){this.a=d},
buc:function buc(d){this.a=d},
bui:function bui(d){this.a=d},
YG:function YG(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qD:function qD(d,e,f,g,h,i,j,k,l,m,n){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.as=m
_.a=n},
a_e:function a_e(d,e){var _=this
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
_.go=_.fy=!1
_.c=_.a=null},
btW:function btW(d){this.a=d},
btX:function btX(d){this.a=d},
btV:function btV(d){this.a=d},
btY:function btY(d){this.a=d},
btZ:function btZ(){},
bu_:function bu_(d){this.a=d},
btU:function btU(d,e){this.a=d
this.b=e},
bu0:function bu0(){},
bu1:function bu1(d){this.a=d},
btE:function btE(d){this.a=d},
btF:function btF(d){this.a=d},
btG:function btG(d){this.a=d},
btH:function btH(d){this.a=d},
btD:function btD(d){this.a=d},
btI:function btI(d){this.a=d},
btJ:function btJ(d){this.a=d},
btK:function btK(d){this.a=d},
btC:function btC(d,e){this.a=d
this.b=e},
btL:function btL(){},
btM:function btM(d){this.a=d},
bu3:function bu3(d){this.a=d},
bu4:function bu4(d){this.a=d},
bu5:function bu5(d){this.a=d},
bu6:function bu6(d){this.a=d},
bu7:function bu7(d){this.a=d},
bu8:function bu8(d){this.a=d},
btR:function btR(d,e){this.a=d
this.b=e},
btS:function btS(d){this.a=d},
btT:function btT(d){this.a=d},
bu2:function bu2(){},
btB:function btB(d,e){this.a=d
this.b=e},
btA:function btA(d,e){this.a=d
this.b=e},
btz:function btz(d,e){this.a=d
this.b=e},
btO:function btO(d){this.a=d},
btP:function btP(d){this.a=d},
btN:function btN(d){this.a=d},
btQ:function btQ(d){this.a=d},
bu9:function bu9(d){this.a=d},
ak3:function ak3(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
YH:function YH(d,e){this.c=d
this.a=e},
zL:function zL(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Nt:function Nt(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
aoF:function aoF(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQ5:function bQ5(d,e){this.a=d
this.b=e},
a5r:function a5r(){},
b2o:function b2o(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b2p:function b2p(d){this.a=d},
b2q:function b2q(d){this.a=d},
b2r:function b2r(d){this.a=d},
a8s:function a8s(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aDk:function aDk(d){this.a=d},
aDl:function aDl(d){this.a=d},
caK(d){var x=y.U,w=A.G(new A.X(A.a(d.split(" "),y.s),new B.caL(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaY(w),0)).toUpperCase()},
caL:function caL(){},
acm:function acm(){this.a=null},
aY8:function aY8(){},
ua:function ua(d,e){this.e=d
this.b=e},
aT7:function aT7(d){this.a=d},
aT8:function aT8(d){this.a=d},
cf9(d){var x=new B.acQ(d)
x.aH2(d)
return x},
acQ:function acQ(d){this.d=d},
aT4:function aT4(d){this.a=d},
aT5:function aT5(d){this.a=d},
aT6:function aT6(d){this.a=d},
aSS:function aSS(){},
aSU:function aSU(){},
aSV:function aSV(){},
aSW:function aSW(d){this.a=d},
aST:function aST(d){this.a=d},
cJZ(d,e){var x=y.N
x=new B.aeG(d,e,A.C(x,y.E),A.C(x,y.z))
x.aHb(d,e)
return x},
aeG:function aeG(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYa:function aYa(d){this.a=d},
aYb:function aYb(d){this.a=d},
aYc:function aYc(d){this.a=d},
aYd:function aYd(d){this.a=d},
aYe:function aYe(d){this.a=d},
aYf:function aYf(d){this.a=d},
aYg:function aYg(d){this.a=d},
aYh:function aYh(d){this.a=d},
aY9:function aY9(d){this.a=d},
aeH:function aeH(){},
cfO:function cfO(d){this.a=d},
cWV(){return C.b.nP(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.caU())!==-1},
caU:function caU(){},
cpc(){var x=A.a([],y.d),w=$.cpd
$.cpd=w+1
return new B.UL(w,x,D.av_,$.ae())},
UL:function UL(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYn:function aYn(d){this.a=d},
aYj:function aYj(d){this.a=d},
aYk:function aYk(d){this.a=d},
aYl:function aYl(d){this.a=d},
aYm:function aYm(){},
cfP(d,e,f){return new B.UN(d,f,e,null)},
UN:function UN(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UO:function UO(){this.c=this.a=null},
aYo:function aYo(){},
aYq:function aYq(d){this.a=d},
aYp:function aYp(d){this.a=d},
cnb(d,e,f,g){var x,w={}
w.a=d
x=new B.aaZ(g.i("aaZ<0>"))
x.aGK(e,f,w,g)
return x},
aaZ:function aaZ(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aLP:function aLP(d,e){this.a=d
this.b=e},
aLO:function aLO(d){this.a=d},
a08:function a08(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bzs:function bzs(){},
ah3:function ah3(d){this.b=this.a=$
this.$ti=d},
ah4:function ah4(){},
cdF(d,e){return B.cDc(d,e)},
cDc(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$cdF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.q4("ws")&&!d.q4("wss"))throw A.p(A.he(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.l(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.B4(r,A.hb(null,null,null,!1,y.D))
u=new A.aC($.aM,y.u)
p=new A.bg(u,y.V)
if(J.r(r.readyState,1))p.cI(0,q)
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hO(new B.Me("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pW(r,"open",!1,y.C).gU(0).aM(new B.aBT(p,q),y.H)
t=y.C
s=y.H
new A.pW(r,"error",!1,t).gU(0).aM(new B.aBU(p,q),s)
A.iC(r,"message",new B.aBV(q),!1,y.m)
new A.pW(r,"close",!1,t).gU(0).aM(new B.aBW(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$cdF,w)},
B4:function B4(d,e){this.a=d
this.b=e},
aBT:function aBT(d,e){this.a=d
this.b=e},
aBU:function aBU(d,e){this.a=d
this.b=e},
aBV:function aBV(d){this.a=d},
aBW:function aBW(d,e){this.a=d
this.b=e},
cgt(){return new B.Md("Connection Closed")},
v3:function v3(){},
LE:function LE(d){this.a=d},
GU:function GU(d){this.a=d},
Hk:function Hk(d,e){this.a=d
this.b=e},
Me:function Me(d){this.a=d},
Md:function Md(d){this.a=d},
cCJ(d){var x=null,w=$.aM,v=new B.ah3(y.Z),u=y.X,t=A.hb(x,x,x,!0,u),s=A.hb(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.cnb(new A.cY(s,r.i("cY<1>")),new A.G4(t,q.i("G4<1>")),!0,u)
v.b=B.cnb(new A.cY(t,q.i("cY<1>")),new A.G4(s,r.i("G4<1>")),!1,u)
v=new B.axq(new A.bg(new A.aC(w,y.W),y.R),v)
v.aGs(d)
return v},
axq:function axq(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axu:function axu(d){this.a=d},
axr:function axr(d){this.a=d},
axs:function axs(d){this.a=d},
axt:function axt(d,e){this.a=d
this.b=e},
axv:function axv(d){this.a=d},
atU:function atU(d,e){this.b=d
this.a=e},
ain:function ain(d){this.a=d},
cWt(d){switch(d){case"new":return D.auN
case"checking":return D.auO
case"connected":return D.auQ
case"completed":return D.auP
case"failed":return D.Op
case"disconnected":return D.auS
case"closed":return D.Oq
case"count":return D.auR}return D.Oq},
cWu(d){switch(d){case"new":return D.Or
case"gathering":return D.auT
case"complete":return D.auU}return D.Or},
cYC(d){switch(d){case"stable":return D.auV
case"have-local-offer":return D.auW
case"have-local-pranswer":return D.auY
case"have-remote-offer":return D.auX
case"have-remote-pranswer":return D.auZ
case"closed":return D.Ox}return D.Ox},
cXM(d){switch(d){case"new":return D.Ou
case"connecting":return D.Ov
case"connected":return D.Ow
case"closed":return D.v4
case"disconnected":return D.Ot
case"failed":return D.Os}return D.v4},
yN:function yN(d,e){this.a=d
this.b=e},
UH:function UH(d,e){this.a=d
this.b=e},
yM:function yM(d,e){this.a=d
this.b=e},
o8:function o8(d,e){this.a=d
this.b=e},
aeI:function aeI(d,e){this.a=d
this.b=e},
aY7:function aY7(){},
Tc:function Tc(){},
Ju:function Ju(){},
aSR:function aSR(){},
Kk:function Kk(d,e,f){this.a=d
this.b=e
this.c=f},
UI:function UI(){},
UJ:function UJ(){},
aYi:function aYi(){},
Ea:function Ea(d,e){this.a=d
this.b=e},
UK:function UK(d){this.b=d},
UM:function UM(d,e,f){this.a=d
this.b=e
this.c=f},
ceL(d){var x=0,w=A.k(y.y)
var $async$ceL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.p("The is not a video track => "+d.l(0))
throw A.p("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$ceL,w)},
ada(d){var x=0,w=A.k(y.H),v
var $async$ada=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b7Y("enableSpeakerphone",A.a4(["enable",d],y.N,v),v,v),$async$ada)
case 2:return A.i(null,w)}})
return A.j($async$ada,w)},
aUU(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aUU=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mw(y.f.a(A.c9o(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.V5(0,u),$async$aUU)
case 5:case 4:v=A.dd(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUU,w)},
b7Y(d,e,f,g){return B.cNz(d,e,f,g,f.i("0?"))},
cNz(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b7Y=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b7X(),$async$b7Y)
case 3:v=D.JS.cm(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b7Y,w)},
b7X(){var x=0,w=A.k(y.H),v,u
var $async$b7X=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cr6?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.JS.cm("initialize",A.a4(["options",A.C(v,u)],v,u),!1,y.H),$async$b7X)
case 4:$.cr6=!0
case 3:return A.i(null,w)}})
return A.j($async$b7X,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[27]
B.HV.prototype={
E(d,e){this.a.E(0,e)},
dA(d,e){this.a.dA(d,e)},
aa(d){return this.a.aa(0)},
$ie5:1}
B.Wq.prototype={
hN(d){var x=A.cI("subscription"),w=A.hb(new B.b30(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b31(this,w),w.gnG(w),w.gpE())
return new A.cY(w,A.x(w).i("cY<1>"))}}
B.azE.prototype={}
B.Ld.prototype={}
B.a8G.prototype={}
B.qE.prototype={
O(){return new B.a_f()}}
B.a_f.prototype={
S(){var x,w,v=this
v.W()
x=v.a
x.toString
v.z=!0
w=new B.acm()
v.y!==$&&A.aL()
v.y=w
if(!x.y)w.ue(A.Bi(C.ld,$.vD().a).c)
v.PX()
v.r=A.dl(C.c8,new B.buj(v))
v.w=A.hc(C.rr,new B.buk(v))},
m(){var x=this,w=x.r
if(w!=null)w.X(0)
w=x.w
if(w!=null)w.X(0)
w=x.x
if(w!=null)w.X(0)
w=x.y
w===$&&A.d()
w.it()
if(x.z)w.hr()
x.a2()},
a44(){var x=this.x
if(x!=null)x.X(0)
this.x=A.dl(C.fb,new B.bug(this))},
UA(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$UA=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.K()
x=7
return A.e(o.EA(p.c),$async$UA)
case 7:r=e
q=B.a73(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.k(new B.buh(s))
p=s.r
if(p!=null)p.X(0)
p=s.w
if(p!=null)p.X(0)
p=s.y
p===$&&A.d()
p.it()
s.a44()}u=2
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
return A.j($async$UA,w)},
PX(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$PX=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.K()
x=7
return A.e(n.EA(o.c),$async$PX)
case 7:r=e
q=B.a73(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null){o=$.K()
m=o.gwZ()}p=m
if(q.w!=="sonne"||q.c===p){s.k(new B.bud(s))
o=s.y
o===$&&A.d()
o.it()
s.a44()
x=1
break}s.k(new B.bue(s))
if(s.a.y)s.H1()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.k(new B.buf(s))
o=s.y
o===$&&A.d()
o.it()
s.a44()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$PX,w)},
H1(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$H1=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.k(new B.bua(s))
u=4
q=s.a
q.toString
p=$.K()
x=7
return A.e(p.LO(q.c,"accepte"),$async$H1)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.M(n)
if(s.c==null){x=1
break}s.k(new B.bub(s))
q=s.c
q.toString
p=J.l(r)
q.q(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.X(0)
q=s.w
if(q!=null)q.X(0)
q=s.y
q===$&&A.d()
q.it()
q=s.c
q.toString
A.a1(q,!1).ut(A.e_(new B.buc(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$H1,w)},
JB(d){return this.b5R(d)},
b5Q(){return this.JB(!1)},
b5R(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$JB=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.X(0)
r=s.w
if(r!=null)r.X(0)
r=s.y
r===$&&A.d()
r.it()
u=4
r=s.a
r.toString
q=$.K()
x=7
return A.e(q.LO(r.c,"refuse"),$async$JB)
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
if(r!=null)A.a1(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$JB,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jD(C.t,s,A.c(B.caK(r.d),s,s,s,s,D.aCd,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aC_,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.W(D.rD,x,s),C.k,A.c(q,s,s,s,s,D.wl,s,s,s),D.ayZ],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bui(t)
v=A.b("Accepter")
u=t.f?s:t.gaHV()
q.push(A.P(A.a([new B.YG(D.Bd,C.aG,r,x,s),D.ayM,new B.YG(C.nD,C.d0,v,u,s)],w),C.n,C.by,C.i,s))}if(t.d)q.push(C.yH)
return A.dR(s,C.o,A.fp(!0,A.cx(A.H(q,C.n,C.f,C.O),s,s),!0,C.a_,!0,!0),s,s,s)}}
B.YG.prototype={
D(d){var x=this,w=null,v=A.dk(x.d,w,w,C.a_,C.cJ,w)
return A.H(A.a([A.ab(A.aT(!1,A.c1(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e7,w,w,w)],y.p),C.n,C.f,C.O)}}
B.qD.prototype={
O(){return new B.a_e(A.b7(y.N),C.R)}}
B.a_e.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.W()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b2o(B.cpc(),B.cpc())
o.d!==$&&A.aL()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8s(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aL()
o.e=v
o.fr=!0
u=new B.acm()
o.dy!==$&&A.aL()
o.dy=u
t=w.x
if(t!=null){s=$.kb()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kb()
s=o.r
r=w.e
p=w.d
t.biu(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.TB()
return}if(x.f)u.ue("assets/audio/tonalite-appel.wav")
o.t6()},
m(){var x=this,w=x.CW
if(w!=null)w.X(0)
w=x.cx
if(w!=null)w.X(0)
w=x.cy
if(w!=null)w.X(0)
w=x.db
if(w!=null)w.X(0)
w=x.dx
if(w!=null)w.X(0)
w=x.dy
w===$&&A.d()
w.it()
if(x.fr)w.hr()
w=$.kb()
if(!(w.r&&w.a===x.r&&!x.y)){B.c7Q()
w=x.d
w===$&&A.d()
w.hr()
w=x.e
w===$&&A.d()
w.Ls()}x.a2()},
TB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$TB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.K()
s.w=o.gwZ()
o=$.kb()
s.Q=o.x
s.as=o.y
s.x=o.e
o=o.f
s.ay=o
if(o!=null){o=Date.now()
n=s.ay
n.toString
s.ch=new A.at(o,0,!1).ev(n)}B.cuB(s.r)
u=4
s.a.toString
o=$.K()
x=7
return A.e(o.bZ("/messagerie/appels/"+s.r+"/signaux"),$async$TB)
case 7:r=e
for(o=J.ap(r),n=s.f;o.B();){q=o.gJ(o)
p=B.cg_(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mF(A.b("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
l=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.d()
n.f=new B.btW(s)
n.r=new B.btX(s)
n.w=new B.btY(s)
s.z=!0
if(o)s.k(new B.btZ())
s.cy=A.hc(C.cd,new B.bu_(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.cs(n,A.x(n).i("cs<1>")).d4(s.gaoz())
o=o.w
s.dx=new A.cs(o,A.x(o).i("cs<1>")).d4(new B.bu0())
s.CW=A.hc(C.fb,new B.bu1(s))
s.yp()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$TB,w)},
t6(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$t6=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:s.cx=A.dl(C.c8,new B.btE(s))
r="appel"
u=4
q=null
i=s.a
h=i.z
x=h!=null?7:9
break
case 7:x=10
return A.e(h,$async$t6)
case 10:q=a0
i=s.r=B.a73(q).a
x=8
break
case 9:h=$.K()
x=11
return A.e(h.EA(i.c),$async$t6)
case 11:q=a0
i=s.r=s.a.c
case 8:h=$.kb()
h.bid(i)
B.cuB(s.r)
if(s.a.f)h.W2()
p=B.a73(q)
if(s.c==null){x=1
break}i=p.w
if(i==="termine"||i==="expire"){s.mF(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
i=$.K()
s.w=i.gwZ()
r="ice"
s.a.toString
i=$.K()
o=i.WF()
n=s.Jk()
x=12
return A.e(o,$async$t6)
case 12:m=a0
l=B.cE_(m)
x=15
return A.e(n,$async$t6)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.k(new B.btF(s))
x=16
return A.e(A.jI(C.nb,null,y.z),$async$t6)
case 16:if(s.c==null){x=1
break}s.mF(null)
x=1
break
case 14:r="webrtc"
i=s.d
i===$&&A.d()
g=s.a.d
x=17
return A.e(i.Ay(A.a4(["iceServers",l.a],y.N,y.z),g==="video"),$async$t6)
case 17:i.f=new B.btG(s)
i.r=new B.btH(s)
i.w=new B.btI(s)
if(s.c==null){x=1
break}s.k(new B.btJ(s))
h.bos()
s.cy=A.hc(C.cd,new B.btK(s))
i=s.e
i===$&&A.d()
h=i.r
s.db=new A.cs(h,A.x(h).i("cs<1>")).d4(s.gaoz())
h=i.w
s.dx=new A.cs(h,A.x(h).i("cs<1>")).d4(new B.btL())
s.a.toString
h=$.K()
k=h.b
if(k!=null&&J.a7(k)!==0){s.a.toString
$.K()
i.Vx(C.d.jC("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",k)}s.CW=A.hc(C.fb,new B.btM(s))
s.yp()
u=2
x=6
break
case 4:u=3
e=t
j=A.M(e)
if(s.c==null){x=1
break}A.oJ().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.cdH(A.u(j)))
i=s.c
i.toString
h=j instanceof A.cZ?j.a:s.b_W(r)
i.q(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(h,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mF(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$t6,w)},
b_W(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Jk(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Jk=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a0F(),$async$Jk)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Fm(s.a.d==="video"),$async$Jk)
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
return A.j($async$Jk,w)},
a0F(){var x=0,w=A.k(y.y),v
var $async$a0F=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0F,w)},
yp(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$yp=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.K()
x=7
return A.e(p.bZ("/messagerie/appels/"+s.r+"/signaux"),$async$yp)
case 7:r=e
for(p=J.ap(r);p.B();){q=p.gJ(p)
s.aoA(B.cg_(q))}u=2
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
return A.j($async$yp,w)},
aoA(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.u(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cvr(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.E4(A.a4(["sdp",v.a,"type",v.b],y.N,y.z)).aM(new B.bu3(s),y.a).fK(new B.bu4(s))
break
case"reponse":if(!s.a.f)return
u=B.cvr(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.V4(A.a4(["sdp",u.a,"type",u.b],y.N,y.z)).aM(new B.bu5(s),y.a).fK(new B.bu6(s))
break
case"candidat_ice":t=B.cUr(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.UZ(A.a4(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lj().aM(new B.bu7(s),y.a).fK(new B.bu8(s))
break
case"refuse":s.mF(A.b("Appel refus\xe9"))
break
case"annule":s.mF(A.b("Appel annul\xe9"))
break
case"termine":s.mF(A.b("Appel termin\xe9"))
break}},
T8(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$T8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.X(0)
t=u.dy
t===$&&A.d()
t.it()
u.k(new B.btR(u,!1))
t=$.kb()
t.bqj()
s=u.Q
t.a9a(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$T8,w)},
yf(d,e,f){return this.aR1(d,e,f)},
ahj(d,e){return this.yf(d,e,!0)},
aR1(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$yf=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.K()
x=6
return A.e(s.asF(t.r,e,d),$async$yf)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yf,w)},
Jw(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jw=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.X(0)
r=s.dy
r===$&&A.d()
r.it()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.K()
x=9
return A.e(q.LO(r,"termine"),$async$Jw)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c7Q()
$.kb().NQ()
r=s.c
if(r!=null)A.a1(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jw,w)},
alY(){var x=this
if(!x.x||x.y)return
$.kb().brC()
x.k(new B.btS(x))
$.aP.aD$.push(new B.btT(x))},
mF(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.X(0)
x=v.dy
x===$&&A.d()
x.it()
x=v.r
if(x.length!==0){v.a.toString
w=$.K()
w.LO(x,"termine").fK(new B.bu2())}if(d!=null&&v.c!=null)v.c.q(y.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.c7Q()
$.kb().NQ()
x=v.c
if(x!=null)A.a1(x,!1).bO()},
Q7(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_v(u),$async$Q7)
case 2:if(v.c!=null)v.k(new B.btB(v,u))
$.kb().a9a(v.as,u)
return A.i(null,w)}})
return A.j($async$Q7,w)},
Q6(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q6=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.GC(u),$async$Q6)
case 2:if(v.c!=null)v.k(new B.btA(v,u))
$.kb().a9a(u,v.Q)
return A.i(null,w)}})
return A.j($async$Q6,w)},
Q3(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q3=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_s(u),$async$Q3)
case 2:if(v.c!=null)v.k(new B.btz(v,u))
return A.i(null,w)}})
return A.j($async$Q3,w)},
Q4(){var x=0,w=A.k(y.H),v=this,u
var $async$Q4=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Vb(),$async$Q4)
case 2:return A.i(null,w)}})
return A.j($async$Q4,w)},
anK(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ae(w.ch.a,1e6)
return u+" "+(C.d.aV(C.c.l(C.c.ae(x,60)),2,"0")+":"+C.d.aV(C.c.l(C.c.a_(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
bdb(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.q(y.q).f.v(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.l,w,w,w,w,w,w,w,w,w))},
b2C(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.bQ(!1,v,v,v,!0,v,v,!0,!1,D.a69,v,v,v,new B.btO(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.e7,v,v,v),v,v))
if(w.x)u.push(A.bQ(!1,v,v,v,!0,v,v,!0,!1,D.a5T,v,v,v,new B.btP(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.e7,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.j5(D.zj,new B.btQ(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.cfP(o.e,!1,D.Oy)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cx(A.H(A.a([new B.Nt(x,v,u,56,p),C.q,B.ctl(x,22),C.k,A.c(q.anK(),p,p,p,p,D.wl,p,p,p)],y.p),C.n,C.f,C.O),p,p)}o=A.a([A.E3(0,x),A.f2(p,A.eR(A.N(12),B.cfP(o.d,!0,D.Oy),C.aq),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f2(p,new B.YH(q.galX(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f2(24,B.crl(q.ax,!0,v,x,q.gaep(),q.gaeq(),q.gaer(),q.gal1(),q.galC(),q.gapE(),!0),p,p,0,0,p,p))
o=A.e1(C.aP,o,C.h,C.aH,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f2(p,A.r_(B.cfP(o.e,!1,D.v5),0),1,p,0,p,0,1))
if(q.x)v.push(A.f2(p,new B.YH(q.galX(),p),p,p,16,p,16,p))
o=B.ctl(q.a.e,24)
u=A.c(q.anK(),p,p,p,p,D.wl,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.a8(A.cx(new B.Nt(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.H(A.a([C.q,o,C.k,new A.W(D.rD,u,p),t,B.crl(q.ax,!1,r,s,q.gaep(),q.gaeq(),q.gaer(),q.gal1(),q.galC(),q.gapE(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e1(C.aP,v,C.h,C.aH,p)
o=v}return A.cfz(w,A.dR(p,C.o,A.fp(!0,o,!0,C.a_,!0,!0),p,p,p),new B.bu9(q),y.K)}}
B.ak3.prototype={
D(d){var x,w,v=this,u=null,t=A.N(28),s=A.a8(new B.zL(D.a3W,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.Bn:D.a3V,q=A.b("Appel vid\xe9o")
r=A.a8(new B.zL(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a3R:D.a3Q
w=y.p
q=A.P(A.a([s,r,A.a8(new B.zL(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.S(u,A.H(A.a([q,C.q,A.P(A.a([A.a8(new B.zL(C.Bk,!1,x,v.r?v.Q:u,u,u),1,u),A.a8(new B.zL(D.Bd,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a2J],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.O),C.j,u,u,new A.a3(D.zj,u,u,t,u,u,C.u),u,u,u,C.As,D.a2x,u,u,u)}}
B.YH.prototype={
D(d){var x=null
return A.H(A.a([A.ab(A.aT(!1,D.a5S,C.j,x,C.p,x,x,x,x,this.c,x,A.dk(C.kK,x,x,C.a_,C.cJ,x)),48,48),C.I,A.c(A.b("R\xe9duire"),x,x,x,x,C.QU,x,x,x)],y.p),C.n,C.f,C.O)}}
B.zL.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kK
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dk(s,t,t,C.a_,C.cJ,t)
return A.r_(A.H(A.a([A.ab(A.aT(!1,A.c1(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.k,A.c(u.e,t,t,t,t,C.wn,C.X,t,t)],y.p),C.n,C.f,C.O),w)}}
B.Nt.prototype={
O(){return new B.aoF(null,null)}}
B.aoF.prototype={
S(){var x,w=this
w.W()
x=A.cq(null,A.cT(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.aa3(0,!0)
w.d!==$&&A.aL()
w.d=x},
aU(d){var x,w
this.bf(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.cT(0,0,x?1100:2400,0,0)
w.aa3(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aFH()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.jD(v,x,v,v,t):A.jD(C.t,v,A.c(B.caK(u.c),v,v,v,v,A.be(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ab(A.i5(q,new B.bQ5(w,s),u),r,r)}}
B.a5r.prototype={
m(){var x=this,w=x.bS$
if(w!=null)w.T(0,x.ghL())
x.bS$=null
x.a2()},
ce(){this.da()
this.d_()
this.hM()}}
B.b2o.prototype={
Fm(d){return this.bq8(d)},
bq8(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jS(0),$async$Fm)
case 3:$.cj2()
s=y.N
r=A.a4(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aSS().Gp(0,A.a4(["audio",r,"video",d&&A.a4(["facingMode","user"],s,s)],s,y.z)),$async$Fm)
case 4:q=f
u.b=q
t.saci(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fm,w)},
Ay(d,e){return this.bqU(d,e)},
bqU(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$Ay=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jS(0),$async$Ay)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fm(e),$async$Ay)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cj2().a77(d,A.C(y.N,y.z)),$async$Ay)
case 6:t=v.a=g
s=u.abu(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a5X(0,s[q],u),$async$Ay)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b2p(v)
t.Q=new B.b2q(v)
t.d=new B.b2r(v)
return A.i(null,w)}})
return A.j($async$Ay,w)},
aOU(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.saci(0,d)
w.Hi()
x=w.r
if(x!=null)x.$0()}},
Hi(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Hi=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.Ou(0)
if(m==null)m=C.dm
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aUU(n,s),$async$Hi)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.M(l)
A.oJ().$1("Appel : volume distant impossible : "+A.cdH(A.u(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.R)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Hi,w)},
Lj(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Lj=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.VM(0),$async$Lj)
case 3:t=e
x=4
return A.e(s.GD(0,t),$async$Lj)
case 4:v=A.a4(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Lj,w)},
E4(d){return this.bhD(d)},
bhD(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$E4=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.GF(0,new B.Ea(d.h(0,"sdp"),d.h(0,"type"))),$async$E4)
case 3:x=4
return A.e(s.VJ(0),$async$E4)
case 4:t=f
x=5
return A.e(s.GD(0,t),$async$E4)
case 5:v=A.a4(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$E4,w)},
V4(d){return this.bet(d)},
bet(d){var x=0,w=A.k(y.H),v=this,u
var $async$V4=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.GF(0,new B.Ea(d.h(0,"sdp"),d.h(0,"type"))),$async$V4)
case 2:return A.i(null,w)}})
return A.j($async$V4,w)},
UZ(d){return this.bee(d)},
bee(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$UZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.UM(new B.Kk(A.az(d.h(0,"candidate")),A.az(d.h(0,"sdpMid")),A.eM(d.h(0,"sdpMLineIndex")))),$async$UZ)
case 3:case 1:return A.i(v,w)}})
return A.j($async$UZ,w)},
a_v(d){return this.aA1(d)},
aA1(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$a_v=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ou(0)
if(r==null)r=C.dm
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slV(0,t)
return A.i(null,w)}})
return A.j($async$a_v,w)},
GC(d){return this.azS(d)},
azS(d){var x=0,w=A.k(y.H),v=this
var $async$GC=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.ada(d),$async$GC)
case 2:x=3
return A.e(v.Hi(),$async$GC)
case 3:return A.i(null,w)}})
return A.j($async$GC,w)},
a_s(d){return this.azI(d)},
azI(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$a_s=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.OH(0)
if(s==null)s=C.dm
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slV(0,d)
return A.i(null,w)}})
return A.j($async$a_s,w)},
Vb(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Vb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.OH(0)
if(s==null)s=D.al5
if(s.length===0){x=1
break}x=3
return A.e(B.ceL(C.b.gU(s)),$async$Vb)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Vb,w)},
hr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hr=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.ada(!1),$async$hr)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:u=9
p=s.a
p=p==null?null:p.aa(0)
x=12
return A.e(y.x.b(p)?p:A.dU(p,y.H),$async$hr)
case 12:u=2
x=11
break
case 9:u=8
h=t
x=11
break
case 8:x=2
break
case 11:s.a=null
p=s.b
p=p==null?null:p.abu(0)
if(p==null)p=C.dm
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cCD(r)
if(!m.b(k)){j=new A.aC($.aM,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hr)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:case 14:p.length===o||(0,A.R)(p),++l
x=13
break
case 15:s.b=null
u=22
x=25
return A.e(s.d.m(),$async$hr)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:u=27
x=30
return A.e(s.e.m(),$async$hr)
case 30:u=2
x=29
break
case 27:u=26
e=t
x=29
break
case 26:x=2
break
case 29:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$hr,w)}}
B.a8s.prototype={
gbfW(){return this.b!=null&&!this.e},
Vx(d,e){return this.bfX(d,e)},
bfX(d,e){var x=0,w=A.k(y.H),v=this
var $async$Vx=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.e(v.Hg(),$async$Vx)
case 2:return A.i(null,w)}})
return A.j($async$Vx,w)},
Hg(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Hg=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a7(r)===0){x=1
break}u=4
q=B.cCJ(B.cdF(A.cH(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Hg)
case 7:s.f=0
p=s.y
if(p!=null&&J.a7(p)!==0)try{o=y.N
q.gkL().a.E(0,C.Z.dC(A.a4(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.d()
o=o.b
o===$&&A.d()
s.c=new A.cY(o,A.x(o).i("cY<1>")).b7(s.gb5x(),!0,s.gb3Z(),new B.aDk(s))
u=2
x=6
break
case 4:u=3
m=t
s.a3T()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Hg,w)},
b5y(d){var x,w,v,u
try{x=C.Z.cK(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.r(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.cg_(w))}catch(u){}},
a3T(){var x,w=this,v=w.c
if(v!=null)v.X(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.afz[v]
w.f=v+1
v=w.d
if(v!=null)v.X(0)
w.d=A.dl(A.cT(0,0,0,0,x),new B.aDl(w))},
Ls(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$Ls=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.X(0)
s=t.c
s=s==null?null:s.X(0)
x=2
return A.e(y.x.b(s)?s:A.dU(s,y.H),$async$Ls)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.gkL().aa(0)
x=7
return A.e(y._.b(s)?s:A.dU(s,y.z),$async$Ls)
case 7:v=1
x=6
break
case 4:v=3
q=u
x=6
break
case 3:x=1
break
case 6:t.b=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Ls,w)}}
B.acm.prototype={
ue(d){return this.bnF(d)},
bnF(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$ue=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.AZ():r).b1(0),$async$ue)
case 6:x=7
return A.e(t.a.a_r(d),$async$ue)
case 7:x=8
return A.e(t.a.jj(C.Jw),$async$ue)
case 8:x=9
return A.e(t.a.im(1),$async$ue)
case 9:x=10
return A.e(t.a.cV(0),$async$ue)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.M(p)
A.oJ().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$ue,w)},
it(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$it=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.b1(0)
x=6
return A.e(y.x.b(s)?s:A.dU(s,y.H),$async$it)
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
return A.j($async$it,w)},
hr(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hr=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.e(y.x.b(s)?s:A.dU(s,y.H),$async$hr)
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
return A.j($async$hr,w)}}
B.aY8.prototype={
a77(d,e){return this.bhs(d,e)},
bhs(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a77=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a4(["mandatory",A.C(r,r),"optional",A.a([A.a4(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fP(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.cc(t)))
t=J.l(s)
v=B.cJZ(C.ci.gkr().bj(new A.eF(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a77,w)}}
B.ua.prototype={
Ou(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dJ(w,A.Z(w).i("dJ<1,aG>"))
J.ht(w,new B.aT7(x))
return x},
OH(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dJ(w,A.Z(w).i("dJ<1,aG>"))
J.ht(w,new B.aT8(x))
return x},
abu(d){var x=A.G(this.Ou(0),!0,y.G)
C.b.t(x,this.OH(0))
return x}}
B.acQ.prototype={
aH2(d){var x=this,w=x.d
w.addEventListener("ended",A.c6(new B.aT4(x)))
w.addEventListener("mute",A.c6(new B.aT5(x)))
w.addEventListener("unmute",A.c6(new B.aT6(x)))},
slV(d,e){this.d.enabled=e},
V5(d,e){return this.bew(0,e)},
bew(d,e){var x=0,w=A.k(y.H),v=this
var $async$V5=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.er(v.d.applyConstraints(y.m.a(A.cc(e))),y.X),$async$V5)
case 2:return A.i(null,w)}})
return A.j($async$V5,w)},
b1(d){var x=0,w=A.k(y.H),v=this
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$b1,w)}}
B.aSS.prototype={
Gp(d,e){return this.ayQ(0,e)},
ayQ(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gp=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cWV())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.iI(e.h(0,"video"),"facingMode")
e.cQ(0,"video",new B.aSU())
e.cQ(0,"audio",new B.aSV())}catch(a0){A.rY("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.h8(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.ht(s,new B.aSW(r))
J.iI(e.h(0,"audio"),"optional")
J.jx(e.h(0,"audio"),r)}}catch(a0){q=A.M(a0)
p=A.bx(a0)
A.rY("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.cc(e)
x=10
return A.e(A.er(o.getUserMedia(h.a(n)),h),$async$Gp)
case 10:m=a2
v=new B.ua(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.er(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Gp)
case 11:l=a2
v=new B.ua(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.M(f)
i=J.l(k)
throw A.p("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gp,w)}}
B.aeG.prototype={
aHb(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.c6(new B.aYa(x)))
w.addEventListener("icecandidate",A.c6(new B.aYb(x)))
w.addEventListener("iceconnectionstatechange",A.c6(new B.aYc(x)))
w.onicegatheringstatechange=A.c6(new B.aYd(x))
w.addEventListener("signalingstatechange",A.c6(new B.aYe(x)))
if(!$.ciO())w.addEventListener("connectionstatechange",A.c6(new B.aYf(x)))
w.addEventListener("negotiationneeded",A.c6(new B.aYg(x)))
w.addEventListener("track",A.c6(new B.aYh(x)))},
VM(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.er(s.createOffer(y.m.a(A.cc(A.C(y.N,y.z)))),y.A),$async$VM)
case 3:t=f
v=new B.Ea(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VM,w)},
VJ(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.er(s.createAnswer(y.m.a(A.cc(A.C(y.N,y.z)))),y.A),$async$VJ)
case 3:t=f
v=new B.Ea(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VJ,w)},
GD(d,e){return this.azW(0,e)},
azW(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GD=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.er(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$GD)
case 2:return A.i(null,w)}})
return A.j($async$GD,w)},
GF(d,e){return this.aAb(0,e)},
aAb(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.er(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$GF)
case 2:return A.i(null,w)}})
return A.j($async$GF,w)},
UM(d){return this.bdT(d)},
bdT(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$UM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.er(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$UM)
case 2:return A.i(null,w)}})
return A.j($async$UM,w)},
aa(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$aa=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.dd(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aa,w)},
a5X(d,e,f){return this.be7(0,e,f)},
be7(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a5X=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.aeH()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5X,w)}}
B.aeH.prototype={}
B.cfO.prototype={
b1(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.M(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.p("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$b1,w)}}
B.UL.prototype={
sav0(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.M7()
if(x!=null)x.style.objectFit=e},
aoI(){var x=this,w=x.M7(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sn(0,v.arH(u,x.z!=null,0,t))},
saci(d,e){var x,w,v,u,t=this
t.z=e
if(e.OH(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ap(y.l.b(x)?x:new A.dJ(x,A.Z(x).i("dJ<1,aG>")))
for(;x.B();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.Ou(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ap(y.l.b(x)?x:new A.dJ(x,A.Z(x).i("dJ<1,aG>")))
for(;x.B();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aQP()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.M7()
if(u!=null){u.srcObject=t.x
x=t.M7()
x.toString
t.aeb(x)}t.sn(0,t.a.bgl(t.z!=null))},
aQP(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
M7(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)t[r].X(0)
q=u.M7()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eY()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jS(d){var x=0,w=A.k(y.H),v=this
var $async$jS=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.OK()
$.t_().xe("RTCVideoRenderer-"+v.Q,new B.aYn(v),!0)
return A.i(null,w)}})
return A.j($async$jS,w)},
aeb(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UN.prototype={
O(){return new B.UO()}}
B.UO.prototype={
S(){var x,w,v=this
v.W()
v.a.c.aj(0,v.gb1I())
x=v.a
w=x.c
w.as=x.e
w.sav0(0,x.d===D.v5?"contain":"cover")},
b1J(){if(this.c!=null)this.k(new B.aYo())},
m(){if(this.c!=null)this.a2()},
aU(d){var x,w
this.bf(d)
A.dl(A.cT(0,0,10,0,0),new B.aYq(this))
x=this.a
w=x.c
w.sav0(0,x.d===D.v5?"contain":"cover")},
D(d){return new A.iR(new B.aYp(this),null)}}
B.aaZ.prototype={
aGK(d,e,f,g){var x=this,w=$.aM
x.a!==$&&A.aL()
x.a=new B.a08(d,x,new A.bg(new A.aC(w,y.c),y.r),e,g.i("a08<0>"))
if(f.a.gjc())f.a=new B.Wq(g.i("@<0>").cc(g).i("Wq<1,2>")).hN(f.a)
w=A.hb(null,new B.aLP(f,x),null,!0,g)
x.b!==$&&A.aL()
x.b=w},
akS(){var x,w
this.d=!0
x=this.c
if(x!=null)x.X(0)
w=this.b
w===$&&A.d()
w.aa(0)}}
B.a08.prototype={
E(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dA(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.aTL(d,e)},
i8(d){return this.dA(d,null)},
aTL(d,e){var x=this
if(x.w){x.a.a.dA(d,e)
return}x.c.hl(d,e)
x.akT()
x.b.akS()
x.a.a.aa(0).fK(new B.bzs())},
aa(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.akS()
x.c.cI(0,x.a.a.aa(0))}return x.c.a},
akT(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dW(0)
return},
$ie5:1}
B.ah3.prototype={}
B.ah4.prototype={}
B.B4.prototype={
afI(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Hk(d,e))
x.aa(0)},
abM(d){var x
if((this.b.b&4)!==0)throw A.p(B.cgt())
x=A.cc(d)
x.toString
this.a.send(x)},
zf(d,e,f){return this.bfD(0,e,f)},
bfD(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$zf=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.p(B.cgt())
u.aa(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$zf,w)},
$icgs:1}
B.v3.prototype={}
B.LE.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.LE&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.GU.prototype={
p(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.GU&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gI(d){return A.hB(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Hk.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.Hk&&e.a===this.a&&e.b===this.b},
gI(d){return A.hB([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Me.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibR:1}
B.Md.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.axq.prototype={
gkL(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.d()
x=x.a
x===$&&A.d()
v!==$&&A.b3()
v=w.w=new B.atU(w,x)}return v},
aGs(d){d.ft(new B.axu(this),new B.axv(this),y.a)}}
B.atU.prototype={
aa(d){var x=this.b
x.e=x.d=null
return this.aBS(0)}}
B.ain.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibR:1}
B.yN.prototype={
P(){return"RTCSignalingState."+this.b}}
B.UH.prototype={
P(){return"RTCIceGatheringState."+this.b}}
B.yM.prototype={
P(){return"RTCPeerConnectionState."+this.b}}
B.o8.prototype={
P(){return"RTCIceConnectionState."+this.b}}
B.aeI.prototype={
P(){return"RTCVideoViewObjectFit."+this.b}}
B.aY7.prototype={}
B.Tc.prototype={}
B.Ju.prototype={
l(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aSR.prototype={}
B.Kk.prototype={}
B.UI.prototype={}
B.UJ.prototype={}
B.aYi.prototype={}
B.Ea.prototype={}
B.UK.prototype={}
B.UM.prototype={
arH(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.UM(x,w,v)},
bgl(d){return this.arH(null,d,null,null)},
l(d){var x=this
return A.ad(x).l(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Ld)","bB(Kk)","bB(UK)","bB(o8)","~(@)","ua(@)","bB(cgs)","~(v3)"])
B.b30.prototype={
$0(){return J.cBY(this.a.bm())},
$S:1}
B.b31.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.M(v)
if(y.i.b(u)){x=u
w=A.bx(v)
this.b.dA(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c9I.prototype={
$1(d){var x,w,v,u=$.K().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.dC(A.a4(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:28}
B.c9H.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azF.prototype={
$1(d){if(d==null)return null
return A.bT(J.l(d))},
$S:112}
B.buj.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.JB(!0)},
$S:0}
B.buk.prototype={
$1(d){return this.a.UA()},
$S:27}
B.bug.prototype={
$0(){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:0}
B.buh.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bud.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bue.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buf.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bua.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bub.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buc.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.cek(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1199}
B.bui.prototype={
$0(){return this.a.b5Q()},
$S:0}
B.btW.prototype={
$1(d){this.a.yf("candidat_ice",d,!1)},
$S:212}
B.btX.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.btV(x))},
$S:0}
B.btV.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.btY.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.btZ.prototype={
$0(){},
$S:0}
B.bu_.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.btU(x,w))},
$S:27}
B.btU.prototype={
$0(){return this.a.ch=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.bu0.prototype={
$1(d){},
$S:132}
B.bu1.prototype={
$1(d){this.a.yp()},
$S:27}
B.btE.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.yf("annule",C.bn,!1)
x.mF(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.btF.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.btG.prototype={
$1(d){this.a.yf("candidat_ice",d,!1)},
$S:212}
B.btH.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.btD(x))},
$S:0}
B.btD.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.btI.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.btJ.prototype={
$0(){return this.a.z=!0},
$S:0}
B.btK.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.btC(x,w))},
$S:27}
B.btC.prototype={
$0(){return this.a.ch=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.btL.prototype={
$1(d){},
$S:132}
B.btM.prototype={
$1(d){this.a.yp()},
$S:27}
B.bu3.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.T8()
x.ahj("reponse",d)},
$S:270}
B.bu4.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bu5.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.T8()},
$S:32}
B.bu6.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bu7.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.ahj("offre",d)},
$S:270}
B.bu8.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.btR.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.at(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.btS.prototype={
$0(){return this.a.go=!0},
$S:0}
B.btT.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:5}
B.bu2.prototype={
$1(d){return A.C(y.N,y.z)},
$S:102}
B.btB.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.btA.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.btz.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.btO.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).bO()
x.Q4()},
$S:0}
B.btP.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).Y3().aM(new B.btN(x),y.H)},
$S:0}
B.btN.prototype={
$1(d){return this.a.alY()},
$S:9}
B.btQ.prototype={
$1(d){return A.fp(!0,A.H(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:145}
B.bu9.prototype={
$2(d,e){if(!d)this.a.Jw()},
$S:1203}
B.bQ5.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cqG(A.S(u,u,C.j,u,u,new A.a3(u,u,A.bm(C.t.b3(t*(1-s)),3),u,u,u,C.aI),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.S(u,u,C.j,u,u,new A.a3(u,u,A.bm(C.t,2),u,u,u,C.aI),u,w,u,u,u,u,u,w)
e.toString
return A.e1(C.a6,A.a([s,w,e],y.p),C.h,C.aH,u)},
$S:1204}
B.b2p.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a4(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b2q.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aOU(w)},
$S:z+4}
B.b2r.prototype={
$1(d){var x
if(d===D.Op){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDk.prototype={
$1(d){return this.a.a3T()},
$S:21}
B.aDl.prototype={
$0(){var x=this.a
if(!x.e)x.Hg()},
$S:0}
B.caL.prototype={
$1(d){return d.length!==0},
$S:8}
B.aT7.prototype={
$1(d){return this.a.push(B.cf9(d))},
$S:21}
B.aT8.prototype={
$1(d){return this.a.push(B.cf9(d))},
$S:21}
B.aT4.prototype={
$1(d){},
$S:25}
B.aT5.prototype={
$1(d){},
$S:25}
B.aT6.prototype={
$1(d){},
$S:25}
B.aSU.prototype={
$0(){return!1},
$S:50}
B.aSV.prototype={
$0(){return!1},
$S:50}
B.aSW.prototype={
$1(d){J.ht(d,new B.aST(this.a))},
$S:212}
B.aST.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:52}
B.aYa.prototype={
$1(d){},
$S:25}
B.aYb.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Kk(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:25}
B.aYc.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cWt(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ciO())switch(w.cx.a){case 0:w.cy=D.Ou
break
case 1:w.cy=D.Ov
break
case 3:w.cy=D.Ow
break
case 5:w.cy=D.Os
break
case 6:w.cy=D.Ot
break
case 7:w.cy=D.v4
break
default:break}},
$S:45}
B.aYd.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cWu(w.iceGatheringState)},
$S:45}
B.aYe.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cYC(w.signalingState)},
$S:45}
B.aYf.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cXM(w.connectionState)},
$S:45}
B.aYg.prototype={
$1(d){},
$S:45}
B.aYh.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.cf9(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dJ(x,A.Z(x).i("dJ<1,aG>"))
w=J.dw(x,new B.aY9(w),y.h)
v.$1(new B.UK(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:25}
B.aY9.prototype={
$1(d){return new B.ua(d,this.a.as)},
$S:z+7}
B.caU.prototype={
$1(d){return J.hG(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYn.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.R)(w),++u)w[u].X(0)
C.b.a1(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.aeb(t)
v=y.k.c
w.push(A.iC(t,"canplay",new B.aYj(x),!1,v))
w.push(A.iC(t,"resize",new B.aYk(x),!1,v))
w.push(A.iC(t,"error",new B.aYl(t),!1,v))
w.push(A.iC(t,"ended",new B.aYm(),!1,v))
return t},
$S:173}
B.aYj.prototype={
$1(d){this.a.aoI()},
$S:21}
B.aYk.prototype={
$1(d){this.a.aoI()},
$S:21}
B.aYl.prototype={
$1(d){var x,w,v=this.a.error
A.rY("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.JC.h(0,A.aw(v,"code"))
x.toString
w=!J.r(A.aw(v,"message"),"")?A.aw(v,"message"):"No further diagnostic information can be determined or provided."
throw A.p(A.o2(x,C.JB.h(0,A.aw(v,"code")),w,null))},
$S:28}
B.aYm.prototype={
$1(d){},
$S:21}
B.aYo.prototype={
$0(){},
$S:0}
B.aYq.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aYp.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aMO("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cx(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1205}
B.aLP.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.gir(w),new B.aLO(v),w.gpE())},
$S:0}
B.aLO.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.akT()
x=x.b
x===$&&A.d()
x.aa(0)},
$S:0}
B.bzs.prototype={
$1(d){},
$S:17}
B.aBT.prototype={
$1(d){this.a.cI(0,this.b)},
$S:25}
B.aBU.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hO(new B.Me("Failed to connect WebSocket"))
else this.b.afI(1006,"error")},
$S:25}
B.aBV.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cI("data")
if(typeof x==="string")w.b=new B.LE(A.bq(x))
else if(typeof x==="object"&&A.cnJ(y.m.a(x),"ArrayBuffer"))w.b=new B.GU(A.TC(y.o.a(x),0,null))
else throw A.p(A.am("unexpected message type: "+J.aK(x).l(0)))
v.E(0,w.bm())},
$S:28}
B.aBW.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cI(0,this.b)
this.b.afI(d.code,d.reason)},
$S:25}
B.axu.prototype={
$1(d){var x=d.b,w=this.a
new A.cY(x,A.x(x).i("cY<1>")).d4(new B.axr(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cY(x,A.x(x).i("cY<1>")).bnV(new B.axs(d),new B.axt(w,d))
w.f.dW(0)},
$S:z+8}
B.axr.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.LE
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.GU
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Hk){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.aa(0)}}},
$S:z+9}
B.axs.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.aq(B.cgt())
s=A.cc(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.abM(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.abM(new Uint8Array(A.c2(u)))
break $label1$1}t=A.aV("Cannot send "+J.aK(d).l(0))
throw A.p(t)}}catch(r){if(!(A.M(r) instanceof B.Md))throw r}},
$S:18}
B.axt.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.zf(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.M(q) instanceof B.Md))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.axv.prototype={
$1(d){var x,w=d instanceof A.Xs?d:new B.ain(J.l(d)),v=this.a
v.f.hO(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i8(w)
v=v.a
v===$&&A.d()
v.aa(0)},
$S:45};(function aliases(){var x=B.HV.prototype
x.aBS=x.aa
x=B.a5r.prototype
x.aFH=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_f.prototype,"gaHV","H1",0)
var v
w(v=B.a_e.prototype,"gaoz","aoA",2)
x(v,"galC","Jw",0)
x(v,"galX","alY",1)
x(v,"gaer","Q7",0)
x(v,"gaeq","Q6",0)
x(v,"gaep","Q3",0)
x(v,"gapE","bdb",1)
x(v,"gal1","b2C",1)
w(v=B.a8s.prototype,"gb5x","b5y",6)
x(v,"gb3Z","a3T",1)
x(B.UL.prototype,"gec","m",0)
x(B.UO.prototype,"gb1I","b1J",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ak,[B.HV,B.azE,B.Ld,B.a8G,B.b2o,B.a8s,B.acm,B.aY7,B.Tc,B.Ju,B.aSR,B.UI,B.UJ,B.aYi,B.ah4,B.a08,B.ah3,B.B4,B.v3,B.Me,B.ain,B.Kk,B.Ea,B.UK,B.UM])
v(B.Wq,A.h1)
w(A.kg,[B.b30,B.c9H,B.buj,B.bug,B.buh,B.bud,B.bue,B.buf,B.bua,B.bub,B.bui,B.btX,B.btV,B.btY,B.btZ,B.btU,B.btE,B.btF,B.btH,B.btD,B.btI,B.btJ,B.btC,B.btR,B.btS,B.btB,B.btA,B.btz,B.btO,B.btP,B.aDl,B.aSU,B.aSV,B.aYo,B.aYq,B.aLP,B.aLO,B.axt])
w(A.jE,[B.b31,B.c9I,B.azF,B.buk,B.buc,B.btW,B.bu_,B.bu0,B.bu1,B.btG,B.btK,B.btL,B.btM,B.bu3,B.bu4,B.bu5,B.bu6,B.bu7,B.bu8,B.btT,B.bu2,B.btN,B.btQ,B.b2p,B.b2q,B.b2r,B.aDk,B.caL,B.aT7,B.aT8,B.aT4,B.aT5,B.aT6,B.aSW,B.aYa,B.aYb,B.aYc,B.aYd,B.aYe,B.aYf,B.aYg,B.aYh,B.aY9,B.caU,B.aYn,B.aYj,B.aYk,B.aYl,B.aYm,B.bzs,B.aBT,B.aBU,B.aBV,B.aBW,B.axu,B.axr,B.axs,B.axv])
w(A.T,[B.qE,B.qD,B.Nt,B.UN])
w(A.Y,[B.a_f,B.a_e,B.a5r,B.UO])
w(A.au,[B.YG,B.ak3,B.YH,B.zL])
w(A.tl,[B.bu9,B.bQ5,B.aST,B.aYp])
v(B.aoF,B.a5r)
v(B.aY8,B.aY7)
v(B.ua,B.Tc)
v(B.acQ,B.Ju)
v(B.aSS,B.aSR)
v(B.aeG,B.UI)
v(B.aeH,B.UJ)
v(B.cfO,B.aYi)
v(B.UL,A.du)
w(B.ah4,[B.aaZ,B.axq])
w(B.v3,[B.LE,B.GU,B.Hk])
v(B.Md,B.Me)
v(B.atU,B.HV)
w(A.MM,[B.yN,B.UH,B.yM,B.o8,B.aeI])
x(B.a5r,A.h0)})()
A.oB(b.typeUniverse,JSON.parse('{"HV":{"e5":["1"]},"Wq":{"h1":["1","2"],"h1.S":"1","h1.T":"2"},"Nt":{"T":[],"q":[]},"qE":{"T":[],"q":[]},"a_f":{"Y":["qE"]},"YG":{"au":[],"q":[]},"qD":{"T":[],"q":[]},"a_e":{"Y":["qD"]},"ak3":{"au":[],"q":[]},"YH":{"au":[],"q":[]},"zL":{"au":[],"q":[]},"aoF":{"Y":["Nt"]},"ua":{"Tc":[]},"acQ":{"Ju":[]},"aeG":{"UI":[]},"aeH":{"UJ":[]},"UL":{"du":["UM"],"b1":[]},"UN":{"T":[],"q":[]},"UO":{"Y":["UN"]},"a08":{"e5":["1"]},"B4":{"cgs":[]},"LE":{"v3":[]},"GU":{"v3":[]},"Hk":{"v3":[]},"Me":{"bR":[]},"Md":{"bR":[]},"atU":{"e5":["@"]},"ain":{"bR":[]}}'))
A.cs4(b.typeUniverse,JSON.parse('{"HV":1,"ah4":1}'))
var y=(function rtii(){var x=A.aB
return{b:x("B4"),L:x("bR"),_:x("av<@>"),x:x("av<~>"),S:x("I<ah<o,V>>"),t:x("I<ah<o,@>>"),Q:x("I<Ju>"),d:x("I<jl<@>>"),s:x("I<o>"),p:x("I<q>"),m:x("aG"),l:x("E<aG>"),F:x("E<ah<o,@>>"),j:x("E<@>"),I:x("E<v>"),P:x("ah<o,@>"),f:x("ah<@,@>"),E:x("Tc"),G:x("Ju"),h:x("ua"),o:x("qW"),a:x("bB"),K:x("ak"),J:x("UI"),e:x("UJ"),v:x("Ea"),Z:x("ah3<ak?>"),N:x("o"),i:x("ru"),M:x("eB"),D:x("v3"),U:x("X<o>"),g:x("dT<Ld>"),n:x("dT<~>"),V:x("bg<B4>"),r:x("bg<@>"),R:x("bg<~>"),k:x("a_p<aG>"),C:x("pW<aG>"),u:x("aC<B4>"),c:x("aC<@>"),W:x("aC<~>"),q:x("kG"),y:x("V"),z:x("@"),A:x("aG?"),X:x("ak?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zj=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.YU=new B.a8G(C.eQ)
D.rD=new A.aj(32,0,32,0)
D.a2x=new A.aj(8,20,8,20)
D.a2J=new A.cQ(1,C.ar,C.az0,null)
D.Bd=new A.ao(57639,"MaterialIcons",null,!1)
D.a3Q=new A.ao(58337,"MaterialIcons",null,!1)
D.a3R=new A.ao(58341,"MaterialIcons",null,!1)
D.Bn=new A.ao(59048,"MaterialIcons",null,!1)
D.a3V=new A.ao(59049,"MaterialIcons",null,!1)
D.a3W=new A.ao(59077,"MaterialIcons",null,!1)
D.Bi=new A.ao(58195,"MaterialIcons",null,!1)
D.a5T=new A.aa(D.Bi,null,C.m,null,null)
D.a5S=new A.aa(D.Bi,28,C.m,null,null)
D.a3U=new A.ao(58923,"MaterialIcons",null,!1)
D.a69=new A.aa(D.a3U,null,C.m,null,null)
D.afz=A.a(x([1,2,4,8,16]),A.aB("I<v>"))
D.al5=A.a(x([]),y.Q)
D.JS=new A.fR("FlutterWebRTC.Method",C.bh,null)
D.auN=new B.o8(0,"RTCIceConnectionStateNew")
D.auO=new B.o8(1,"RTCIceConnectionStateChecking")
D.auP=new B.o8(2,"RTCIceConnectionStateCompleted")
D.auQ=new B.o8(3,"RTCIceConnectionStateConnected")
D.auR=new B.o8(4,"RTCIceConnectionStateCount")
D.Op=new B.o8(5,"RTCIceConnectionStateFailed")
D.auS=new B.o8(6,"RTCIceConnectionStateDisconnected")
D.Oq=new B.o8(7,"RTCIceConnectionStateClosed")
D.Or=new B.UH(0,"RTCIceGatheringStateNew")
D.auT=new B.UH(1,"RTCIceGatheringStateGathering")
D.auU=new B.UH(2,"RTCIceGatheringStateComplete")
D.v4=new B.yM(0,"RTCPeerConnectionStateClosed")
D.Os=new B.yM(1,"RTCPeerConnectionStateFailed")
D.Ot=new B.yM(2,"RTCPeerConnectionStateDisconnected")
D.Ou=new B.yM(3,"RTCPeerConnectionStateNew")
D.Ov=new B.yM(4,"RTCPeerConnectionStateConnecting")
D.Ow=new B.yM(5,"RTCPeerConnectionStateConnected")
D.auV=new B.yN(0,"RTCSignalingStateStable")
D.auW=new B.yN(1,"RTCSignalingStateHaveLocalOffer")
D.auX=new B.yN(2,"RTCSignalingStateHaveRemoteOffer")
D.auY=new B.yN(3,"RTCSignalingStateHaveLocalPrAnswer")
D.auZ=new B.yN(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Ox=new B.yN(5,"RTCSignalingStateClosed")
D.av_=new B.UM(0,0,0)
D.v5=new B.aeI(0,"RTCVideoViewObjectFitContain")
D.Oy=new B.aeI(1,"RTCVideoViewObjectFitCover")
D.ayM=new A.ci(48,null,null,null)
D.ayZ=new A.ci(null,64,null,null)
D.aC_=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aCd=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wl=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chr=null
$.cr6=!1
$.cpd=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d3D","cj2",()=>new B.aY8())
x($,"d0d","ciO",()=>C.d.u(A.aw(A.aw(A.aw(A.cis(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"hweDSM6uolfusM3hUCuvrehY9tQ=");