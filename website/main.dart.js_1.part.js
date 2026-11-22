((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={HW:function HW(){},Wr:function Wr(d){this.$ti=d},b36:function b36(d){this.a=d},b37:function b37(d,e){this.a=d
this.b=e},
cuI(d){var x
B.c7W()
if(d.length===0)return
x=A.c6(new B.c9O(d))
self.window.addEventListener("beforeunload",x)
$.chx=new B.c9N(x)},
c7W(){var x=$.chx
if(x!=null)x.$0()
$.chx=null},
c9O:function c9O(d){this.a=d},
c9N:function c9N(d){this.a=d},
a76(d){var x,w,v,u,t=new B.azI(),s=J.Q(d),r=s.h(d,"id")
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
return new B.azH(r,x,w,v,u)},
cg5(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
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
return new B.Le(s,x,w,v)},
cE6(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.YU
x=A.a([],y.t)
for(r=J.ap(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mw(s,u,t))}return new B.a8J(x)},
cvy(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oI(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.apU(w,v)},
cUA(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.apX(u,A.hZ(w)?w:null,v)},
azH:function azH(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azI:function azI(){},
Le:function Le(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8J:function a8J(d){this.a=d},
cmF(d,e,f,g,h,i,j){return new B.qF(f,g,j,i,e,d,null)},
ceq(d,e,f,g,h,i,j,k,l,m){return new B.qE(f,m,h,l,i,d,j,k,e,g,null)},
crs(d,e,f,g,h,i,j,k,l,m,n){return new B.ak5(e,g,f,d,n,j,i,h,m,k,l,null)},
cts(d,e){var x=null
return new A.W(D.rD,A.c(d.toUpperCase(),2,C.a5,x,x,A.be(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
qF:function qF(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_h:function a_h(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bup:function bup(d){this.a=d},
buq:function buq(d){this.a=d},
bum:function bum(d){this.a=d},
bun:function bun(d){this.a=d},
buj:function buj(d){this.a=d},
buk:function buk(d){this.a=d},
bul:function bul(d){this.a=d},
bug:function bug(d){this.a=d},
buh:function buh(d){this.a=d},
bui:function bui(d){this.a=d},
buo:function buo(d){this.a=d},
YI:function YI(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qE:function qE(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_g:function a_g(d,e){var _=this
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
bu1:function bu1(d){this.a=d},
bu2:function bu2(d){this.a=d},
bu0:function bu0(d){this.a=d},
bu3:function bu3(d){this.a=d},
bu4:function bu4(){},
bu5:function bu5(d){this.a=d},
bu_:function bu_(d,e){this.a=d
this.b=e},
bu6:function bu6(){},
bu7:function bu7(d){this.a=d},
btK:function btK(d){this.a=d},
btL:function btL(d){this.a=d},
btM:function btM(d){this.a=d},
btN:function btN(d){this.a=d},
btJ:function btJ(d){this.a=d},
btO:function btO(d){this.a=d},
btP:function btP(d){this.a=d},
btQ:function btQ(d){this.a=d},
btI:function btI(d,e){this.a=d
this.b=e},
btR:function btR(){},
btS:function btS(d){this.a=d},
bu9:function bu9(d){this.a=d},
bua:function bua(d){this.a=d},
bub:function bub(d){this.a=d},
buc:function buc(d){this.a=d},
bud:function bud(d){this.a=d},
bue:function bue(d){this.a=d},
btX:function btX(d,e){this.a=d
this.b=e},
btY:function btY(d){this.a=d},
btZ:function btZ(d){this.a=d},
bu8:function bu8(){},
btH:function btH(d,e){this.a=d
this.b=e},
btG:function btG(d,e){this.a=d
this.b=e},
btF:function btF(d,e){this.a=d
this.b=e},
btU:function btU(d){this.a=d},
btV:function btV(d){this.a=d},
btT:function btT(d){this.a=d},
btW:function btW(d){this.a=d},
buf:function buf(d){this.a=d},
ak5:function ak5(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
YJ:function YJ(d,e){this.c=d
this.a=e},
zL:function zL(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Nu:function Nu(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
aoH:function aoH(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQb:function bQb(d,e){this.a=d
this.b=e},
a5t:function a5t(){},
b2u:function b2u(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b2v:function b2v(d){this.a=d},
b2w:function b2w(d){this.a=d},
b2x:function b2x(d){this.a=d},
a8v:function a8v(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aDn:function aDn(d){this.a=d},
aDo:function aDo(d){this.a=d},
caQ(d){var x=y.U,w=A.G(new A.X(A.a(d.split(" "),y.s),new B.caR(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaY(w),0)).toUpperCase()},
caR:function caR(){},
acp:function acp(){this.a=null},
aYe:function aYe(){},
ub:function ub(d,e){this.e=d
this.b=e},
aTc:function aTc(d){this.a=d},
aTd:function aTd(d){this.a=d},
cff(d){var x=new B.acT(d)
x.aH7(d)
return x},
acT:function acT(d){this.d=d},
aT9:function aT9(d){this.a=d},
aTa:function aTa(d){this.a=d},
aTb:function aTb(d){this.a=d},
aSX:function aSX(){},
aSZ:function aSZ(){},
aT_:function aT_(){},
aT0:function aT0(d){this.a=d},
aSY:function aSY(d){this.a=d},
cK6(d,e){var x=y.N
x=new B.aeJ(d,e,A.C(x,y.E),A.C(x,y.z))
x.aHg(d,e)
return x},
aeJ:function aeJ(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYg:function aYg(d){this.a=d},
aYh:function aYh(d){this.a=d},
aYi:function aYi(d){this.a=d},
aYj:function aYj(d){this.a=d},
aYk:function aYk(d){this.a=d},
aYl:function aYl(d){this.a=d},
aYm:function aYm(d){this.a=d},
aYn:function aYn(d){this.a=d},
aYf:function aYf(d){this.a=d},
aeK:function aeK(){},
cfU:function cfU(d){this.a=d},
cX3(){return C.b.nP(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.cb_())!==-1},
cb_:function cb_(){},
cpj(){var x=A.a([],y.d),w=$.cpk
$.cpk=w+1
return new B.UM(w,x,D.av_,$.ae())},
UM:function UM(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYt:function aYt(d){this.a=d},
aYp:function aYp(d){this.a=d},
aYq:function aYq(d){this.a=d},
aYr:function aYr(d){this.a=d},
aYs:function aYs(){},
cfV(d,e,f){return new B.UO(d,f,e,null)},
UO:function UO(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UP:function UP(){this.c=this.a=null},
aYu:function aYu(){},
aYw:function aYw(d){this.a=d},
aYv:function aYv(d){this.a=d},
cni(d,e,f,g){var x,w={}
w.a=d
x=new B.ab1(g.i("ab1<0>"))
x.aGP(e,f,w,g)
return x},
ab1:function ab1(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aLU:function aLU(d,e){this.a=d
this.b=e},
aLT:function aLT(d){this.a=d},
a0a:function a0a(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bzy:function bzy(){},
ah5:function ah5(d){this.b=this.a=$
this.$ti=d},
ah6:function ah6(){},
cdL(d,e){return B.cDj(d,e)},
cDj(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$cdL=A.f(function(f,g){if(f===1)return A.h(g,w)
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
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hO(new B.Mf("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pX(r,"open",!1,y.C).gU(0).aM(0,new B.aBW(p,q),y.H)
t=y.C
s=y.H
new A.pX(r,"error",!1,t).gU(0).aM(0,new B.aBX(p,q),s)
A.iC(r,"message",new B.aBY(q),!1,y.m)
new A.pX(r,"close",!1,t).gU(0).aM(0,new B.aBZ(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$cdL,w)},
B4:function B4(d,e){this.a=d
this.b=e},
aBW:function aBW(d,e){this.a=d
this.b=e},
aBX:function aBX(d,e){this.a=d
this.b=e},
aBY:function aBY(d){this.a=d},
aBZ:function aBZ(d,e){this.a=d
this.b=e},
cgz(){return new B.Me("Connection Closed")},
v4:function v4(){},
LF:function LF(d){this.a=d},
GU:function GU(d){this.a=d},
Hk:function Hk(d,e){this.a=d
this.b=e},
Mf:function Mf(d){this.a=d},
Me:function Me(d){this.a=d},
cCQ(d){var x=null,w=$.aM,v=new B.ah5(y.Z),u=y.X,t=A.hb(x,x,x,!0,u),s=A.hb(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.cni(new A.cY(s,r.i("cY<1>")),new A.G4(t,q.i("G4<1>")),!0,u)
v.b=B.cni(new A.cY(t,q.i("cY<1>")),new A.G4(s,r.i("G4<1>")),!1,u)
v=new B.axs(new A.bg(new A.aC(w,y.W),y.R),v)
v.aGx(d)
return v},
axs:function axs(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axw:function axw(d){this.a=d},
axt:function axt(d){this.a=d},
axu:function axu(d){this.a=d},
axv:function axv(d,e){this.a=d
this.b=e},
axx:function axx(d){this.a=d},
atW:function atW(d,e){this.b=d
this.a=e},
aip:function aip(d){this.a=d},
cWC(d){switch(d){case"new":return D.auN
case"checking":return D.auO
case"connected":return D.auQ
case"completed":return D.auP
case"failed":return D.Op
case"disconnected":return D.auS
case"closed":return D.Oq
case"count":return D.auR}return D.Oq},
cWD(d){switch(d){case"new":return D.Or
case"gathering":return D.auT
case"complete":return D.auU}return D.Or},
cYL(d){switch(d){case"stable":return D.auV
case"have-local-offer":return D.auW
case"have-local-pranswer":return D.auY
case"have-remote-offer":return D.auX
case"have-remote-pranswer":return D.auZ
case"closed":return D.Ox}return D.Ox},
cXV(d){switch(d){case"new":return D.Ou
case"connecting":return D.Ov
case"connected":return D.Ow
case"closed":return D.v4
case"disconnected":return D.Ot
case"failed":return D.Os}return D.v4},
yN:function yN(d,e){this.a=d
this.b=e},
UI:function UI(d,e){this.a=d
this.b=e},
yM:function yM(d,e){this.a=d
this.b=e},
o8:function o8(d,e){this.a=d
this.b=e},
aeL:function aeL(d,e){this.a=d
this.b=e},
aYd:function aYd(){},
Td:function Td(){},
Jv:function Jv(){},
aSW:function aSW(){},
Kl:function Kl(d,e,f){this.a=d
this.b=e
this.c=f},
UJ:function UJ(){},
UK:function UK(){},
aYo:function aYo(){},
Ea:function Ea(d,e){this.a=d
this.b=e},
UL:function UL(d){this.b=d},
UN:function UN(d,e,f){this.a=d
this.b=e
this.c=f},
ceR(d){var x=0,w=A.k(y.y)
var $async$ceR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.p("The is not a video track => "+d.l(0))
throw A.p("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$ceR,w)},
add(d){var x=0,w=A.k(y.H),v
var $async$add=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b83("enableSpeakerphone",A.a4(["enable",d],y.N,v),v,v),$async$add)
case 2:return A.i(null,w)}})
return A.j($async$add,w)},
aUZ(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aUZ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mw(y.f.a(A.c9u(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.V8(0,u),$async$aUZ)
case 5:case 4:v=A.dd(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUZ,w)},
b83(d,e,f,g){return B.cNI(d,e,f,g,f.i("0?"))},
cNI(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b83=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b82(),$async$b83)
case 3:v=D.JS.cm(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b83,w)},
b82(){var x=0,w=A.k(y.H),v,u
var $async$b82=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.crd?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.JS.cm("initialize",A.a4(["options",A.C(v,u)],v,u),!1,y.H),$async$b82)
case 4:$.crd=!0
case 3:return A.i(null,w)}})
return A.j($async$b82,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[27]
B.HW.prototype={
E(d,e){this.a.E(0,e)},
dB(d,e){this.a.dB(d,e)},
aa(d){return this.a.aa(0)},
$ie6:1}
B.Wr.prototype={
hN(d){var x=A.cE("subscription"),w=A.hb(new B.b36(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b37(this,w),w.gnG(w),w.gpE())
return new A.cY(w,A.x(w).i("cY<1>"))}}
B.azH.prototype={}
B.Le.prototype={}
B.a8J.prototype={}
B.qF.prototype={
O(){return new B.a_h()}}
B.a_h.prototype={
S(){var x,w,v=this
v.W()
x=v.a
x.toString
v.z=!0
w=new B.acp()
v.y!==$&&A.aL()
v.y=w
if(!x.y)w.ue(A.Bi(C.ld,$.vE().a).c)
v.Q_()
v.r=A.dl(C.c9,new B.bup(v))
v.w=A.hc(C.rr,new B.buq(v))},
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
a49(){var x=this.x
if(x!=null)x.X(0)
this.x=A.dl(C.fb,new B.bum(this))},
UD(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$UD=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.K()
x=7
return A.e(o.EB(p.c),$async$UD)
case 7:r=e
q=B.a76(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.k(new B.bun(s))
p=s.r
if(p!=null)p.X(0)
p=s.w
if(p!=null)p.X(0)
p=s.y
p===$&&A.d()
p.it()
s.a49()}u=2
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
return A.j($async$UD,w)},
Q_(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Q_=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.K()
x=7
return A.e(n.EB(o.c),$async$Q_)
case 7:r=e
q=B.a76(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null){o=$.K()
m=o.gwZ()}p=m
if(q.w!=="sonne"||q.c===p){s.k(new B.buj(s))
o=s.y
o===$&&A.d()
o.it()
s.a49()
x=1
break}s.k(new B.buk(s))
if(s.a.y)s.H3()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.k(new B.bul(s))
o=s.y
o===$&&A.d()
o.it()
s.a49()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Q_,w)},
H3(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$H3=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.k(new B.bug(s))
u=4
q=s.a
q.toString
p=$.K()
x=7
return A.e(p.LR(q.c,"accepte"),$async$H3)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.M(n)
if(s.c==null){x=1
break}s.k(new B.buh(s))
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
A.a1(q,!1).ut(A.e_(new B.bui(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$H3,w)},
JE(d){return this.b5Y(d)},
b5X(){return this.JE(!1)},
b5Y(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$JE=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.LR(r.c,"refuse"),$async$JE)
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
return A.j($async$JE,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jD(C.t,s,A.c(B.caQ(r.d),s,s,s,s,D.aCe,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aC0,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.W(D.rD,x,s),C.k,A.c(q,s,s,s,s,D.wl,s,s,s),D.ayZ],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.buo(t)
v=A.b("Accepter")
u=t.f?s:t.gaI_()
q.push(A.P(A.a([new B.YI(D.Bd,C.aG,r,x,s),D.ayM,new B.YI(C.nD,C.d1,v,u,s)],w),C.n,C.by,C.i,s))}if(t.d)q.push(C.yH)
return A.dR(s,C.o,A.fq(!0,A.cx(A.H(q,C.n,C.f,C.O),s,s),!0,C.a_,!0,!0),s,s,s)}}
B.YI.prototype={
D(d){var x=this,w=null,v=A.dk(x.d,w,w,C.a_,C.cK,w)
return A.H(A.a([A.ab(A.aT(!1,A.c2(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e7,w,w,w)],y.p),C.n,C.f,C.O)}}
B.qE.prototype={
O(){return new B.a_g(A.b7(y.N),C.R)}}
B.a_g.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.W()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b2u(B.cpj(),B.cpj())
o.d!==$&&A.aL()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8v(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aL()
o.e=v
o.fr=!0
u=new B.acp()
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
t.biB(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.TE()
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
if(!(w.r&&w.a===x.r&&!x.y)){B.c7W()
w=x.d
w===$&&A.d()
w.hr()
w=x.e
w===$&&A.d()
w.Lv()}x.a2()},
TE(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$TE=A.f(function(d,e){if(d===1){t=e
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
s.ch=new A.at(o,0,!1).ev(n)}B.cuI(s.r)
u=4
s.a.toString
o=$.K()
x=7
return A.e(o.bZ("/messagerie/appels/"+s.r+"/signaux"),$async$TE)
case 7:r=e
for(o=J.ap(r),n=s.f;o.B();){q=o.gJ(o)
p=B.cg5(q)
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
n.f=new B.bu1(s)
n.r=new B.bu2(s)
n.w=new B.bu3(s)
s.z=!0
if(o)s.k(new B.bu4())
s.cy=A.hc(C.ce,new B.bu5(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.cs(n,A.x(n).i("cs<1>")).d4(s.gaoE())
o=o.w
s.dx=new A.cs(o,A.x(o).i("cs<1>")).d4(new B.bu6())
s.CW=A.hc(C.fb,new B.bu7(s))
s.yq()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$TE,w)},
t6(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$t6=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:s.cx=A.dl(C.c9,new B.btK(s))
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
i=s.r=B.a76(q).a
x=8
break
case 9:h=$.K()
x=11
return A.e(h.EB(i.c),$async$t6)
case 11:q=a0
i=s.r=s.a.c
case 8:h=$.kb()
h.bil(i)
B.cuI(s.r)
if(s.a.f)h.W6()
p=B.a76(q)
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
o=i.WJ()
n=s.Jn()
x=12
return A.e(o,$async$t6)
case 12:m=a0
l=B.cE6(m)
x=15
return A.e(n,$async$t6)
case 15:x=!a0?13:14
break
case 13:if(s.c==null){x=1
break}s.k(new B.btL(s))
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
return A.e(i.Az(A.a4(["iceServers",l.a],y.N,y.z),g==="video"),$async$t6)
case 17:i.f=new B.btM(s)
i.r=new B.btN(s)
i.w=new B.btO(s)
if(s.c==null){x=1
break}s.k(new B.btP(s))
h.boz()
s.cy=A.hc(C.ce,new B.btQ(s))
i=s.e
i===$&&A.d()
h=i.r
s.db=new A.cs(h,A.x(h).i("cs<1>")).d4(s.gaoE())
h=i.w
s.dx=new A.cs(h,A.x(h).i("cs<1>")).d4(new B.btR())
s.a.toString
h=$.K()
k=h.b
if(k!=null&&J.a7(k)!==0){s.a.toString
$.K()
i.VA(C.d.jD("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",k)}s.CW=A.hc(C.fb,new B.btS(s))
s.yq()
u=2
x=6
break
case 4:u=3
e=t
j=A.M(e)
if(s.c==null){x=1
break}A.oJ().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.cdN(A.u(j)))
i=s.c
i.toString
h=j instanceof A.d_?j.a:s.b02(r)
i.q(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(h,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mF(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$t6,w)},
b02(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Jn(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Jn=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a0K(),$async$Jn)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Fn(s.a.d==="video"),$async$Jn)
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
return A.j($async$Jn,w)},
a0K(){var x=0,w=A.k(y.y),v
var $async$a0K=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0K,w)},
yq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$yq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.K()
x=7
return A.e(p.bZ("/messagerie/appels/"+s.r+"/signaux"),$async$yq)
case 7:r=e
for(p=J.ap(r);p.B();){q=p.gJ(p)
s.aoF(B.cg5(q))}u=2
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
return A.j($async$yq,w)},
aoF(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.u(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cvy(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.E5(A.a4(["sdp",v.a,"type",v.b],y.N,y.z)).aM(0,new B.bu9(s),y.a).fK(new B.bua(s))
break
case"reponse":if(!s.a.f)return
u=B.cvy(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.V7(A.a4(["sdp",u.a,"type",u.b],y.N,y.z)).aM(0,new B.bub(s),y.a).fK(new B.buc(s))
break
case"candidat_ice":t=B.cUA(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.V1(A.a4(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lm().aM(0,new B.bud(s),y.a).fK(new B.bue(s))
break
case"refuse":s.mF(A.b("Appel refus\xe9"))
break
case"annule":s.mF(A.b("Appel annul\xe9"))
break
case"termine":s.mF(A.b("Appel termin\xe9"))
break}},
Tb(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Tb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.X(0)
t=u.dy
t===$&&A.d()
t.it()
u.k(new B.btX(u,!1))
t=$.kb()
t.bqq()
s=u.Q
t.a9f(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$Tb,w)},
yf(d,e,f){return this.aR7(d,e,f)},
aho(d,e){return this.yf(d,e,!0)},
aR7(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$yf=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.K()
x=6
return A.e(s.asK(t.r,e,d),$async$yf)
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
Jz(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jz=A.f(function(d,e){if(d===1){t=e
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
return A.e(q.LR(r,"termine"),$async$Jz)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c7W()
$.kb().NT()
r=s.c
if(r!=null)A.a1(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jz,w)},
am2(){var x=this
if(!x.x||x.y)return
$.kb().brK()
x.k(new B.btY(x))
$.aP.aD$.push(new B.btZ(x))},
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
w.LR(x,"termine").fK(new B.bu8())}if(d!=null&&v.c!=null)v.c.q(y.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.c7W()
$.kb().NT()
x=v.c
if(x!=null)A.a1(x,!1).bO()},
Qa(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qa=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_A(u),$async$Qa)
case 2:if(v.c!=null)v.k(new B.btH(v,u))
$.kb().a9f(v.as,u)
return A.i(null,w)}})
return A.j($async$Qa,w)},
Q9(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q9=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.GE(u),$async$Q9)
case 2:if(v.c!=null)v.k(new B.btG(v,u))
$.kb().a9f(u,v.Q)
return A.i(null,w)}})
return A.j($async$Q9,w)},
Q6(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q6=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_x(u),$async$Q6)
case 2:if(v.c!=null)v.k(new B.btF(v,u))
return A.i(null,w)}})
return A.j($async$Q6,w)},
Q7(){var x=0,w=A.k(y.H),v=this,u
var $async$Q7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Ve(),$async$Q7)
case 2:return A.i(null,w)}})
return A.j($async$Q7,w)},
anP(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ae(w.ch.a,1e6)
return u+" "+(C.d.aV(C.c.l(C.c.ae(x,60)),2,"0")+":"+C.d.aV(C.c.l(C.c.a_(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
bdi(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.q(y.q).f.v(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.l,w,w,w,w,w,w,w,w,w))},
b2J(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.bQ(!1,v,v,v,!0,v,v,!0,!1,D.a69,v,v,v,new B.btU(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.e7,v,v,v),v,v))
if(w.x)u.push(A.bQ(!1,v,v,v,!0,v,v,!0,!1,D.a5T,v,v,v,new B.btV(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.e7,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.j5(D.zj,new B.btW(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.cfV(o.e,!1,D.Oy)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cx(A.H(A.a([new B.Nu(x,v,u,56,p),C.q,B.cts(x,22),C.k,A.c(q.anP(),p,p,p,p,D.wl,p,p,p)],y.p),C.n,C.f,C.O),p,p)}o=A.a([A.E3(0,x),A.f2(p,A.eR(A.N(12),B.cfV(o.d,!0,D.Oy),C.aq),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f2(p,new B.YJ(q.gam1(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f2(24,B.crs(q.ax,!0,v,x,q.gaeu(),q.gaev(),q.gaew(),q.gal6(),q.galH(),q.gapJ(),!0),p,p,0,0,p,p))
o=A.e2(C.aP,o,C.h,C.aI,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f2(p,A.r0(B.cfV(o.e,!1,D.v5),0),1,p,0,p,0,1))
if(q.x)v.push(A.f2(p,new B.YJ(q.gam1(),p),p,p,16,p,16,p))
o=B.cts(q.a.e,24)
u=A.c(q.anP(),p,p,p,p,D.wl,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.a8(A.cx(new B.Nu(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.H(A.a([C.q,o,C.k,new A.W(D.rD,u,p),t,B.crs(q.ax,!1,r,s,q.gaeu(),q.gaev(),q.gaew(),q.gal6(),q.galH(),q.gapJ(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e2(C.aP,v,C.h,C.aI,p)
o=v}return A.cfF(w,A.dR(p,C.o,A.fq(!0,o,!0,C.a_,!0,!0),p,p,p),new B.buf(q),y.K)}}
B.ak5.prototype={
D(d){var x,w,v=this,u=null,t=A.N(28),s=A.a8(new B.zL(D.a3W,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.Bn:D.a3V,q=A.b("Appel vid\xe9o")
r=A.a8(new B.zL(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a3R:D.a3Q
w=y.p
q=A.P(A.a([s,r,A.a8(new B.zL(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.S(u,A.H(A.a([q,C.q,A.P(A.a([A.a8(new B.zL(C.Bk,!1,x,v.r?v.Q:u,u,u),1,u),A.a8(new B.zL(D.Bd,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a2J],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.O),C.j,u,u,new A.a3(D.zj,u,u,t,u,u,C.u),u,u,u,C.As,D.a2x,u,u,u)}}
B.YJ.prototype={
D(d){var x=null
return A.H(A.a([A.ab(A.aT(!1,D.a5S,C.j,x,C.p,x,x,x,x,this.c,x,A.dk(C.kK,x,x,C.a_,C.cK,x)),48,48),C.I,A.c(A.b("R\xe9duire"),x,x,x,x,C.QU,x,x,x)],y.p),C.n,C.f,C.O)}}
B.zL.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kK
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dk(s,t,t,C.a_,C.cK,t)
return A.r0(A.H(A.a([A.ab(A.aT(!1,A.c2(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.k,A.c(u.e,t,t,t,t,C.wn,C.X,t,t)],y.p),C.n,C.f,C.O),w)}}
B.Nu.prototype={
O(){return new B.aoH(null,null)}}
B.aoH.prototype={
S(){var x,w=this
w.W()
x=A.cq(null,A.cT(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.aa8(0,!0)
w.d!==$&&A.aL()
w.d=x},
aU(d){var x,w
this.bg(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.cT(0,0,x?1100:2400,0,0)
w.aa8(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aFM()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.jD(v,x,v,v,t):A.jD(C.t,v,A.c(B.caQ(u.c),v,v,v,v,A.be(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ab(A.i5(q,new B.bQb(w,s),u),r,r)}}
B.a5t.prototype={
m(){var x=this,w=x.bS$
if(w!=null)w.T(0,x.ghL())
x.bS$=null
x.a2()},
ce(){this.da()
this.d_()
this.hM()}}
B.b2u.prototype={
Fn(d){return this.bqf(d)},
bqf(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jT(0),$async$Fn)
case 3:$.cj9()
s=y.N
r=A.a4(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aSX().Gr(0,A.a4(["audio",r,"video",d&&A.a4(["facingMode","user"],s,s)],s,y.z)),$async$Fn)
case 4:q=f
u.b=q
t.sacn(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fn,w)},
Az(d,e){return this.br0(d,e)},
br0(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$Az=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jT(0),$async$Az)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fn(e),$async$Az)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cj9().a7c(d,A.C(y.N,y.z)),$async$Az)
case 6:t=v.a=g
s=u.abz(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a61(0,s[q],u),$async$Az)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b2v(v)
t.Q=new B.b2w(v)
t.d=new B.b2x(v)
return A.i(null,w)}})
return A.j($async$Az,w)},
aP_(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sacn(0,d)
w.Hk()
x=w.r
if(x!=null)x.$0()}},
Hk(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Hk=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.Ox(0)
if(m==null)m=C.dm
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aUZ(n,s),$async$Hk)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.M(l)
A.oJ().$1("Appel : volume distant impossible : "+A.cdN(A.u(r)))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.R)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Hk,w)},
Lm(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Lm=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.VP(0),$async$Lm)
case 3:t=e
x=4
return A.e(s.GF(0,t),$async$Lm)
case 4:v=A.a4(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Lm,w)},
E5(d){return this.bhK(d)},
bhK(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$E5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.GH(0,new B.Ea(d.h(0,"sdp"),d.h(0,"type"))),$async$E5)
case 3:x=4
return A.e(s.VM(0),$async$E5)
case 4:t=f
x=5
return A.e(s.GF(0,t),$async$E5)
case 5:v=A.a4(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$E5,w)},
V7(d){return this.beA(d)},
beA(d){var x=0,w=A.k(y.H),v=this,u
var $async$V7=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.GH(0,new B.Ea(d.h(0,"sdp"),d.h(0,"type"))),$async$V7)
case 2:return A.i(null,w)}})
return A.j($async$V7,w)},
V1(d){return this.bel(d)},
bel(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$V1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.UP(new B.Kl(A.az(d.h(0,"candidate")),A.az(d.h(0,"sdpMid")),A.eM(d.h(0,"sdpMLineIndex")))),$async$V1)
case 3:case 1:return A.i(v,w)}})
return A.j($async$V1,w)},
a_A(d){return this.aA6(d)},
aA6(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$a_A=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ox(0)
if(r==null)r=C.dm
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slV(0,t)
return A.i(null,w)}})
return A.j($async$a_A,w)},
GE(d){return this.azX(d)},
azX(d){var x=0,w=A.k(y.H),v=this
var $async$GE=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.add(d),$async$GE)
case 2:x=3
return A.e(v.Hk(),$async$GE)
case 3:return A.i(null,w)}})
return A.j($async$GE,w)},
a_x(d){return this.azN(d)},
azN(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$a_x=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.OK(0)
if(s==null)s=C.dm
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slV(0,d)
return A.i(null,w)}})
return A.j($async$a_x,w)},
Ve(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Ve=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.OK(0)
if(s==null)s=D.al5
if(s.length===0){x=1
break}x=3
return A.e(B.ceR(C.b.gU(s)),$async$Ve)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Ve,w)},
hr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hr=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.add(!1),$async$hr)
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
p=p==null?null:p.abz(0)
if(p==null)p=C.dm
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cCJ(r)
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
B.a8v.prototype={
gbg2(){return this.b!=null&&!this.e},
VA(d,e){return this.bg3(d,e)},
bg3(d,e){var x=0,w=A.k(y.H),v=this
var $async$VA=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:v.x=d
v.y=e
v.e=!1
v.f=0
x=2
return A.e(v.Hi(),$async$VA)
case 2:return A.i(null,w)}})
return A.j($async$VA,w)},
Hi(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Hi=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a7(r)===0){x=1
break}u=4
q=B.cCQ(B.cdL(A.cI(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Hi)
case 7:s.f=0
p=s.y
if(p!=null&&J.a7(p)!==0)try{o=y.N
q.gkL().a.E(0,C.Z.dC(A.a4(["type","auth","jeton",p],o,o),null))}catch(l){}o=q.r.b
o===$&&A.d()
o=o.b
o===$&&A.d()
s.c=new A.cY(o,A.x(o).i("cY<1>")).b7(s.gb5E(),!0,s.gb45(),new B.aDn(s))
u=2
x=6
break
case 4:u=3
m=t
s.a3Y()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Hi,w)},
b5F(d){var x,w,v,u
try{x=C.Z.cK(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.r(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.cg5(w))}catch(u){}},
a3Y(){var x,w=this,v=w.c
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
w.d=A.dl(A.cT(0,0,0,0,x),new B.aDo(w))},
Lv(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$Lv=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.X(0)
s=t.c
s=s==null?null:s.X(0)
x=2
return A.e(y.x.b(s)?s:A.dU(s,y.H),$async$Lv)
case 2:t.c=null
v=4
s=t.b
s=s==null?null:s.gkL().aa(0)
x=7
return A.e(y._.b(s)?s:A.dU(s,y.z),$async$Lv)
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
return A.j($async$Lv,w)}}
B.acp.prototype={
ue(d){return this.bnM(d)},
bnM(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$ue=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.AZ():r).b1(0),$async$ue)
case 6:x=7
return A.e(t.a.a_w(d),$async$ue)
case 7:x=8
return A.e(t.a.jk(C.Jw),$async$ue)
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
B.aYe.prototype={
a7c(d,e){return this.bhz(d,e)},
bhz(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a7c=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a4(["mandatory",A.C(r,r),"optional",A.a([A.a4(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fP(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.cc(t)))
t=J.l(s)
v=B.cK6(C.c1.gj7().be(new A.eF(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a7c,w)}}
B.ub.prototype={
Ox(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dJ(w,A.Z(w).i("dJ<1,aG>"))
J.ht(w,new B.aTc(x))
return x},
OK(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dJ(w,A.Z(w).i("dJ<1,aG>"))
J.ht(w,new B.aTd(x))
return x},
abz(d){var x=A.G(this.Ox(0),!0,y.G)
C.b.t(x,this.OK(0))
return x}}
B.acT.prototype={
aH7(d){var x=this,w=x.d
w.addEventListener("ended",A.c6(new B.aT9(x)))
w.addEventListener("mute",A.c6(new B.aTa(x)))
w.addEventListener("unmute",A.c6(new B.aTb(x)))},
slV(d,e){this.d.enabled=e},
V8(d,e){return this.beD(0,e)},
beD(d,e){var x=0,w=A.k(y.H),v=this
var $async$V8=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.e0(v.d.applyConstraints(y.m.a(A.cc(e))),y.X),$async$V8)
case 2:return A.i(null,w)}})
return A.j($async$V8,w)},
b1(d){var x=0,w=A.k(y.H),v=this
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$b1,w)}}
B.aSX.prototype={
Gr(d,e){return this.ayV(0,e)},
ayV(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gr=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cX3())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.iI(e.h(0,"video"),"facingMode")
e.cQ(0,"video",new B.aSZ())
e.cQ(0,"audio",new B.aT_())}catch(a0){A.rZ("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.h8(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.ht(s,new B.aT0(r))
J.iI(e.h(0,"audio"),"optional")
J.jx(e.h(0,"audio"),r)}}catch(a0){q=A.M(a0)
p=A.bx(a0)
A.rZ("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.cc(e)
x=10
return A.e(A.e0(o.getUserMedia(h.a(n)),h),$async$Gr)
case 10:m=a2
v=new B.ub(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.e0(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Gr)
case 11:l=a2
v=new B.ub(l,"local")
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
return A.j($async$Gr,w)}}
B.aeJ.prototype={
aHg(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.c6(new B.aYg(x)))
w.addEventListener("icecandidate",A.c6(new B.aYh(x)))
w.addEventListener("iceconnectionstatechange",A.c6(new B.aYi(x)))
w.onicegatheringstatechange=A.c6(new B.aYj(x))
w.addEventListener("signalingstatechange",A.c6(new B.aYk(x)))
if(!$.ciU())w.addEventListener("connectionstatechange",A.c6(new B.aYl(x)))
w.addEventListener("negotiationneeded",A.c6(new B.aYm(x)))
w.addEventListener("track",A.c6(new B.aYn(x)))},
VP(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e0(s.createOffer(y.m.a(A.cc(A.C(y.N,y.z)))),y.A),$async$VP)
case 3:t=f
v=new B.Ea(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VP,w)},
VM(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e0(s.createAnswer(y.m.a(A.cc(A.C(y.N,y.z)))),y.A),$async$VM)
case 3:t=f
v=new B.Ea(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VM,w)},
GF(d,e){return this.aA0(0,e)},
aA0(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e0(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$GF)
case 2:return A.i(null,w)}})
return A.j($async$GF,w)},
GH(d,e){return this.aAg(0,e)},
aAg(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GH=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e0(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$GH)
case 2:return A.i(null,w)}})
return A.j($async$GH,w)},
UP(d){return this.be_(d)},
be_(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$UP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.e0(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$UP)
case 2:return A.i(null,w)}})
return A.j($async$UP,w)},
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
a61(d,e,f){return this.bee(0,e,f)},
bee(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a61=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.aeK()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a61,w)}}
B.aeK.prototype={}
B.cfU.prototype={
b1(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.M(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.p("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$b1,w)}}
B.UM.prototype={
sav5(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Ma()
if(x!=null)x.style.objectFit=e},
aoN(){var x=this,w=x.Ma(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sn(0,v.arM(u,x.z!=null,0,t))},
sacn(d,e){var x,w,v,u,t=this
t.z=e
if(e.OK(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ap(y.l.b(x)?x:new A.dJ(x,A.Z(x).i("dJ<1,aG>")))
for(;x.B();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.Ox(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ap(y.l.b(x)?x:new A.dJ(x,A.Z(x).i("dJ<1,aG>")))
for(;x.B();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aQV()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Ma()
if(u!=null){u.srcObject=t.x
x=t.Ma()
x.toString
t.aeg(x)}t.sn(0,t.a.bgs(t.z!=null))},
aQV(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Ma(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)t[r].X(0)
q=u.Ma()
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
jT(d){var x=0,w=A.k(y.H),v=this
var $async$jT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.OL()
$.t0().xe("RTCVideoRenderer-"+v.Q,new B.aYt(v),!0)
return A.i(null,w)}})
return A.j($async$jT,w)},
aeg(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UO.prototype={
O(){return new B.UP()}}
B.UP.prototype={
S(){var x,w,v=this
v.W()
v.a.c.aj(0,v.gb1P())
x=v.a
w=x.c
w.as=x.e
w.sav5(0,x.d===D.v5?"contain":"cover")},
b1Q(){if(this.c!=null)this.k(new B.aYu())},
m(){if(this.c!=null)this.a2()},
aU(d){var x,w
this.bg(d)
A.dl(A.cT(0,0,10,0,0),new B.aYw(this))
x=this.a
w=x.c
w.sav5(0,x.d===D.v5?"contain":"cover")},
D(d){return new A.iR(new B.aYv(this),null)}}
B.ab1.prototype={
aGP(d,e,f,g){var x=this,w=$.aM
x.a!==$&&A.aL()
x.a=new B.a0a(d,x,new A.bg(new A.aC(w,y.c),y.r),e,g.i("a0a<0>"))
if(f.a.gjd())f.a=new B.Wr(g.i("@<0>").cc(g).i("Wr<1,2>")).hN(f.a)
w=A.hb(null,new B.aLU(f,x),null,!0,g)
x.b!==$&&A.aL()
x.b=w},
akX(){var x,w
this.d=!0
x=this.c
if(x!=null)x.X(0)
w=this.b
w===$&&A.d()
w.aa(0)}}
B.a0a.prototype={
E(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dB(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.aTS(d,e)},
i8(d){return this.dB(d,null)},
aTS(d,e){var x=this
if(x.w){x.a.a.dB(d,e)
return}x.c.hl(d,e)
x.akY()
x.b.akX()
x.a.a.aa(0).fK(new B.bzy())},
aa(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.akX()
x.c.cI(0,x.a.a.aa(0))}return x.c.a},
akY(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dW(0)
return},
$ie6:1}
B.ah5.prototype={}
B.ah6.prototype={}
B.B4.prototype={
afN(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Hk(d,e))
x.aa(0)},
abR(d){var x
if((this.b.b&4)!==0)throw A.p(B.cgz())
x=A.cc(d)
x.toString
this.a.send(x)},
zg(d,e,f){return this.bfK(0,e,f)},
bfK(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$zg=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.p(B.cgz())
u.aa(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$zg,w)},
$icgy:1}
B.v4.prototype={}
B.LF.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.LF&&e.a===this.a},
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
B.Mf.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibR:1}
B.Me.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.axs.prototype={
gkL(){var x,w=this,v=w.w
if(v===$){x=w.r.b
x===$&&A.d()
x=x.a
x===$&&A.d()
v!==$&&A.b3()
v=w.w=new B.atW(w,x)}return v},
aGx(d){d.ft(0,new B.axw(this),new B.axx(this),y.a)}}
B.atW.prototype={
aa(d){var x=this.b
x.e=x.d=null
return this.aBX(0)}}
B.aip.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibR:1}
B.yN.prototype={
P(){return"RTCSignalingState."+this.b}}
B.UI.prototype={
P(){return"RTCIceGatheringState."+this.b}}
B.yM.prototype={
P(){return"RTCPeerConnectionState."+this.b}}
B.o8.prototype={
P(){return"RTCIceConnectionState."+this.b}}
B.aeL.prototype={
P(){return"RTCVideoViewObjectFit."+this.b}}
B.aYd.prototype={}
B.Td.prototype={}
B.Jv.prototype={
l(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aSW.prototype={}
B.Kl.prototype={}
B.UJ.prototype={}
B.UK.prototype={}
B.aYo.prototype={}
B.Ea.prototype={}
B.UL.prototype={}
B.UN.prototype={
arM(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.UN(x,w,v)},
bgs(d){return this.arM(null,d,null,null)},
l(d){var x=this
return A.ad(x).l(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Le)","bB(Kl)","bB(UL)","bB(o8)","~(@)","ub(@)","bB(cgy)","~(v4)"])
B.b36.prototype={
$0(){return J.cC3(this.a.bl())},
$S:1}
B.b37.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.M(v)
if(y.i.b(u)){x=u
w=A.bx(v)
this.b.dB(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c9O.prototype={
$1(d){var x,w,v,u=$.K().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.dC(A.a4(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:28}
B.c9N.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azI.prototype={
$1(d){if(d==null)return null
return A.bT(J.l(d))},
$S:112}
B.bup.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.JE(!0)},
$S:0}
B.buq.prototype={
$1(d){return this.a.UD()},
$S:27}
B.bum.prototype={
$0(){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:0}
B.bun.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buj.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buk.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bul.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bug.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buh.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bui.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.ceq(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1199}
B.buo.prototype={
$0(){return this.a.b5X()},
$S:0}
B.bu1.prototype={
$1(d){this.a.yf("candidat_ice",d,!1)},
$S:212}
B.bu2.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.bu0(x))},
$S:0}
B.bu0.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bu3.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bu4.prototype={
$0(){},
$S:0}
B.bu5.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.bu_(x,w))},
$S:27}
B.bu_.prototype={
$0(){return this.a.ch=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.bu6.prototype={
$1(d){},
$S:132}
B.bu7.prototype={
$1(d){this.a.yq()},
$S:27}
B.btK.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.yf("annule",C.bn,!1)
x.mF(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.btL.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.btM.prototype={
$1(d){this.a.yf("candidat_ice",d,!1)},
$S:212}
B.btN.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.btJ(x))},
$S:0}
B.btJ.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.btO.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.btP.prototype={
$0(){return this.a.z=!0},
$S:0}
B.btQ.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.btI(x,w))},
$S:27}
B.btI.prototype={
$0(){return this.a.ch=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.btR.prototype={
$1(d){},
$S:132}
B.btS.prototype={
$1(d){this.a.yq()},
$S:27}
B.bu9.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.Tb()
x.aho("reponse",d)},
$S:270}
B.bua.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bub.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Tb()},
$S:32}
B.buc.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bud.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.aho("offre",d)},
$S:270}
B.bue.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.btX.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.at(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.btY.prototype={
$0(){return this.a.go=!0},
$S:0}
B.btZ.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:5}
B.bu8.prototype={
$1(d){return A.C(y.N,y.z)},
$S:102}
B.btH.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.btG.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.btF.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.btU.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).bO()
x.Q7()},
$S:0}
B.btV.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).Y7().aM(0,new B.btT(x),y.H)},
$S:0}
B.btT.prototype={
$1(d){return this.a.am2()},
$S:9}
B.btW.prototype={
$1(d){return A.fq(!0,A.H(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:145}
B.buf.prototype={
$2(d,e){if(!d)this.a.Jz()},
$S:1203}
B.bQb.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cqN(A.S(u,u,C.j,u,u,new A.a3(u,u,A.bm(C.t.b3(t*(1-s)),3),u,u,u,C.aJ),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.S(u,u,C.j,u,u,new A.a3(u,u,A.bm(C.t,2),u,u,u,C.aJ),u,w,u,u,u,u,u,w)
e.toString
return A.e2(C.a6,A.a([s,w,e],y.p),C.h,C.aI,u)},
$S:1204}
B.b2v.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a4(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b2w.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aP_(w)},
$S:z+4}
B.b2x.prototype={
$1(d){var x
if(d===D.Op){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDn.prototype={
$1(d){return this.a.a3Y()},
$S:21}
B.aDo.prototype={
$0(){var x=this.a
if(!x.e)x.Hi()},
$S:0}
B.caR.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTc.prototype={
$1(d){return this.a.push(B.cff(d))},
$S:21}
B.aTd.prototype={
$1(d){return this.a.push(B.cff(d))},
$S:21}
B.aT9.prototype={
$1(d){},
$S:25}
B.aTa.prototype={
$1(d){},
$S:25}
B.aTb.prototype={
$1(d){},
$S:25}
B.aSZ.prototype={
$0(){return!1},
$S:50}
B.aT_.prototype={
$0(){return!1},
$S:50}
B.aT0.prototype={
$1(d){J.ht(d,new B.aSY(this.a))},
$S:212}
B.aSY.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:52}
B.aYg.prototype={
$1(d){},
$S:25}
B.aYh.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Kl(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:25}
B.aYi.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cWC(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ciU())switch(w.cx.a){case 0:w.cy=D.Ou
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
B.aYj.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cWD(w.iceGatheringState)},
$S:45}
B.aYk.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cYL(w.signalingState)},
$S:45}
B.aYl.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cXV(w.connectionState)},
$S:45}
B.aYm.prototype={
$1(d){},
$S:45}
B.aYn.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.cff(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dJ(x,A.Z(x).i("dJ<1,aG>"))
w=J.dw(x,new B.aYf(w),y.h)
v.$1(new B.UL(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:25}
B.aYf.prototype={
$1(d){return new B.ub(d,this.a.as)},
$S:z+7}
B.cb_.prototype={
$1(d){return J.hG(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYt.prototype={
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
x.aeg(t)
v=y.k.c
w.push(A.iC(t,"canplay",new B.aYp(x),!1,v))
w.push(A.iC(t,"resize",new B.aYq(x),!1,v))
w.push(A.iC(t,"error",new B.aYr(t),!1,v))
w.push(A.iC(t,"ended",new B.aYs(),!1,v))
return t},
$S:173}
B.aYp.prototype={
$1(d){this.a.aoN()},
$S:21}
B.aYq.prototype={
$1(d){this.a.aoN()},
$S:21}
B.aYr.prototype={
$1(d){var x,w,v=this.a.error
A.rZ("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.JC.h(0,A.aw(v,"code"))
x.toString
w=!J.r(A.aw(v,"message"),"")?A.aw(v,"message"):"No further diagnostic information can be determined or provided."
throw A.p(A.o3(x,C.JB.h(0,A.aw(v,"code")),w,null))},
$S:28}
B.aYs.prototype={
$1(d){},
$S:21}
B.aYu.prototype={
$0(){},
$S:0}
B.aYw.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aYv.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aMT("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cx(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1205}
B.aLU.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.gir(w),new B.aLT(v),w.gpE())},
$S:0}
B.aLT.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.akY()
x=x.b
x===$&&A.d()
x.aa(0)},
$S:0}
B.bzy.prototype={
$1(d){},
$S:17}
B.aBW.prototype={
$1(d){this.a.cI(0,this.b)},
$S:25}
B.aBX.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hO(new B.Mf("Failed to connect WebSocket"))
else this.b.afN(1006,"error")},
$S:25}
B.aBY.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cE("data")
if(typeof x==="string")w.b=new B.LF(A.bq(x))
else if(typeof x==="object"&&A.cnQ(y.m.a(x),"ArrayBuffer"))w.b=new B.GU(A.TD(y.o.a(x),0,null))
else throw A.p(A.am("unexpected message type: "+J.aK(x).l(0)))
v.E(0,w.bl())},
$S:28}
B.aBZ.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cI(0,this.b)
this.b.afN(d.code,d.reason)},
$S:25}
B.axw.prototype={
$1(d){var x=d.b,w=this.a
new A.cY(x,A.x(x).i("cY<1>")).d4(new B.axt(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cY(x,A.x(x).i("cY<1>")).bo1(new B.axu(d),new B.axv(w,d))
w.f.dW(0)},
$S:z+8}
B.axt.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.LF
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
B.axu.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.aq(B.cgz())
s=A.cc(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.abR(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.abR(new Uint8Array(A.bX(u)))
break $label1$1}t=A.aV("Cannot send "+J.aK(d).l(0))
throw A.p(t)}}catch(r){if(!(A.M(r) instanceof B.Me))throw r}},
$S:18}
B.axv.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.zg(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.M(q) instanceof B.Me))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.axx.prototype={
$1(d){var x,w=d instanceof A.Xu?d:new B.aip(J.l(d)),v=this.a
v.f.hO(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i8(w)
v=v.a
v===$&&A.d()
v.aa(0)},
$S:45};(function aliases(){var x=B.HW.prototype
x.aBX=x.aa
x=B.a5t.prototype
x.aFM=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_h.prototype,"gaI_","H3",0)
var v
w(v=B.a_g.prototype,"gaoE","aoF",2)
x(v,"galH","Jz",0)
x(v,"gam1","am2",1)
x(v,"gaew","Qa",0)
x(v,"gaev","Q9",0)
x(v,"gaeu","Q6",0)
x(v,"gapJ","bdi",1)
x(v,"gal6","b2J",1)
w(v=B.a8v.prototype,"gb5E","b5F",6)
x(v,"gb45","a3Y",1)
x(B.UM.prototype,"gec","m",0)
x(B.UP.prototype,"gb1P","b1Q",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ak,[B.HW,B.azH,B.Le,B.a8J,B.b2u,B.a8v,B.acp,B.aYd,B.Td,B.Jv,B.aSW,B.UJ,B.UK,B.aYo,B.ah6,B.a0a,B.ah5,B.B4,B.v4,B.Mf,B.aip,B.Kl,B.Ea,B.UL,B.UN])
v(B.Wr,A.h1)
w(A.kg,[B.b36,B.c9N,B.bup,B.bum,B.bun,B.buj,B.buk,B.bul,B.bug,B.buh,B.buo,B.bu2,B.bu0,B.bu3,B.bu4,B.bu_,B.btK,B.btL,B.btN,B.btJ,B.btO,B.btP,B.btI,B.btX,B.btY,B.btH,B.btG,B.btF,B.btU,B.btV,B.aDo,B.aSZ,B.aT_,B.aYu,B.aYw,B.aLU,B.aLT,B.axv])
w(A.jE,[B.b37,B.c9O,B.azI,B.buq,B.bui,B.bu1,B.bu5,B.bu6,B.bu7,B.btM,B.btQ,B.btR,B.btS,B.bu9,B.bua,B.bub,B.buc,B.bud,B.bue,B.btZ,B.bu8,B.btT,B.btW,B.b2v,B.b2w,B.b2x,B.aDn,B.caR,B.aTc,B.aTd,B.aT9,B.aTa,B.aTb,B.aT0,B.aYg,B.aYh,B.aYi,B.aYj,B.aYk,B.aYl,B.aYm,B.aYn,B.aYf,B.cb_,B.aYt,B.aYp,B.aYq,B.aYr,B.aYs,B.bzy,B.aBW,B.aBX,B.aBY,B.aBZ,B.axw,B.axt,B.axu,B.axx])
w(A.T,[B.qF,B.qE,B.Nu,B.UO])
w(A.Y,[B.a_h,B.a_g,B.a5t,B.UP])
w(A.au,[B.YI,B.ak5,B.YJ,B.zL])
w(A.tm,[B.buf,B.bQb,B.aSY,B.aYv])
v(B.aoH,B.a5t)
v(B.aYe,B.aYd)
v(B.ub,B.Td)
v(B.acT,B.Jv)
v(B.aSX,B.aSW)
v(B.aeJ,B.UJ)
v(B.aeK,B.UK)
v(B.cfU,B.aYo)
v(B.UM,A.du)
w(B.ah6,[B.ab1,B.axs])
w(B.v4,[B.LF,B.GU,B.Hk])
v(B.Me,B.Mf)
v(B.atW,B.HW)
w(A.MN,[B.yN,B.UI,B.yM,B.o8,B.aeL])
x(B.a5t,A.h0)})()
A.oB(b.typeUniverse,JSON.parse('{"HW":{"e6":["1"]},"Wr":{"h1":["1","2"],"h1.S":"1","h1.T":"2"},"Nu":{"T":[],"q":[]},"qF":{"T":[],"q":[]},"a_h":{"Y":["qF"]},"YI":{"au":[],"q":[]},"qE":{"T":[],"q":[]},"a_g":{"Y":["qE"]},"ak5":{"au":[],"q":[]},"YJ":{"au":[],"q":[]},"zL":{"au":[],"q":[]},"aoH":{"Y":["Nu"]},"ub":{"Td":[]},"acT":{"Jv":[]},"aeJ":{"UJ":[]},"aeK":{"UK":[]},"UM":{"du":["UN"],"b1":[]},"UO":{"T":[],"q":[]},"UP":{"Y":["UO"]},"a0a":{"e6":["1"]},"B4":{"cgy":[]},"LF":{"v4":[]},"GU":{"v4":[]},"Hk":{"v4":[]},"Mf":{"bR":[]},"Me":{"bR":[]},"atW":{"e6":["@"]},"aip":{"bR":[]}}'))
A.csb(b.typeUniverse,JSON.parse('{"HW":1,"ah6":1}'))
var y=(function rtii(){var x=A.aB
return{b:x("B4"),L:x("bR"),_:x("av<@>"),x:x("av<~>"),S:x("I<ah<o,V>>"),t:x("I<ah<o,@>>"),Q:x("I<Jv>"),d:x("I<jl<@>>"),s:x("I<o>"),p:x("I<q>"),m:x("aG"),l:x("E<aG>"),F:x("E<ah<o,@>>"),j:x("E<@>"),I:x("E<v>"),P:x("ah<o,@>"),f:x("ah<@,@>"),E:x("Td"),G:x("Jv"),h:x("ub"),o:x("qX"),a:x("bB"),K:x("ak"),J:x("UJ"),e:x("UK"),v:x("Ea"),Z:x("ah5<ak?>"),N:x("o"),i:x("rv"),M:x("eB"),D:x("v4"),U:x("X<o>"),g:x("dT<Le>"),n:x("dT<~>"),V:x("bg<B4>"),r:x("bg<@>"),R:x("bg<~>"),k:x("a_r<aG>"),C:x("pX<aG>"),u:x("aC<B4>"),c:x("aC<@>"),W:x("aC<~>"),q:x("kG"),y:x("V"),z:x("@"),A:x("aG?"),X:x("ak?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zj=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.YU=new B.a8J(C.eQ)
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
D.Or=new B.UI(0,"RTCIceGatheringStateNew")
D.auT=new B.UI(1,"RTCIceGatheringStateGathering")
D.auU=new B.UI(2,"RTCIceGatheringStateComplete")
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
D.av_=new B.UN(0,0,0)
D.v5=new B.aeL(0,"RTCVideoViewObjectFitContain")
D.Oy=new B.aeL(1,"RTCVideoViewObjectFitCover")
D.ayM=new A.ci(48,null,null,null)
D.ayZ=new A.ci(null,64,null,null)
D.aC0=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aCe=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wl=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chx=null
$.crd=!1
$.cpk=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d3L","cj9",()=>new B.aYe())
x($,"d0m","ciU",()=>C.d.u(A.aw(A.aw(A.aw(A.ciy(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"JrptBPRB07h3KU8TMovFBqmBu9Q=");