((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DO:function DO(){},QL:function QL(d){this.$ti=d},aQH:function aQH(d){this.a=d},aQI:function aQI(d,e){this.a=d
this.b=e},
a06(d){var x,w,v,u,t,s=new B.apU(),r=J.O(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aP(r.h(d,"appele_id"))
A.aP(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.apT(q,x,w,v,u,t)},
bZ9(d){var x,w,v,u=J.O(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.me(t,y.N,y.z):C.e6
if(u.h(d,"cree_le")!=null)A.c6(J.l(u.h(d,"cree_le")))
return new B.Gs(s,x,w,v)},
c9d(d){var x,w,v,u,t,s,r=J.O(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Ub
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.me(s,u,t))}return new B.a1A(x)},
bLo(d){var x=C.h.b_(d.a,1e6)
return C.c.aW(C.h.j(C.h.b_(x,60)),2,"0")+":"+C.c.aW(C.h.j(C.h.aP(x,60)),2,"0")},
c32(d){var x=J.O(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oC(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ahh(w,v)},
cmM(d){var x,w,v=J.O(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahk(u,A.jL(w)?w:null,v)},
apT:function apT(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
apU:function apU(){},
Gs:function Gs(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1A:function a1A(d){this.a=d},
bWf(d,e,f,g,h,i){return new B.p4(e,f,i,h,d,null)},
bWe(d,e,f,g,h){return new B.yA(e,h,f,g,d,null)},
c_r(d,e,f,g,h,i,j,k,l,m,n){return new B.abN(g,f,e,i,h,d,m,l,k,j,n,null)},
p4:function p4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
U7:function U7(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bbO:function bbO(d){this.a=d},
bbP:function bbP(d){this.a=d},
bbL:function bbL(d){this.a=d},
bbM:function bbM(d){this.a=d},
bbI:function bbI(d){this.a=d},
bbJ:function bbJ(d){this.a=d},
bbK:function bbK(d){this.a=d},
bbF:function bbF(d){this.a=d},
bbG:function bbG(d){this.a=d},
bbH:function bbH(d){this.a=d},
bbN:function bbN(d){this.a=d},
SM:function SM(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yA:function yA(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
U6:function U6(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
bbp:function bbp(d){this.a=d},
bbq:function bbq(d){this.a=d},
bbo:function bbo(){},
bbr:function bbr(d){this.a=d},
bbs:function bbs(d){this.a=d},
bbt:function bbt(d){this.a=d},
bbu:function bbu(d){this.a=d},
bbn:function bbn(d,e){this.a=d
this.b=e},
bbv:function bbv(){},
bbw:function bbw(d){this.a=d},
bby:function bby(d){this.a=d},
bbz:function bbz(d){this.a=d},
bbA:function bbA(d){this.a=d},
bbB:function bbB(d){this.a=d},
bbC:function bbC(d){this.a=d},
bbD:function bbD(d){this.a=d},
bbx:function bbx(d){this.a=d},
bbm:function bbm(d,e){this.a=d
this.b=e},
bbl:function bbl(d,e){this.a=d
this.b=e},
bbk:function bbk(d,e){this.a=d
this.b=e},
bbE:function bbE(d){this.a=d},
abN:function abN(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wE:function wE(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aQ4:function aQ4(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aQ5:function aQ5(d){this.a=d},
aQ6:function aQ6(d){this.a=d},
aQ7:function aQ7(d){this.a=d},
a1m:function a1m(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
asW:function asW(d){this.a=d},
asX:function asX(d){this.a=d},
an5(d){var x=y.U,w=A.H(new A.W(A.b(d.split(" "),y.s),new B.bMi(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gR(w),0).toUpperCase()
return(J.p(C.b.gR(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bMi:function bMi(){},
aLa:function aLa(){},
mH:function mH(d,e,f){this.e=d
this.a=e
this.b=f},
aGw:function aGw(d){this.a=d},
aGx:function aGx(d){this.a=d},
bPY(d){var x=new B.a59(d)
x.awk(d)
return x},
a59:function a59(d){this.d=d},
aGt:function aGt(d){this.a=d},
aGu:function aGu(d){this.a=d},
aGv:function aGv(d){this.a=d},
aGe:function aGe(){},
aGg:function aGg(){},
aGh:function aGh(){},
aGi:function aGi(d){this.a=d},
aGf:function aGf(d){this.a=d},
ce0(d,e){var x=y.N
x=new B.a6O(d,e,A.C(x,y.E),A.C(x,y.z))
x.awp(d,e)
return x},
a6O:function a6O(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aLd:function aLd(d){this.a=d},
aLe:function aLe(d){this.a=d},
aLf:function aLf(d){this.a=d},
aLg:function aLg(d){this.a=d},
aLh:function aLh(d){this.a=d},
aLi:function aLi(d){this.a=d},
aLj:function aLj(d){this.a=d},
aLk:function aLk(d){this.a=d},
aLb:function aLb(d){this.a=d},
aLc:function aLc(d,e){this.a=d
this.b=e},
bQv:function bQv(d){this.a=d},
coJ(){return C.b.m4(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bMq())!==-1},
bMq:function bMq(){},
bYB(){var x=A.b([],y.d),w=$.bYC
$.bYC=w+1
return new B.Pg(w,x,D.aje,$.af())},
Pg:function Pg(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aLq:function aLq(d){this.a=d},
aLm:function aLm(d){this.a=d},
aLn:function aLn(d){this.a=d},
aLo:function aLo(d){this.a=d},
aLp:function aLp(){},
bYD(d,e,f){return new B.Pi(d,f,e,null)},
Pi:function Pi(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pj:function Pj(){this.c=this.a=null},
aLr:function aLr(){},
aLt:function aLt(d){this.a=d},
aLs:function aLs(d){this.a=d},
bWO(d,e,f,g){var x,w={}
w.a=d
x=new B.a3E(g.i("a3E<0>"))
x.awb(e,f,w,g)
return x},
a3E:function a3E(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
azV:function azV(d,e){this.a=d
this.b=e},
azU:function azU(d){this.a=d},
UY:function UY(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgt:function bgt(){},
a90:function a90(d){this.b=this.a=$
this.$ti=d},
a91:function a91(){},
bOK(d,e){return B.c8w(d,e)},
c8w(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bOK=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o_("ws")&&!d.o_("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xV(r,A.fG(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.ci(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fG(new B.Hl("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oq(r,"open",!1,y.C).gR(0).az(new B.arR(p,q),y.H)
t=y.C
s=y.H
new A.oq(r,"error",!1,t).gR(0).az(new B.arS(p,q),s)
A.hT(r,"message",new B.arT(q),!1,y.m)
new A.oq(r,"close",!1,t).gR(0).az(new B.arU(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bOK,w)},
xV:function xV(d,e){this.a=d
this.b=e},
arR:function arR(d,e){this.a=d
this.b=e},
arS:function arS(d,e){this.a=d
this.b=e},
arT:function arT(d){this.a=d},
arU:function arU(d,e){this.a=d
this.b=e},
bR7(){return new B.Hk("Connection Closed")},
te:function te(){},
GS:function GS(d){this.a=d},
D0:function D0(d){this.a=d},
Dq:function Dq(d,e){this.a=d
this.b=e},
Hl:function Hl(d){this.a=d},
Hk:function Hk(d){this.a=d},
c82(d){var x=null,w=$.aE,v=new B.a90(y.Z),u=y.X,t=A.fG(x,x,x,!0,u),s=A.fG(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bWO(new A.cA(s,r.i("cA<1>")),new A.Cd(t,q.i("Cd<1>")),!0,u)
v.b=B.bWO(new A.cA(t,q.i("cA<1>")),new A.Cd(s,r.i("Cd<1>")),!1,u)
v=new B.ao6(new A.aZ(new A.au(w,y.W),y.R),v)
v.aw1(d)
return v},
ao6:function ao6(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
aoa:function aoa(d){this.a=d},
ao7:function ao7(d){this.a=d},
ao8:function ao8(d){this.a=d},
ao9:function ao9(d,e){this.a=d
this.b=e},
aob:function aob(d){this.a=d},
akY:function akY(d,e){this.b=d
this.a=e},
aa8:function aa8(d){this.a=d},
coj(d){switch(d){case"new":return D.aj1
case"checking":return D.aj2
case"connected":return D.aj4
case"completed":return D.aj3
case"failed":return D.KB
case"disconnected":return D.aj6
case"closed":return D.KC
case"count":return D.aj5}return D.KC},
cok(d){switch(d){case"new":return D.KD
case"gathering":return D.aj7
case"complete":return D.aj8}return D.KD},
cpR(d){switch(d){case"stable":return D.aj9
case"have-local-offer":return D.aja
case"have-local-pranswer":return D.ajc
case"have-remote-offer":return D.ajb
case"have-remote-pranswer":return D.ajd
case"closed":return D.KJ}return D.KJ},
cps(d){switch(d){case"new":return D.KG
case"connecting":return D.KH
case"connected":return D.KI
case"closed":return D.rX
case"disconnected":return D.KF
case"failed":return D.KE}return D.rX},
vR:function vR(d,e){this.a=d
this.b=e},
Pd:function Pd(d,e){this.a=d
this.b=e},
vQ:function vQ(d,e){this.a=d
this.b=e},
mT:function mT(d,e){this.a=d
this.b=e},
a6P:function a6P(d,e){this.a=d
this.b=e},
aL9:function aL9(){},
NS:function NS(){},
F2:function F2(){},
aGd:function aGd(){},
FI:function FI(d,e,f){this.a=d
this.b=e
this.c=f},
Pe:function Pe(){},
aLl:function aLl(){},
At:function At(d,e){this.a=d
this.b=e},
Pf:function Pf(d){this.b=d},
Ph:function Ph(d,e,f){this.a=d
this.b=e
this.c=f},
bPF(d){var x=0,w=A.k(y.y)
var $async$bPF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bPF,w)},
aJ3(d){var x=0,w=A.k(y.H),v
var $async$aJ3=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.d(B.aUZ("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aJ3)
case 2:return A.i(null,w)}})
return A.j($async$aJ3,w)},
aUZ(d,e,f,g){return B.cgH(d,e,f,g,f.i("0?"))},
cgH(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUZ=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.d(B.aUY(),$async$aUZ)
case 3:v=D.Ge.c5(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUZ,w)},
aUY(){var x=0,w=A.k(y.H),v,u
var $async$aUY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c_i?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.d(D.Ge.c5("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aUY)
case 4:$.c_i=!0
case 3:return A.i(null,w)}})
return A.j($async$aUY,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[28]
E=c[18]
B.DO.prototype={
D(d,e){this.a.D(0,e)},
d4(d,e){this.a.d4(d,e)},
a3(d){return this.a.a3(0)},
$idH:1}
B.QL.prototype={
iJ(d){var x=A.cz("subscription"),w=A.fG(new B.aQH(x),null,null,!0,this.$ti.y[1])
x.b=d.eR(new B.aQI(this,w),w.gm_(w),w.gnA())
return new A.cA(w,A.u(w).i("cA<1>"))}}
B.apT.prototype={}
B.Gs.prototype={}
B.a1A.prototype={}
B.p4.prototype={
N(){return new B.U7()}}
B.U7.prototype={
U(){var x=this
x.W()
x.KE()
x.r=A.dg(C.c2,new B.bbO(x))
x.w=A.iA(C.xA,new B.bbP(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a4()},
Xy(){var x=this.x
if(x!=null)x.V(0)
this.x=A.dg(C.fV,new B.bbL(this))},
Ok(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Ok=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.d(o.AO(p.c),$async$Ok)
case 7:r=e
q=B.a06(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbM(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.Xy()}u=2
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
return A.j($async$Ok,w)},
KE(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$KE=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.aa()
x=7
return A.d(n.AO(o.c),$async$KE)
case 7:r=e
q=B.a06(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gal6()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bbI(s))
s.Xy()
x=1
break}s.n(new B.bbJ(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bbK(s))
s.Xy()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KE,w)},
Ku(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Ku=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.bbF(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.d(p.a0k(q.c,"accepte"),$async$Ku)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.n(new B.bbG(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.V(0)
q=s.w
if(q!=null)q.V(0)
q=s.c
q.toString
A.a9(q,!1).xo(A.e5(new B.bbH(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ku,w)},
F2(d){return this.aRb(d)},
aRa(){return this.F2(!1)},
aRb(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F2=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.V(0)
r=s.w
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.aa()
x=7
return A.d(q.a0k(r.c,"refuse"),$async$F2)
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
if(r!=null)A.a9(r,!1).br()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F2,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jT(C.r,s,A.c(B.an5(r.d),s,s,s,s,D.N3,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.MT,C.W,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.ay,new A.Y(D.xU,x,s),C.k,A.c(q,s,s,s,s,D.u5,s,s,s),D.Mc],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbN(t)
v=A.a("Accepter")
u=t.f?s:t.gax2()
q.push(A.U(A.b([new B.SM(D.yE,C.aC,r,x,s),D.amJ,new B.SM(D.yD,C.cA,v,u,s)],w),C.o,C.bk,C.i,s))}if(t.d)q.push(C.wg)
return A.ex(s,C.n,A.fy(!0,A.cB(A.I(q,C.o,C.e,C.V),s,s),!0,C.ak,!0,!0),s,s,s)}}
B.SM.prototype={
C(d){var x=this,w=null,v=A.dj(x.d,w,w,C.ak,C.ci,w)
return A.I(A.b([A.ab(A.b5(!1,A.c1(x.c,C.l,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.ee,w,w,w)],y.p),C.o,C.e,C.V)}}
B.yA.prototype={
N(){return new B.U6(A.b0(y.N),C.R)}}
B.U6.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bYB()
w=B.bYB()
v.d!==$&&A.bj()
v.d=new B.aQ4(x,w)
v.a.toString
x=new B.a1m(new A.ds(u,u,y.g),new A.ds(u,u,y.n))
v.e!==$&&A.bj()
v.e=x
v.v9()},
k(){var x=this,w=x.ay
if(w!=null)w.V(0)
w=x.ch
if(w!=null)w.V(0)
w=x.CW
if(w!=null)w.V(0)
w=x.cx
if(w!=null)w.V(0)
w=x.cy
if(w!=null)w.V(0)
w=x.d
w===$&&A.e()
w.iP()
w=x.e
w===$&&A.e()
w.GS()
x.a4()},
v9(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$v9=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.aa()
x=7
return A.d(l.AO(m.c),$async$v9)
case 7:r=e
q=B.a06(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mC(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.d(l.PX(),$async$v9)
case 8:p=e
o=B.c9d(p)
x=9
return A.d(s.Uv(),$async$v9)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mC(null)
x=1
break}m=s.d
m===$&&A.e()
k=s.a.d
x=10
return A.d(m.uj(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$v9)
case 10:m.f=new B.bbp(s)
m.r=new B.bbq(s)
m.w=new B.bbr(s)
if(s.c==null){x=1
break}s.n(new B.bbs(s))
s.ch=A.dg(C.c2,new B.bbt(s))
s.CW=A.iA(C.cj,new B.bbu(s))
m=s.e
m===$&&A.e()
k=m.r
s.cx=new A.c_(k,A.u(k).i("c_<1>")).cA(s.gaWh())
k=m.w
s.cy=new A.c_(k,A.u(k).i("c_<1>")).cA(new B.bbv())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.P6(C.c.Sh("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f7(C.ca,n,C.ai,!0))}s.ay=A.iA(C.fV,new B.bbw(s))
s.Et()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mC(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$v9,w)},
Uv(){var x=0,w=A.k(y.y),v
var $async$Uv=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Uv,w)},
Et(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Et=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.d(o.bY("/messagerie/appels/"+p.c+"/signaux"),$async$Et)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gL(p)
s.afi(B.bZ9(q))}u=2
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
return A.j($async$Et,w)},
afi(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c32(d.e)
if(v==null)return
x=s.d
x===$&&A.e()
x.Ai(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).az(new B.bby(s),y.a).fF(new B.bbz(s))
break
case"reponse":if(!s.a.f)return
u=B.c32(d.e)
if(u==null)return
x=s.d
x===$&&A.e()
x.OK(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).az(new B.bbA(s),y.a).fF(new B.bbB(s))
break
case"candidat_ice":t=B.cmM(d.e)
if(t==null)return
x=s.d
x===$&&A.e()
x.OF(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.e()
x.GM().az(new B.bbC(s),y.a).fF(new B.bbD(s))
break
case"refuse":s.mC(A.a("Appel refus\xe9"))
break
case"annule":s.mC(A.a("Appel annul\xe9"))
break
case"termine":s.mC(A.a("Appel termin\xe9"))
break}},
acm(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbx(w))},
yL(d,e,f){return this.aDW(d,e,f)},
a8N(d,e){return this.yL(d,e,!0)},
aDW(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yL=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.aa()
x=6
return A.d(r.aja(s.c,e,d),$async$yL)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yL,w)},
EZ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$EZ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.aa()
x=7
return A.d(q.a0k(r.c,"termine"),$async$EZ)
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
if(r!=null)A.a9(r,!1).br()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$EZ,w)},
mC(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.V(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.z(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.a9(x,!1).br()},
KN(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KN=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.e()
x=2
return A.d(t.Tv(u),$async$KN)
case 2:if(v.c!=null)v.n(new B.bbm(v,u))
return A.i(null,w)}})
return A.j($async$KN,w)},
KM(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.e()
x=2
return A.d(t.JK(u),$async$KM)
case 2:if(v.c!=null)v.n(new B.bbl(v,u))
return A.i(null,w)}})
return A.j($async$KM,w)},
KJ(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KJ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.e()
x=2
return A.d(t.Ts(u),$async$KJ)
case 2:if(v.c!=null)v.n(new B.bbk(v,u))
return A.i(null,w)}})
return A.j($async$KJ,w)},
KK(){var x=0,w=A.k(y.H),v=this,u
var $async$KK=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.e()
x=2
return A.d(u.ON(),$async$KK)
case 2:return A.i(null,w)}})
return A.j($async$KK,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.e()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bYD(o.e,!1,D.KL)
else{x=A.jT(C.r,q,A.c(B.an5(w.e),q,q,q,q,D.aq6,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.apK,q,q,q)
x=A.cB(A.I(A.b([x,C.p,w,C.k,A.c(r.w?B.bLo(r.ax):A.a(p),q,q,q,q,D.u5,q,q,q)],y.p),C.o,C.e,C.V),q,q)}x=A.Fz(0,x)
o=A.fx(q,A.eT(A.Q(12),B.bYD(o.d,!0,D.KL),C.ao),160,q,q,16,16,110)
w=r.w
v=B.bLo(r.ax)
u=r.z
t=r.Q
u=A.ey(C.b4,A.b([x,o,A.fx(24,B.c_r(r.as,v,w,!0,t,u,r.ga6u(),r.ga6t(),r.ga6v(),r.ga6w(),r.gacE()),q,q,0,0,q,q)],y.p),C.f,C.aY,q)
o=u}else{o=A.jT(C.r,q,A.c(B.an5(w.e),q,q,q,q,D.N3,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.MT,C.W,q,q)
if(r.w)w=B.bLo(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.u5,q,q,q)
v=r.w
u=B.bLo(r.ax)
t=r.z
s=r.Q
t=A.cB(A.I(A.b([o,C.ay,new A.Y(D.xU,x,q),C.k,w,D.Mc,B.c_r(r.as,u,v,!1,s,t,r.ga6u(),r.ga6t(),r.ga6v(),r.ga6w(),r.gacE())],y.p),C.o,C.e,C.V),q,q)
o=t}return A.bQp(!1,A.ex(q,C.n,A.fy(!0,o,!0,C.ak,!0,!0),q,q,q),new B.bbE(r),y.K)}}
B.abN.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.N7,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.ZM:D.ZL
t=A.b([new B.wE(x,r,A.a("Muet"),v.x,u,u),D.nU,new B.wE(D.ZS,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nU)
if(r){x=v.w
w=x?D.yJ:D.ZR
t.push(new B.wE(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nU)
if(r)t.push(new B.wE(D.ZQ,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nU)
t.push(new B.wE(D.yE,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.U(t,C.o,C.bk,C.i,u))
return A.I(s,C.o,C.e,C.V)}}
B.wE.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lC
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dj(u,v,v,C.ak,C.ci,v)
return A.I(A.b([A.ab(A.b5(!1,A.c1(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aX,A.c(w.e,v,v,v,v,C.N8,v,v,v)],y.p),C.o,C.e,C.V)}}
B.aQ4.prototype={
uj(d,e){return this.b8W(d,e)},
b8W(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$uj=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.d(o.io(0),$async$uj)
case 2:x=3
return A.d(v.e.io(0),$async$uj)
case 3:u=$.c4J()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.d(new B.aGe().CB(0,A.a6(["audio",!0,"video",t],s,r)),$async$uj)
case 4:q=v.b=g
o.sa4w(0,q)
x=5
return A.d(u.a_x(d,A.C(s,r)),$async$uj)
case 5:p=v.a=g
x=6
return A.d(p.kk(0,q),$async$uj)
case 6:p.e=new B.aQ5(v)
p.Q=new B.aQ6(v)
p.d=new B.aQ7(v)
return A.i(null,w)}})
return A.j($async$uj,w)},
aCl(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4w(0,d)
x=w.r
if(x!=null)x.$0()}},
GM(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.Pi(0),$async$GM)
case 3:t=e
x=4
return A.d(s.CO(0,t),$async$GM)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GM,w)},
Ai(d){return this.b0w(d)},
b0w(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ai=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.CQ(0,new B.At(d.h(0,"sdp"),d.h(0,"type"))),$async$Ai)
case 3:x=4
return A.d(s.Pg(0),$async$Ai)
case 4:t=f
x=5
return A.d(s.CO(0,t),$async$Ai)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ai,w)},
OK(d){return this.aYy(d)},
aYy(d){var x=0,w=A.k(y.H),v=this,u
var $async$OK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.d(u.CQ(0,new B.At(d.h(0,"sdp"),d.h(0,"type"))),$async$OK)
case 2:return A.i(null,w)}})
return A.j($async$OK,w)},
OF(d){return this.aYk(d)},
aYk(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.d(t.Ov(new B.FI(A.aP(d.h(0,"candidate")),A.aP(d.h(0,"sdpMid")),A.ef(d.h(0,"sdpMLineIndex")))),$async$OF)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OF,w)},
Tv(d){return this.apT(d)},
apT(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Tv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T3(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skp(0,t)
return A.i(null,w)}})
return A.j($async$Tv,w)},
JK(d){return this.apK(d)},
apK(d){var x=0,w=A.k(y.H)
var $async$JK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.d(B.aJ3(d),$async$JK)
case 2:return A.i(null,w)}})
return A.j($async$JK,w)},
Ts(d){return this.apC(d)},
apC(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ts=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jt(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skp(0,d)
return A.i(null,w)}})
return A.j($async$Ts,w)},
ON(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$ON=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jt(0)
if(s==null)s=D.aaZ
if(s.length===0){x=1
break}x=3
return A.d(B.bPF(C.b.gR(s)),$async$ON)
case 3:case 1:return A.i(v,w)}})
return A.j($async$ON,w)},
iP(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iP=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a3(0)
x=7
return A.d(y.x.b(q)?q:A.dh(q,y.H),$async$iP)
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
if(q==null)q=null
else{o=A.H(q.T3(0),!0,y.G)
C.b.t(o,q.Jt(0))
q=o}if(q==null)q=C.dn
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c7X(r)
if(!m.b(k)){j=new A.au($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.d(k,$async$iP)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.L)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.d(s.d.k(),$async$iP)
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
return A.d(s.e.k(),$async$iP)
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
return A.j($async$iP,w)}}
B.a1m.prototype={
P6(d){return this.aZS(d)},
aZS(d){var x=0,w=A.k(y.H),v=this
var $async$P6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.d(v.Dl(),$async$P6)
case 2:return A.i(null,w)}})
return A.j($async$P6,w)},
Dl(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dl=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.c82(B.bOK(A.cy(r,0,null),null))
s.b=q
x=7
return A.d(q.f.a,$async$Dl)
case 7:s.f=0
p=q.r.b
p===$&&A.e()
p=p.b
p===$&&A.e()
s.c=new A.cA(p,A.u(p).i("cA<1>")).aS(s.gaQU(),!0,s.gaQ0(),new B.asW(s))
u=2
x=6
break
case 4:u=3
n=t
s.Xp()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dl,w)},
aQV(d){var x,w,v,u
try{x=C.Y.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bZ9(w))}catch(u){}},
Xp(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7c[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.dg(A.d3(0,0,0,0,x),new B.asX(w))},
GS(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GS=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.d(y.x.b(s)?s:A.dh(s,y.H),$async$GS)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.e()
q=q.a
q===$&&A.e()
r!==$&&A.aW()
r=s.w=new B.akY(s,q)}s=r.a3(0)}x=7
return A.d(y._.b(s)?s:A.dh(s,y.z),$async$GS)
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
return A.j($async$GS,w)}}
B.aLa.prototype={
a_x(d,e){return this.b0m(d,e)},
b0m(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_x=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fu(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bP(t)))
t=J.l(s)
v=B.ce0(C.cx.gl9().bh(new A.eK(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_x,w)}}
B.mH.prototype={
T3(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.T(w).i("cI<1,av>"))
J.fL(w,new B.aGw(x))
return x},
Jt(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.T(w).i("cI<1,av>"))
J.fL(w,new B.aGx(x))
return x}}
B.a59.prototype={
awk(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aGt(x)))
w.addEventListener("mute",A.bF(new B.aGu(x)))
w.addEventListener("unmute",A.bF(new B.aGv(x)))},
skp(d,e){this.d.enabled=e},
aH(d){var x=0,w=A.k(y.H),v=this
var $async$aH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aH,w)}}
B.aGe.prototype={
CB(d,e){return this.aoK(0,e)},
aoK(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CB=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.coJ())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iH(e.h(0,"video"),"facingMode")
e.co(0,"video",new B.aGg())
e.co(0,"audio",new B.aGh())}catch(a0){A.nn("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fL(s,new B.aGi(r))
J.iH(e.h(0,"audio"),"optional")
J.ja(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bc(a0)
A.nn("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bP(e)
x=10
return A.d(A.dQ(o.getUserMedia(h.a(n)),h),$async$CB)
case 10:m=a2
i=m
h=i.id
v=new B.mH(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.d(A.dQ(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CB)
case 11:l=a2
h=l
g=h.id
v=new B.mH(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.N(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$CB,w)}}
B.a6O.prototype={
awp(d,e){var x=this,w=x.at
w===$&&A.e()
w.addEventListener("datachannel",A.bF(new B.aLd(x)))
w.addEventListener("icecandidate",A.bF(new B.aLe(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aLf(x)))
w.onicegatheringstatechange=A.bF(new B.aLg(x))
w.addEventListener("signalingstatechange",A.bF(new B.aLh(x)))
if(!$.bT5())w.addEventListener("connectionstatechange",A.bF(new B.aLi(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aLj(x)))
w.addEventListener("track",A.bF(new B.aLk(x)))},
Pi(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pi=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dQ(s.createOffer(y.m.a(A.bP(A.C(y.N,y.z)))),y.A),$async$Pi)
case 3:t=f
v=new B.At(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pi,w)},
Pg(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pg=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dQ(s.createAnswer(y.m.a(A.bP(A.C(y.N,y.z)))),y.A),$async$Pg)
case 3:t=f
v=new B.At(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pg,w)},
kk(d,e){var x
this.ax.co(0,e.a,new B.aLc(this,e))
x=this.at
x===$&&A.e()
x.addStream(e.e)
return A.cH(null,y.H)},
CO(d,e){return this.apO(0,e)},
apO(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dQ(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CO)
case 2:return A.i(null,w)}})
return A.j($async$CO,w)},
CQ(d,e){return this.aq3(0,e)},
aq3(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CQ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dQ(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CQ)
case 2:return A.i(null,w)}})
return A.j($async$CQ,w)},
Ov(d){return this.aY_(d)},
aY_(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ov=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.e()
u=d.b
u.toString
x=2
return A.d(A.dQ(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Ov)
case 2:return A.i(null,w)}})
return A.j($async$Ov,w)},
a3(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a3=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.e()
t.close()
v=A.cH(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a3,w)}}
B.bQv.prototype={
aH(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aH,w)}}
B.Pg.prototype={
salj(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hj()
if(x!=null)x.style.objectFit=e},
afr(){var x=this,w=x.Hj(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.aie(u,x.z!=null,0,t))},
sa4w(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jt(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.T(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T3(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.T(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aDL()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hj()
if(u!=null){u.srcObject=t.x
x=t.Hj()
x.toString
t.a6i(x)}t.sl(0,t.a.b_g(t.z!=null))},
aDL(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Hj(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].V(0)
q=u.Hj()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.en()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
io(d){var x=0,w=A.k(y.H),v=this
var $async$io=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CG()
$.oF().r4("RTCVideoRenderer-"+v.Q,new B.aLq(v),!0)
return A.i(null,w)}})
return A.j($async$io,w)},
a6i(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pi.prototype={
N(){return new B.Pj()}}
B.Pj.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a7(0,v.gaO5())
x=v.a
w=x.c
w.as=x.e
w.salj(0,x.d===D.KK?"contain":"cover")},
aO6(){if(this.c!=null)this.n(new B.aLr())},
k(){if(this.c!=null)this.a4()},
aT(d){var x,w
this.b8(d)
A.dg(A.d3(0,0,10,0,0),new B.aLt(this))
x=this.a
w=x.c
w.salj(0,x.d===D.KK?"contain":"cover")},
C(d){return new A.iW(new B.aLs(this),null)}}
B.a3E.prototype={
awb(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.UY(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("UY<0>"))
if(f.a.ghZ())f.a=new B.QL(g.i("@<0>").bV(g).i("QL<1,2>")).iJ(f.a)
w=A.fG(null,new B.azV(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
ac0(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.e()
w.a3(0)}}
B.UY.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d4(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aG9(d,e)},
hm(d){return this.d4(d,null)},
aG9(d,e){var x=this
if(x.w){x.a.a.d4(d,e)
return}x.c.fl(d,e)
x.ac1()
x.b.ac0()
x.a.a.a3(0).fF(new B.bgt())},
a3(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ac0()
x.c.ci(0,x.a.a.a3(0))}return x.c.a},
ac1(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.da(0)
return},
$idH:1}
B.a90.prototype={}
B.a91.prototype={}
B.xV.prototype={
a7t(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dq(d,e))
x.a3(0)},
a45(d){var x
if((this.b.b&4)!==0)throw A.n(B.bR7())
x=A.bP(d)
x.toString
this.a.send(x)},
w4(d,e,f){return this.aZD(0,e,f)},
aZD(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$w4=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bR7())
u.a3(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$w4,w)},
$ibR6:1}
B.te.prototype={}
B.GS.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GS&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.D0.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D0&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fQ(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dq.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dq&&e.a===this.a&&e.b===this.b},
gH(d){return A.fQ([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Hl.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Hk.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.ao6.prototype={
aw1(d){d.eD(new B.aoa(this),new B.aob(this),y.a)}}
B.akY.prototype={
a3(d){var x=this.b
x.e=x.d=null
return this.arI(0)}}
B.aa8.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vR.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pd.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vQ.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mT.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a6P.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aL9.prototype={}
B.NS.prototype={}
B.F2.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGd.prototype={}
B.FI.prototype={}
B.Pe.prototype={}
B.aLl.prototype={}
B.At.prototype={}
B.Pf.prototype={}
B.Ph.prototype={
aie(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Ph(x,w,v)},
b_g(d){return this.aie(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yA(F)","~(Gs)","bn(FI)","bn(Pf)","bn(mT)","~(@)","mH(@)","mH()","bn(bR6)","~(te)"])
B.aQH.prototype={
$0(){return J.c7g(this.a.bn())},
$S:1}
B.aQI.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bc(v)
this.b.d4(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.apU.prototype={
$1(d){if(d==null)return null
return A.c6(J.l(d))},
$S:133}
B.bbO.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F2(!0)},
$S:0}
B.bbP.prototype={
$1(d){return this.a.Ok()},
$S:34}
B.bbL.prototype={
$0(){var x=this.a.c
if(x!=null)A.a9(x,!1).br()},
$S:0}
B.bbM.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bbI.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbJ.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bbK.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbF.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bbG.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbH.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bWe(x.w,w,u,!1,v)},
$S:z+2}
B.bbN.prototype={
$0(){return this.a.aRa()},
$S:0}
B.bbp.prototype={
$1(d){this.a.yL("candidat_ice",d,!1)},
$S:390}
B.bbq.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bbo())},
$S:0}
B.bbo.prototype={
$0(){},
$S:0}
B.bbr.prototype={
$0(){this.a.mC(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bbs.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bbt.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yL("annule",C.e6,!1)
x.mC(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbu.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbn(x,w))},
$S:34}
B.bbn.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eL(this.b)},
$S:0}
B.bbv.prototype={
$1(d){},
$S:153}
B.bbw.prototype={
$1(d){this.a.Et()},
$S:34}
B.bby.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acm()
x.a8N("reponse",d)},
$S:391}
B.bbz.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbA.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acm()},
$S:29}
B.bbB.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbC.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8N("offre",d)},
$S:391}
B.bbD.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbx.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.bbm.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bbl.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bbk.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbE.prototype={
$2(d,e){if(!d)this.a.EZ()},
$S:969}
B.aQ5.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aQ6.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gR(x):null
if(w!=null)this.a.aCl(w)},
$S:z+5}
B.aQ7.prototype={
$1(d){var x
if(d===D.KB){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.asW.prototype={
$1(d){return this.a.Xp()},
$S:21}
B.asX.prototype={
$0(){var x=this.a
if(!x.e)x.Dl()},
$S:0}
B.bMi.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGw.prototype={
$1(d){return this.a.push(B.bPY(d))},
$S:21}
B.aGx.prototype={
$1(d){return this.a.push(B.bPY(d))},
$S:21}
B.aGt.prototype={
$1(d){},
$S:22}
B.aGu.prototype={
$1(d){},
$S:22}
B.aGv.prototype={
$1(d){},
$S:22}
B.aGg.prototype={
$0(){return!1},
$S:50}
B.aGh.prototype={
$0(){return!1},
$S:50}
B.aGi.prototype={
$1(d){J.fL(d,new B.aGf(this.a))},
$S:390}
B.aGf.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:47}
B.aLd.prototype={
$1(d){},
$S:22}
B.aLe.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FI(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aLf.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.e()
v=B.coj(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bT5())switch(w.cx.a){case 0:w.cy=D.KG
break
case 1:w.cy=D.KH
break
case 3:w.cy=D.KI
break
case 5:w.cy=D.KE
break
case 6:w.cy=D.KF
break
case 7:w.cy=D.rX
break
default:break}},
$S:30}
B.aLg.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.CW=B.cok(w.iceGatheringState)},
$S:30}
B.aLh.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.ch=B.cpR(w.signalingState)},
$S:30}
B.aLi.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.cy=B.cps(w.connectionState)},
$S:30}
B.aLj.prototype={
$1(d){},
$S:30}
B.aLk.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bPY(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.T(x).i("cI<1,av>"))
w=J.ez(x,new B.aLb(w),y.h)
v.$1(new B.Pf(A.H(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aLb.prototype={
$1(d){return new B.mH(d,d.id,this.a.as)},
$S:z+8}
B.aLc.prototype={
$0(){var x=this.b.e
return new B.mH(x,x.id,this.a.as)},
$S:z+9}
B.bMq.prototype={
$1(d){return J.fU(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aLq.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.L)(w),++u)w[u].V(0)
C.b.a_(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a6i(t)
v=y.i.c
w.push(A.hT(t,"canplay",new B.aLm(x),!1,v))
w.push(A.hT(t,"resize",new B.aLn(x),!1,v))
w.push(A.hT(t,"error",new B.aLo(t),!1,v))
w.push(A.hT(t,"ended",new B.aLp(),!1,v))
return t},
$S:130}
B.aLm.prototype={
$1(d){this.a.afr()},
$S:21}
B.aLn.prototype={
$1(d){this.a.afr()},
$S:21}
B.aLo.prototype={
$1(d){var x,w,v=this.a.error
A.nn("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.G2.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nX(x,C.G1.h(0,A.ao(v,"code")),w,null))},
$S:27}
B.aLp.prototype={
$1(d){},
$S:21}
B.aLr.prototype={
$0(){},
$S:0}
B.aLt.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLs.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a3U("RTCVideoRenderer-"+w.Q)
else w=A.P(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cB(A.P(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:970}
B.azV.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.e()
v.c=x.eR(w.ghl(w),new B.azU(v),w.gnA())},
$S:0}
B.azU.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.e()
w.ac1()
x=x.b
x===$&&A.e()
x.a3(0)},
$S:0}
B.bgt.prototype={
$1(d){},
$S:17}
B.arR.prototype={
$1(d){this.a.ci(0,this.b)},
$S:22}
B.arS.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fG(new B.Hl("Failed to connect WebSocket"))
else this.b.a7t(1006,"error")},
$S:22}
B.arT.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cz("data")
if(typeof x==="string")w.b=new B.GS(A.bz(x))
else if(typeof x==="object"&&A.bXg(y.m.a(x),"ArrayBuffer"))w.b=new B.D0(A.Oj(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bn())},
$S:27}
B.arU.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.ci(0,this.b)
this.b.a7t(d.code,d.reason)},
$S:22}
B.aoa.prototype={
$1(d){var x=d.b,w=this.a
new A.cA(x,A.u(x).i("cA<1>")).cA(new B.ao7(w))
x=w.r.a
x===$&&A.e()
x=x.b
x===$&&A.e()
new A.cA(x,A.u(x).i("cA<1>")).b62(new B.ao8(d),new B.ao9(w,d))
w.f.da(0)},
$S:z+10}
B.ao7.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GS
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,w)
break $label0$0}x=d instanceof B.D0
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,v)
break $label0$0}if(d instanceof B.Dq){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.a3(0)}}},
$S:z+11}
B.ao8.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bR7())
s=A.bP(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a45(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a45(new Uint8Array(A.cU(u)))
break $label1$1}t=A.aM("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.N(r) instanceof B.Hk))throw r}},
$S:18}
B.ao9.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.d(t.b.w4(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.Hk))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.aob.prototype={
$1(d){var x,w=d instanceof A.RJ?d:new B.aa8(J.l(d)),v=this.a
v.f.fG(w)
v=v.r.a
v===$&&A.e()
x=v.a
x===$&&A.e()
x.hm(w)
v=v.a
v===$&&A.e()
v.a3(0)},
$S:30};(function aliases(){var x=B.DO.prototype
x.arI=x.a3})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.U7.prototype,"gax2","Ku",0)
var v
w(v=B.U6.prototype,"gaWh","afi",3)
x(v,"gacE","EZ",0)
x(v,"ga6w","KN",0)
x(v,"ga6v","KM",0)
x(v,"ga6t","KJ",0)
x(v,"ga6u","KK",0)
w(v=B.a1m.prototype,"gaQU","aQV",7)
x(v,"gaQ0","Xp",1)
x(B.Pg.prototype,"gdI","k",0)
x(B.Pj.prototype,"gaO5","aO6",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DO,B.apT,B.Gs,B.a1A,B.aQ4,B.a1m,B.aL9,B.NS,B.F2,B.aGd,B.Pe,B.aLl,B.a91,B.UY,B.a90,B.xV,B.te,B.Hl,B.aa8,B.FI,B.At,B.Pf,B.Ph])
w(B.QL,A.fl)
x(A.jV,[B.aQH,B.bbO,B.bbL,B.bbM,B.bbI,B.bbJ,B.bbK,B.bbF,B.bbG,B.bbN,B.bbq,B.bbo,B.bbr,B.bbs,B.bbt,B.bbn,B.bbx,B.bbm,B.bbl,B.bbk,B.asX,B.aGg,B.aGh,B.aLc,B.aLr,B.aLt,B.azV,B.azU,B.ao9])
x(A.ir,[B.aQI,B.apU,B.bbP,B.bbH,B.bbp,B.bbu,B.bbv,B.bbw,B.bby,B.bbz,B.bbA,B.bbB,B.bbC,B.bbD,B.aQ5,B.aQ6,B.aQ7,B.asW,B.bMi,B.aGw,B.aGx,B.aGt,B.aGu,B.aGv,B.aGi,B.aLd,B.aLe,B.aLf,B.aLg,B.aLh,B.aLi,B.aLj,B.aLk,B.aLb,B.bMq,B.aLq,B.aLm,B.aLn,B.aLo,B.aLp,B.bgt,B.arR,B.arS,B.arT,B.arU,B.aoa,B.ao7,B.ao8,B.aob])
x(A.M,[B.p4,B.yA,B.Pi])
x(A.R,[B.U7,B.U6,B.Pj])
x(A.at,[B.SM,B.abN,B.wE])
x(A.qJ,[B.bbE,B.aGf,B.aLs])
w(B.aLa,B.aL9)
w(B.mH,B.NS)
w(B.a59,B.F2)
w(B.aGe,B.aGd)
w(B.a6O,B.Pe)
w(B.bQv,B.aLl)
w(B.Pg,A.d5)
x(B.a91,[B.a3E,B.ao6])
x(B.te,[B.GS,B.D0,B.Dq])
w(B.Hk,B.Hl)
w(B.akY,B.DO)
x(A.HO,[B.vR,B.Pd,B.vQ,B.mT,B.a6P])})()
A.ox(b.typeUniverse,JSON.parse('{"DO":{"dH":["1"]},"QL":{"fl":["1","2"],"fl.S":"1","fl.T":"2"},"yA":{"M":[],"m":[]},"p4":{"M":[],"m":[]},"U7":{"R":["p4"]},"SM":{"at":[],"m":[]},"U6":{"R":["yA"]},"abN":{"at":[],"m":[]},"wE":{"at":[],"m":[]},"mH":{"NS":[]},"a59":{"F2":[]},"a6O":{"Pe":[]},"Pg":{"d5":["Ph"],"aV":[]},"Pi":{"M":[],"m":[]},"Pj":{"R":["Pi"]},"UY":{"dH":["1"]},"xV":{"bR6":[]},"GS":{"te":[]},"D0":{"te":[]},"Dq":{"te":[]},"Hl":{"bM":[]},"Hk":{"bM":[]},"akY":{"dH":["@"]},"aa8":{"bM":[]}}'))
A.bRz(b.typeUniverse,JSON.parse('{"DO":1,"a91":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xV"),L:x("bM"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F2>"),d:x("D<iy<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("J<av>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NS"),G:x("F2"),h:x("mH"),o:x("ps"),a:x("bn"),K:x("a0"),J:x("Pe"),v:x("At"),Z:x("a90<a0?>"),N:x("o"),e:x("pX"),M:x("e0"),D:x("te"),U:x("W<o>"),g:x("ds<Gs>"),n:x("ds<~>"),V:x("aZ<xV>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Uh<av>"),C:x("oq<av>"),k:x("au<xV>"),c:x("au<@>"),W:x("au<~>"),q:x("kw"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Ub=new B.a1A(C.k6)
D.xU=new A.am(32,0,32,0)
D.yD=new A.ak(57638,!1)
D.yE=new A.ak(57639,!1)
D.ZL=new A.ak(58337,!1)
D.ZM=new A.ak(58341,!1)
D.ZQ=new A.ak(58923,!1)
D.yJ=new A.ak(59048,!1)
D.ZR=new A.ak(59049,!1)
D.ZS=new A.ak(59077,!1)
D.a7c=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.aaZ=A.b(x([]),y.Q)
D.Ge=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.aj1=new B.mT(0,"RTCIceConnectionStateNew")
D.aj2=new B.mT(1,"RTCIceConnectionStateChecking")
D.aj3=new B.mT(2,"RTCIceConnectionStateCompleted")
D.aj4=new B.mT(3,"RTCIceConnectionStateConnected")
D.aj5=new B.mT(4,"RTCIceConnectionStateCount")
D.KB=new B.mT(5,"RTCIceConnectionStateFailed")
D.aj6=new B.mT(6,"RTCIceConnectionStateDisconnected")
D.KC=new B.mT(7,"RTCIceConnectionStateClosed")
D.KD=new B.Pd(0,"RTCIceGatheringStateNew")
D.aj7=new B.Pd(1,"RTCIceGatheringStateGathering")
D.aj8=new B.Pd(2,"RTCIceGatheringStateComplete")
D.rX=new B.vQ(0,"RTCPeerConnectionStateClosed")
D.KE=new B.vQ(1,"RTCPeerConnectionStateFailed")
D.KF=new B.vQ(2,"RTCPeerConnectionStateDisconnected")
D.KG=new B.vQ(3,"RTCPeerConnectionStateNew")
D.KH=new B.vQ(4,"RTCPeerConnectionStateConnecting")
D.KI=new B.vQ(5,"RTCPeerConnectionStateConnected")
D.aj9=new B.vR(0,"RTCSignalingStateStable")
D.aja=new B.vR(1,"RTCSignalingStateHaveLocalOffer")
D.ajb=new B.vR(2,"RTCSignalingStateHaveRemoteOffer")
D.ajc=new B.vR(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajd=new B.vR(4,"RTCSignalingStateHaveRemotePrAnswer")
D.KJ=new B.vR(5,"RTCSignalingStateClosed")
D.aje=new B.Ph(0,0,0)
D.KK=new B.a6P(0,"RTCVideoViewObjectFitContain")
D.KL=new B.a6P(1,"RTCVideoViewObjectFitCover")
D.nU=new A.c5(20,null,null,null)
D.amJ=new A.c5(48,null,null,null)
D.Mc=new A.c5(null,64,null,null)
D.apK=new A.y(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.MT=new A.y(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aq6=new A.y(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.N3=new A.y(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.u5=new A.y(!0,C.aj,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c_i=!1
$.bYC=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cte","c4J",()=>new B.aLa())
x($,"cri","bT5",()=>C.c.q(A.ao(A.ao(A.ao(A.bSL(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"RlpSPx7Jyczlonzy3N/F53MewVk=");