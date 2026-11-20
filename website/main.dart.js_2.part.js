((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DS:function DS(){},QL:function QL(d){this.$ti=d},aQv:function aQv(d){this.a=d},aQw:function aQw(d,e){this.a=d
this.b=e},
a0j(d){var x,w,v,u,t,s=new B.aqf(),r=J.Q(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aM(r.h(d,"appele_id"))
A.aM(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.aqe(q,x,w,v,u,t)},
bZ0(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mg(t,y.N,y.z):C.e9
if(u.h(d,"cree_le")!=null)A.c1(J.l(u.h(d,"cree_le")))
return new B.Gw(s,x,w,v)},
c91(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Uo
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mg(s,u,t))}return new B.a1N(x)},
bLa(d){var x=C.h.aZ(d.a,1e6)
return C.c.b0(C.h.j(C.h.aZ(x,60)),2,"0")+":"+C.c.b0(C.h.j(C.h.aP(x,60)),2,"0")},
c2R(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oF(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.ahw(w,v)},
cmJ(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahz(u,A.jM(w)?w:null,v)},
aqe:function aqe(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aqf:function aqf(){},
Gw:function Gw(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1N:function a1N(d){this.a=d},
bW4(d,e,f,g,h,i){return new B.p6(e,f,i,h,d,null)},
bW3(d,e,f,g,h){return new B.yD(e,h,f,g,d,null)},
c_g(d,e,f,g,h,i,j,k,l,m,n){return new B.ac1(g,f,e,i,h,d,m,l,k,j,n,null)},
p6:function p6(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Ub:function Ub(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bbE:function bbE(d){this.a=d},
bbF:function bbF(d){this.a=d},
bbB:function bbB(d){this.a=d},
bbC:function bbC(d){this.a=d},
bby:function bby(d){this.a=d},
bbz:function bbz(d){this.a=d},
bbA:function bbA(d){this.a=d},
bbv:function bbv(d){this.a=d},
bbw:function bbw(d){this.a=d},
bbx:function bbx(d){this.a=d},
bbD:function bbD(d){this.a=d},
SQ:function SQ(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yD:function yD(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Ua:function Ua(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
bbe:function bbe(d){this.a=d},
bbf:function bbf(d){this.a=d},
bbd:function bbd(){},
bbg:function bbg(d){this.a=d},
bbh:function bbh(d){this.a=d},
bbi:function bbi(d){this.a=d},
bbj:function bbj(d){this.a=d},
bbc:function bbc(d,e){this.a=d
this.b=e},
bbk:function bbk(){},
bbl:function bbl(d){this.a=d},
bbo:function bbo(d){this.a=d},
bbp:function bbp(d){this.a=d},
bbq:function bbq(d){this.a=d},
bbr:function bbr(d){this.a=d},
bbs:function bbs(d){this.a=d},
bbt:function bbt(d){this.a=d},
bbm:function bbm(d){this.a=d},
bbn:function bbn(){},
bbb:function bbb(d,e){this.a=d
this.b=e},
bba:function bba(d,e){this.a=d
this.b=e},
bb9:function bb9(d,e){this.a=d
this.b=e},
bbu:function bbu(d){this.a=d},
ac1:function ac1(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wF:function wF(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aPS:function aPS(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aPT:function aPT(d){this.a=d},
aPU:function aPU(d){this.a=d},
aPV:function aPV(d){this.a=d},
a1z:function a1z(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
ath:function ath(d){this.a=d},
ati:function ati(d){this.a=d},
anr(d){var x=y.U,w=A.F(new A.W(A.b(d.split(" "),y.s),new B.bM3(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bM3:function bM3(){},
aKX:function aKX(){},
mK:function mK(d,e,f){this.e=d
this.a=e
this.b=f},
aGR:function aGR(d){this.a=d},
aGS:function aGS(d){this.a=d},
bPL(d){var x=new B.a5l(d)
x.awx(d)
return x},
a5l:function a5l(d){this.d=d},
aGO:function aGO(d){this.a=d},
aGP:function aGP(d){this.a=d},
aGQ:function aGQ(d){this.a=d},
aGA:function aGA(){},
aGC:function aGC(){},
aGD:function aGD(){},
aGE:function aGE(d){this.a=d},
aGB:function aGB(d){this.a=d},
cdV(d,e){var x=y.N
x=new B.a7_(d,e,A.C(x,y.E),A.C(x,y.z))
x.awC(d,e)
return x},
a7_:function a7_(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aL_:function aL_(d){this.a=d},
aL0:function aL0(d){this.a=d},
aL1:function aL1(d){this.a=d},
aL2:function aL2(d){this.a=d},
aL3:function aL3(d){this.a=d},
aL4:function aL4(d){this.a=d},
aL5:function aL5(d){this.a=d},
aL6:function aL6(d){this.a=d},
aKY:function aKY(d){this.a=d},
aKZ:function aKZ(d,e){this.a=d
this.b=e},
bQh:function bQh(d){this.a=d},
coH(){return C.b.n3(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bMb())!==-1},
bMb:function bMb(){},
bYr(){var x=A.b([],y.d),w=$.bYs
$.bYs=w+1
return new B.Pg(w,x,D.ajL,$.ad())},
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
aLc:function aLc(d){this.a=d},
aL8:function aL8(d){this.a=d},
aL9:function aL9(d){this.a=d},
aLa:function aLa(d){this.a=d},
aLb:function aLb(){},
bYt(d,e,f){return new B.Pi(d,f,e,null)},
Pi:function Pi(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pj:function Pj(){this.c=this.a=null},
aLd:function aLd(){},
aLf:function aLf(d){this.a=d},
aLe:function aLe(d){this.a=d},
bWE(d,e,f,g){var x,w={}
w.a=d
x=new B.a3P(g.i("a3P<0>"))
x.awo(e,f,w,g)
return x},
a3P:function a3P(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAg:function aAg(d,e){this.a=d
this.b=e},
aAf:function aAf(d){this.a=d},
V3:function V3(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgh:function bgh(){},
a9e:function a9e(d){this.b=this.a=$
this.$ti=d},
a9f:function a9f(){},
bOx(d,e){return B.c8j(d,e)},
c8j(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bOx=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o5("ws")&&!d.o5("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xX(r,A.fK(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.cj(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fI(new B.Ho("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.os(r,"open",!1,y.C).gS(0).av(new B.asc(p,q),y.H)
t=y.C
s=y.H
new A.os(r,"error",!1,t).gS(0).av(new B.asd(p,q),s)
A.hS(r,"message",new B.ase(q),!1,y.m)
new A.os(r,"close",!1,t).gS(0).av(new B.asf(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bOx,w)},
xX:function xX(d,e){this.a=d
this.b=e},
asc:function asc(d,e){this.a=d
this.b=e},
asd:function asd(d,e){this.a=d
this.b=e},
ase:function ase(d){this.a=d},
asf:function asf(d,e){this.a=d
this.b=e},
bQT(){return new B.Hn("Connection Closed")},
tg:function tg(){},
GV:function GV(d){this.a=d},
D5:function D5(d){this.a=d},
Dv:function Dv(d,e){this.a=d
this.b=e},
Ho:function Ho(d){this.a=d},
Hn:function Hn(d){this.a=d},
c7P(d){var x=null,w=$.aE,v=new B.a9e(y.Z),u=y.X,t=A.fK(x,x,x,!0,u),s=A.fK(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bWE(new A.cz(s,r.i("cz<1>")),new A.Ci(t,q.i("Ci<1>")),!0,u)
v.b=B.bWE(new A.cz(t,q.i("cz<1>")),new A.Ci(s,r.i("Ci<1>")),!1,u)
v=new B.aot(new A.aZ(new A.au(w,y.W),y.R),v)
v.awe(d)
return v},
aot:function aot(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
aox:function aox(d){this.a=d},
aou:function aou(d){this.a=d},
aov:function aov(d){this.a=d},
aow:function aow(d,e){this.a=d
this.b=e},
aoy:function aoy(d){this.a=d},
alh:function alh(d,e){this.b=d
this.a=e},
aan:function aan(d){this.a=d},
coh(d){switch(d){case"new":return D.ajy
case"checking":return D.ajz
case"connected":return D.ajB
case"completed":return D.ajA
case"failed":return D.KO
case"disconnected":return D.ajD
case"closed":return D.KP
case"count":return D.ajC}return D.KP},
coi(d){switch(d){case"new":return D.KQ
case"gathering":return D.ajE
case"complete":return D.ajF}return D.KQ},
cpO(d){switch(d){case"stable":return D.ajG
case"have-local-offer":return D.ajH
case"have-local-pranswer":return D.ajJ
case"have-remote-offer":return D.ajI
case"have-remote-pranswer":return D.ajK
case"closed":return D.KW}return D.KW},
cpt(d){switch(d){case"new":return D.KT
case"connecting":return D.KU
case"connected":return D.KV
case"closed":return D.t0
case"disconnected":return D.KS
case"failed":return D.KR}return D.t0},
vR:function vR(d,e){this.a=d
this.b=e},
Pd:function Pd(d,e){this.a=d
this.b=e},
vQ:function vQ(d,e){this.a=d
this.b=e},
mW:function mW(d,e){this.a=d
this.b=e},
a70:function a70(d,e){this.a=d
this.b=e},
aKW:function aKW(){},
NU:function NU(){},
F8:function F8(){},
aGz:function aGz(){},
FM:function FM(d,e,f){this.a=d
this.b=e
this.c=f},
Pe:function Pe(){},
aL7:function aL7(){},
Ax:function Ax(d,e){this.a=d
this.b=e},
Pf:function Pf(d){this.b=d},
Ph:function Ph(d,e,f){this.a=d
this.b=e
this.c=f},
bPs(d){var x=0,w=A.k(y.y)
var $async$bPs=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bPs,w)},
aIP(d){var x=0,w=A.k(y.H),v
var $async$aIP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aUP("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aIP)
case 2:return A.i(null,w)}})
return A.j($async$aIP,w)},
aUP(d,e,f,g){return B.cgC(d,e,f,g,f.i("0?"))},
cgC(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUP=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aUO(),$async$aUP)
case 3:v=D.Gs.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUP,w)},
aUO(){var x=0,w=A.k(y.H),v,u
var $async$aUO=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c_7?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Gs.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aUO)
case 4:$.c_7=!0
case 3:return A.i(null,w)}})
return A.j($async$aUO,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[28]
E=c[18]
B.DS.prototype={
D(d,e){this.a.D(0,e)},
d6(d,e){this.a.d6(d,e)},
a5(d){return this.a.a5(0)},
$idH:1}
B.QL.prototype={
iO(d){var x=A.cy("subscription"),w=A.fK(new B.aQv(x),null,null,!0,this.$ti.y[1])
x.b=d.eU(new B.aQw(this,w),w.gm_(w),w.gnF())
return new A.cz(w,A.u(w).i("cz<1>"))}}
B.aqe.prototype={}
B.Gw.prototype={}
B.a1N.prototype={}
B.p6.prototype={
N(){return new B.Ub()}}
B.Ub.prototype={
U(){var x=this
x.W()
x.KG()
x.r=A.di(C.c2,new B.bbE(x))
x.w=A.iC(C.xL,new B.bbF(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a2()},
XD(){var x=this.x
if(x!=null)x.V(0)
this.x=A.di(C.fS,new B.bbB(this))},
Ol(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Ol=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.AP(p.c),$async$Ol)
case 7:r=e
q=B.a0j(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbC(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.XD()}u=2
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
return A.j($async$Ol,w)},
KG(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$KG=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.aa()
x=7
return A.e(n.AP(o.c),$async$KG)
case 7:r=e
q=B.a0j(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gale()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bby(s))
s.XD()
x=1
break}s.n(new B.bbz(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bbA(s))
s.XD()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KG,w)},
Kw(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Kw=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.bbv(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.e(p.PR(q.c,"accepte"),$async$Kw)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.n(new B.bbw(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.C(A.z(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
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
A.a9(q,!1).xn(A.e4(new B.bbx(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Kw,w)},
F3(d){return this.aRk(d)},
aRj(){return this.F3(!1)},
aRk(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F3=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.PR(r.c,"refuse"),$async$F3)
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
if(r!=null)A.a9(r,!1).bt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F3,w)},
B(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jU(C.t,s,A.c(B.anr(r.d),s,s,s,s,D.Ne,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.N6,C.W,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.ay,new A.Z(D.y8,x,s),C.l,A.c(q,s,s,s,s,D.ua,s,s,s),D.Ms],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbD(t)
v=A.a("Accepter")
u=t.f?s:t.gaxf()
q.push(A.U(A.b([new B.SQ(D.yQ,C.aB,r,x,s),D.anf,new B.SQ(D.qe,C.cy,v,u,s)],w),C.o,C.bn,C.i,s))}if(t.d)q.push(C.wp)
return A.ez(s,C.n,A.fl(!0,A.cA(A.H(q,C.o,C.e,C.V),s,s),!0,C.ai,!0,!0),s,s,s)}}
B.SQ.prototype={
B(d){var x=this,w=null,v=A.d5(x.d,w,w,C.ai,C.cO,w)
return A.H(A.b([A.ac(A.b5(!1,A.c2(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dT,w,w,w)],y.p),C.o,C.e,C.V)}}
B.yD.prototype={
N(){return new B.Ua(A.b0(y.N),C.Q)}}
B.Ua.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bYr()
w=B.bYr()
v.d!==$&&A.bi()
v.d=new B.aPS(x,w)
v.a.toString
x=new B.a1z(new A.ds(u,u,y.g),new A.ds(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.va()},
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
w===$&&A.d()
w.iT()
w=x.e
w===$&&A.d()
w.GS()
x.a2()},
va(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$va=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.aa()
x=7
return A.e(l.AP(m.c),$async$va)
case 7:r=e
q=B.a0j(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mB(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.PZ(),$async$va)
case 8:p=e
o=B.c91(p)
x=9
return A.e(s.UB(),$async$va)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.C(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mB(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.uo(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$va)
case 10:m.f=new B.bbe(s)
m.r=new B.bbf(s)
m.w=new B.bbg(s)
if(s.c==null){x=1
break}s.n(new B.bbh(s))
s.ch=A.di(C.c2,new B.bbi(s))
s.CW=A.iC(C.cj,new B.bbj(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.c_(k,A.u(k).i("c_<1>")).cA(s.gaWu())
k=m.w
s.cy=new A.c_(k,A.u(k).i("c_<1>")).cA(new B.bbk())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.P8(C.c.Sk("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f6(C.c9,n,C.aj,!0))}s.ay=A.iC(C.fS,new B.bbl(s))
s.Eu()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.C(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mB(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$va,w)},
UB(){var x=0,w=A.k(y.y),v
var $async$UB=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$UB,w)},
Eu(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Eu=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.bW("/messagerie/appels/"+p.c+"/signaux"),$async$Eu)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gL(p)
s.afp(B.bZ0(q))}u=2
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
return A.j($async$Eu,w)},
afp(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c2R(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Ak(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).av(new B.bbo(s),y.a).fo(new B.bbp(s))
break
case"reponse":if(!s.a.f)return
u=B.c2R(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.OM(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).av(new B.bbq(s),y.a).fo(new B.bbr(s))
break
case"candidat_ice":t=B.cmJ(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.OH(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.GM().av(new B.bbs(s),y.a).fo(new B.bbt(s))
break
case"refuse":s.mB(A.a("Appel refus\xe9"))
break
case"annule":s.mB(A.a("Appel annul\xe9"))
break
case"termine":s.mB(A.a("Appel termin\xe9"))
break}},
acp(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbm(w))},
yM(d,e,f){return this.aE7(d,e,f)},
a8Q(d,e){return this.yM(d,e,!0)},
aE7(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yM=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.aa()
x=6
return A.e(r.ajh(s.c,e,d),$async$yM)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mB(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yM,w)},
F_(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F_=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.aa()
x=7
return A.e(q.PR(r.c,"termine"),$async$F_)
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
if(r!=null)A.a9(r,!1).bt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F_,w)},
mB(d){var x,w,v=this,u=null
if(v.x)return
v.x=!0
x=v.ch
if(x!=null)x.V(0)
x=v.a
x.toString
w=$.aa()
w.PR(x.c,"termine").fo(new B.bbn())
if(d!=null&&v.c!=null)v.c.u(y.q).f.C(A.z(u,u,u,u,u,C.f,u,A.c(d,u,u,u,u,u,u,u,u),u,C.m,u,u,u,u,u,u,u,u,u))
x=v.c
if(x!=null)A.a9(x,!1).bt()},
KP(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ty(u),$async$KP)
case 2:if(v.c!=null)v.n(new B.bbb(v,u))
return A.i(null,w)}})
return A.j($async$KP,w)},
KO(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KO=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.JN(u),$async$KO)
case 2:if(v.c!=null)v.n(new B.bba(v,u))
return A.i(null,w)}})
return A.j($async$KO,w)},
KL(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KL=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Tv(u),$async$KL)
case 2:if(v.c!=null)v.n(new B.bb9(v,u))
return A.i(null,w)}})
return A.j($async$KL,w)},
KM(){var x=0,w=A.k(y.H),v=this,u
var $async$KM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.OP(),$async$KM)
case 2:return A.i(null,w)}})
return A.j($async$KM,w)},
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bYt(o.e,!1,D.KY)
else{x=A.jU(C.t,q,A.c(B.anr(w.e),q,q,q,q,D.aqL,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aqm,q,q,q)
x=A.cA(A.H(A.b([x,C.p,w,C.l,A.c(r.w?B.bLa(r.ax):A.a(p),q,q,q,q,D.ua,q,q,q)],y.p),C.o,C.e,C.V),q,q)}x=A.OZ(0,x)
o=A.fx(q,A.f0(A.P(12),B.bYt(o.d,!0,D.KY),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bLa(r.ax)
u=r.z
t=r.Q
u=A.eA(C.b5,A.b([x,o,A.fx(24,B.c_g(r.as,v,w,!0,t,u,r.ga6x(),r.ga6w(),r.ga6y(),r.ga6z(),r.gacJ()),q,q,0,0,q,q)],y.p),C.f,C.b1,q)
o=u}else{o=A.jU(C.t,q,A.c(B.anr(w.e),q,q,q,q,D.Ne,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.N6,C.W,q,q)
if(r.w)w=B.bLa(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.ua,q,q,q)
v=r.w
u=B.bLa(r.ax)
t=r.z
s=r.Q
t=A.cA(A.H(A.b([o,C.ay,new A.Z(D.y8,x,q),C.l,w,D.Ms,B.c_g(r.as,u,v,!1,s,t,r.ga6x(),r.ga6w(),r.ga6y(),r.ga6z(),r.gacJ())],y.p),C.o,C.e,C.V),q,q)
o=t}return A.bQb(!1,A.ez(q,C.n,A.fl(!0,o,!0,C.ai,!0,!0),q,q,q),new B.bbu(r),y.K)}}
B.ac1.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nh,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_4:D.a_3
t=A.b([new B.wF(x,r,A.a("Muet"),v.x,u,u),D.nQ,new B.wF(D.a_a,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nQ)
if(r){x=v.w
w=x?D.yW:D.a_9
t.push(new B.wF(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nQ)
if(r)t.push(new B.wF(D.a_8,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nQ)
t.push(new B.wF(D.yQ,!1,A.a("Raccrocher"),v.as,C.aB,u))
s.push(A.U(t,C.o,C.bn,C.i,u))
return A.H(s,C.o,C.e,C.V)}}
B.wF.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lG
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d5(u,v,v,C.ai,C.cO,v)
return A.H(A.b([A.ac(A.b5(!1,A.c2(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aV,A.c(w.e,v,v,v,v,C.Ni,v,v,v)],y.p),C.o,C.e,C.V)}}
B.aPS.prototype={
uo(d,e){return this.b9d(d,e)},
b9d(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$uo=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.is(0),$async$uo)
case 2:x=3
return A.e(v.e.is(0),$async$uo)
case 3:u=$.c4w()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aGA().CB(0,A.a6(["audio",!0,"video",t],s,r)),$async$uo)
case 4:q=v.b=g
o.sa4C(0,q)
x=5
return A.e(u.a_C(d,A.C(s,r)),$async$uo)
case 5:p=v.a=g
x=6
return A.e(p.kj(0,q),$async$uo)
case 6:p.e=new B.aPT(v)
p.Q=new B.aPU(v)
p.d=new B.aPV(v)
return A.i(null,w)}})
return A.j($async$uo,w)},
aCx(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4C(0,d)
x=w.r
if(x!=null)x.$0()}},
GM(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Pj(0),$async$GM)
case 3:t=e
x=4
return A.e(s.CO(0,t),$async$GM)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GM,w)},
Ak(d){return this.b0O(d)},
b0O(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ak=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.CQ(0,new B.Ax(d.h(0,"sdp"),d.h(0,"type"))),$async$Ak)
case 3:x=4
return A.e(s.Ph(0),$async$Ak)
case 4:t=f
x=5
return A.e(s.CO(0,t),$async$Ak)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ak,w)},
OM(d){return this.aYO(d)},
aYO(d){var x=0,w=A.k(y.H),v=this,u
var $async$OM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.CQ(0,new B.Ax(d.h(0,"sdp"),d.h(0,"type"))),$async$OM)
case 2:return A.i(null,w)}})
return A.j($async$OM,w)},
OH(d){return this.aYA(d)},
aYA(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Ow(new B.FM(A.aM(d.h(0,"candidate")),A.aM(d.h(0,"sdpMid")),A.eh(d.h(0,"sdpMLineIndex")))),$async$OH)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OH,w)},
Ty(d){return this.aq3(d)},
aq3(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Ty=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T6(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.M)(r),++s)r[s].sko(0,t)
return A.i(null,w)}})
return A.j($async$Ty,w)},
JN(d){return this.apV(d)},
apV(d){var x=0,w=A.k(y.H)
var $async$JN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aIP(d),$async$JN)
case 2:return A.i(null,w)}})
return A.j($async$JN,w)},
Tv(d){return this.apN(d)},
apN(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Tv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jw(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.M)(s),++t)s[t].sko(0,d)
return A.i(null,w)}})
return A.j($async$Tv,w)},
OP(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jw(0)
if(s==null)s=D.abs
if(s.length===0){x=1
break}x=3
return A.e(B.bPs(C.b.gS(s)),$async$OP)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OP,w)},
iT(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iT=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a5(0)
x=7
return A.e(y.x.b(q)?q:A.dj(q,y.H),$async$iT)
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
else{o=A.F(q.T6(0),!0,y.G)
C.b.t(o,q.Jw(0))
q=o}if(q==null)q=C.dn
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c7J(r)
if(!m.b(k)){j=new A.au($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$iT)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.M)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.k(),$async$iT)
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
return A.e(s.e.k(),$async$iT)
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
return A.j($async$iT,w)}}
B.a1z.prototype={
P8(d){return this.b_7(d)},
b_7(d){var x=0,w=A.k(y.H),v=this
var $async$P8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Dk(),$async$P8)
case 2:return A.i(null,w)}})
return A.j($async$P8,w)},
Dk(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dk=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.c7P(B.bOx(A.cx(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Dk)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cz(p,A.u(p).i("cz<1>")).aT(s.gaR2(),!0,s.gaQa(),new B.ath(s))
u=2
x=6
break
case 4:u=3
n=t
s.Xu()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dk,w)},
aR3(d){var x,w,v,u
try{x=C.Y.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bZ0(w))}catch(u){}},
Xu(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7H[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.di(A.d1(0,0,0,0,x),new B.ati(w))},
GS(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GS=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.e(y.x.b(s)?s:A.dj(s,y.H),$async$GS)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.aX()
r=s.w=new B.alh(s,q)}s=r.a5(0)}x=7
return A.e(y._.b(s)?s:A.dj(s,y.z),$async$GS)
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
B.aKX.prototype={
a_C(d,e){return this.b0E(d,e)},
b0E(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_C=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fC(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.cdV(C.cw.gld().bi(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_C,w)}}
B.mK.prototype={
T6(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.T(w).i("cI<1,aw>"))
J.fR(w,new B.aGR(x))
return x},
Jw(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.T(w).i("cI<1,aw>"))
J.fR(w,new B.aGS(x))
return x}}
B.a5l.prototype={
awx(d){var x=this,w=x.d
w.addEventListener("ended",A.bE(new B.aGO(x)))
w.addEventListener("mute",A.bE(new B.aGP(x)))
w.addEventListener("unmute",A.bE(new B.aGQ(x)))},
sko(d,e){this.d.enabled=e},
aF(d){var x=0,w=A.k(y.H),v=this
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aF,w)}}
B.aGA.prototype={
CB(d,e){return this.aoV(0,e)},
aoV(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CB=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.coH())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iJ(e.h(0,"video"),"facingMode")
e.cp(0,"video",new B.aGC())
e.cp(0,"audio",new B.aGD())}catch(a0){A.no("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hP(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fR(s,new B.aGE(r))
J.iJ(e.h(0,"audio"),"optional")
J.j9(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bc(a0)
A.no("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bR(e)
x=10
return A.e(A.dS(o.getUserMedia(h.a(n)),h),$async$CB)
case 10:m=a2
i=m
h=i.id
v=new B.mK(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.dS(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CB)
case 11:l=a2
h=l
g=h.id
v=new B.mK(h,g,"local")
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
B.a7_.prototype={
awC(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bE(new B.aL_(x)))
w.addEventListener("icecandidate",A.bE(new B.aL0(x)))
w.addEventListener("iceconnectionstatechange",A.bE(new B.aL1(x)))
w.onicegatheringstatechange=A.bE(new B.aL2(x))
w.addEventListener("signalingstatechange",A.bE(new B.aL3(x)))
if(!$.bSW())w.addEventListener("connectionstatechange",A.bE(new B.aL4(x)))
w.addEventListener("negotiationneeded",A.bE(new B.aL5(x)))
w.addEventListener("track",A.bE(new B.aL6(x)))},
Pj(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dS(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$Pj)
case 3:t=f
v=new B.Ax(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pj,w)},
Ph(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Ph=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dS(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$Ph)
case 3:t=f
v=new B.Ax(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ph,w)},
kj(d,e){var x
this.ax.cp(0,e.a,new B.aKZ(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cG(null,y.H)},
CO(d,e){return this.apZ(0,e)},
apZ(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dS(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CO)
case 2:return A.i(null,w)}})
return A.j($async$CO,w)},
CQ(d,e){return this.aqe(0,e)},
aqe(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CQ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dS(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CQ)
case 2:return A.i(null,w)}})
return A.j($async$CQ,w)},
Ow(d){return this.aYf(d)},
aYf(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ow=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.dS(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Ow)
case 2:return A.i(null,w)}})
return A.j($async$Ow,w)},
a5(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cG(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5,w)}}
B.bQh.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.Pg.prototype={
salu(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hl()
if(x!=null)x.style.objectFit=e},
afw(){var x=this,w=x.Hl(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.aim(u,x.z!=null,0,t))},
sa4C(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jw(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.T(x).i("cI<1,aw>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T6(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.T(x).i("cI<1,aw>")))
for(;x.A();){w=x.gL(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aDW()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hl()
if(u!=null){u.srcObject=t.x
x=t.Hl()
x.toString
t.a6m(x)}t.sm(0,t.a.b_w(t.z!=null))},
aDW(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Hl(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.M)(t),++r)t[r].V(0)
q=u.Hl()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.ep()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
is(d){var x=0,w=A.k(y.H),v=this
var $async$is=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CK()
$.oH().r6("RTCVideoRenderer-"+v.Q,new B.aLc(v),!0)
return A.i(null,w)}})
return A.j($async$is,w)},
a6m(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pi.prototype={
N(){return new B.Pj()}}
B.Pj.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a8(0,v.gaOg())
x=v.a
w=x.c
w.as=x.e
w.salu(0,x.d===D.KX?"contain":"cover")},
aOh(){if(this.c!=null)this.n(new B.aLd())},
k(){if(this.c!=null)this.a2()},
aS(d){var x,w
this.b6(d)
A.di(A.d1(0,0,10,0,0),new B.aLf(this))
x=this.a
w=x.c
w.salu(0,x.d===D.KX?"contain":"cover")},
B(d){return new A.i5(new B.aLe(this),null)}}
B.a3P.prototype={
awo(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bi()
x.a=new B.V3(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("V3<0>"))
if(f.a.gi2())f.a=new B.QL(g.i("@<0>").bV(g).i("QL<1,2>")).iO(f.a)
w=A.fK(null,new B.aAg(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
ac3(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.d()
w.a5(0)}}
B.V3.prototype={
D(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d6(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.aGk(d,e)},
hp(d){return this.d6(d,null)},
aGk(d,e){var x=this
if(x.w){x.a.a.d6(d,e)
return}x.c.fp(d,e)
x.ac4()
x.b.ac3()
x.a.a.a5(0).fo(new B.bgh())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ac3()
x.c.cj(0,x.a.a.a5(0))}return x.c.a},
ac4(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dd(0)
return},
$idH:1}
B.a9e.prototype={}
B.a9f.prototype={}
B.xX.prototype={
a7w(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dv(d,e))
x.a5(0)},
a4b(d){var x
if((this.b.b&4)!==0)throw A.n(B.bQT())
x=A.bR(d)
x.toString
this.a.send(x)},
w4(d,e,f){return this.aZT(0,e,f)},
aZT(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$w4=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bQT())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$w4,w)},
$ibQS:1}
B.tg.prototype={}
B.GV.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.GV&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.D5.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D5&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fX(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dv.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Dv&&e.a===this.a&&e.b===this.b},
gH(d){return A.fX([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Ho.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Hn.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.aot.prototype={
awe(d){d.eG(new B.aox(this),new B.aoy(this),y.a)}}
B.alh.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arT(0)}}
B.aan.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vR.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pd.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vQ.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mW.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a70.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aKW.prototype={}
B.NU.prototype={}
B.F8.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGz.prototype={}
B.FM.prototype={}
B.Pe.prototype={}
B.aL7.prototype={}
B.Ax.prototype={}
B.Pf.prototype={}
B.Ph.prototype={
aim(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Ph(x,w,v)},
b_w(d){return this.aim(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yD(E)","~(Gw)","bm(FM)","bm(Pf)","bm(mW)","~(@)","mK(@)","mK()","bm(bQS)","~(tg)"])
B.aQv.prototype={
$0(){return J.c73(this.a.bo())},
$S:1}
B.aQw.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bc(v)
this.b.d6(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqf.prototype={
$1(d){if(d==null)return null
return A.c1(J.l(d))},
$S:133}
B.bbE.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F3(!0)},
$S:0}
B.bbF.prototype={
$1(d){return this.a.Ol()},
$S:33}
B.bbB.prototype={
$0(){var x=this.a.c
if(x!=null)A.a9(x,!1).bt()},
$S:0}
B.bbC.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bby.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbz.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bbA.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbv.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bbw.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbx.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bW3(x.w,w,u,!1,v)},
$S:z+2}
B.bbD.prototype={
$0(){return this.a.aRj()},
$S:0}
B.bbe.prototype={
$1(d){this.a.yM("candidat_ice",d,!1)},
$S:384}
B.bbf.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bbd())},
$S:0}
B.bbd.prototype={
$0(){},
$S:0}
B.bbg.prototype={
$0(){this.a.mB(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bbh.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bbi.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yM("annule",C.e9,!1)
x.mB(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbj.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbc(x,w))},
$S:33}
B.bbc.prototype={
$0(){return this.a.ax=new A.av(Date.now(),0,!1).eq(this.b)},
$S:0}
B.bbk.prototype={
$1(d){},
$S:150}
B.bbl.prototype={
$1(d){this.a.Eu()},
$S:33}
B.bbo.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acp()
x.a8Q("reponse",d)},
$S:385}
B.bbp.prototype={
$1(d){this.a.mB(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbq.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acp()},
$S:29}
B.bbr.prototype={
$1(d){this.a.mB(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbs.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8Q("offre",d)},
$S:385}
B.bbt.prototype={
$1(d){this.a.mB(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbm.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.av(Date.now(),0,!1)
x.ax=C.Q},
$S:0}
B.bbn.prototype={
$1(d){return A.C(y.N,y.z)},
$S:136}
B.bbb.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bba.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bb9.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbu.prototype={
$2(d,e){if(!d)this.a.F_()},
$S:975}
B.aPT.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aPU.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aCx(w)},
$S:z+5}
B.aPV.prototype={
$1(d){var x
if(d===D.KO){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.ath.prototype={
$1(d){return this.a.Xu()},
$S:21}
B.ati.prototype={
$0(){var x=this.a
if(!x.e)x.Dk()},
$S:0}
B.bM3.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGR.prototype={
$1(d){return this.a.push(B.bPL(d))},
$S:21}
B.aGS.prototype={
$1(d){return this.a.push(B.bPL(d))},
$S:21}
B.aGO.prototype={
$1(d){},
$S:22}
B.aGP.prototype={
$1(d){},
$S:22}
B.aGQ.prototype={
$1(d){},
$S:22}
B.aGC.prototype={
$0(){return!1},
$S:48}
B.aGD.prototype={
$0(){return!1},
$S:48}
B.aGE.prototype={
$1(d){J.fR(d,new B.aGB(this.a))},
$S:384}
B.aGB.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:47}
B.aL_.prototype={
$1(d){},
$S:22}
B.aL0.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FM(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aL1.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.coh(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bSW())switch(w.cx.a){case 0:w.cy=D.KT
break
case 1:w.cy=D.KU
break
case 3:w.cy=D.KV
break
case 5:w.cy=D.KR
break
case 6:w.cy=D.KS
break
case 7:w.cy=D.t0
break
default:break}},
$S:30}
B.aL2.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.coi(w.iceGatheringState)},
$S:30}
B.aL3.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cpO(w.signalingState)},
$S:30}
B.aL4.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cpt(w.connectionState)},
$S:30}
B.aL5.prototype={
$1(d){},
$S:30}
B.aL6.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bPL(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.T(x).i("cI<1,aw>"))
w=J.ew(x,new B.aKY(w),y.h)
v.$1(new B.Pf(A.F(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aKY.prototype={
$1(d){return new B.mK(d,d.id,this.a.as)},
$S:z+8}
B.aKZ.prototype={
$0(){var x=this.b.e
return new B.mK(x,x.id,this.a.as)},
$S:z+9}
B.bMb.prototype={
$1(d){return J.fQ(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aLc.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.M)(w),++u)w[u].V(0)
C.b.a_(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a6m(t)
v=y.i.c
w.push(A.hS(t,"canplay",new B.aL8(x),!1,v))
w.push(A.hS(t,"resize",new B.aL9(x),!1,v))
w.push(A.hS(t,"error",new B.aLa(t),!1,v))
w.push(A.hS(t,"ended",new B.aLb(),!1,v))
return t},
$S:151}
B.aL8.prototype={
$1(d){this.a.afw()},
$S:21}
B.aL9.prototype={
$1(d){this.a.afw()},
$S:21}
B.aLa.prototype={
$1(d){var x,w,v=this.a.error
A.no("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gg.h(0,A.an(v,"code"))
x.toString
w=!J.q(A.an(v,"message"),"")?A.an(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nY(x,C.Gf.h(0,A.an(v,"code")),w,null))},
$S:27}
B.aLb.prototype={
$1(d){},
$S:21}
B.aLd.prototype={
$0(){},
$S:0}
B.aLf.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLe.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a44("RTCVideoRenderer-"+w.Q)
else w=A.O(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cA(A.O(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:976}
B.aAg.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eU(w.gho(w),new B.aAf(v),w.gnF())},
$S:0}
B.aAf.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.ac4()
x=x.b
x===$&&A.d()
x.a5(0)},
$S:0}
B.bgh.prototype={
$1(d){},
$S:17}
B.asc.prototype={
$1(d){this.a.cj(0,this.b)},
$S:22}
B.asd.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fI(new B.Ho("Failed to connect WebSocket"))
else this.b.a7w(1006,"error")},
$S:22}
B.ase.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cy("data")
if(typeof x==="string")w.b=new B.GV(A.bx(x))
else if(typeof x==="object"&&A.bX6(y.m.a(x),"ArrayBuffer"))w.b=new B.D5(A.Oj(y.o.a(x),0,null))
else throw A.n(A.am("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bo())},
$S:27}
B.asf.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cj(0,this.b)
this.b.a7w(d.code,d.reason)},
$S:22}
B.aox.prototype={
$1(d){var x=d.b,w=this.a
new A.cz(x,A.u(x).i("cz<1>")).cA(new B.aou(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cz(x,A.u(x).i("cz<1>")).b6k(new B.aov(d),new B.aow(w,d))
w.f.dd(0)},
$S:z+10}
B.aou.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GV
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.D5
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.Dv){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a5(0)}}},
$S:z+11}
B.aov.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bQT())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4b(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4b(new Uint8Array(A.cU(u)))
break $label1$1}t=A.aN("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.N(r) instanceof B.Hn))throw r}},
$S:18}
B.aow.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.w4(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.Hn))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.aoy.prototype={
$1(d){var x,w=d instanceof A.RM?d:new B.aan(J.l(d)),v=this.a
v.f.fI(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hp(w)
v=v.a
v===$&&A.d()
v.a5(0)},
$S:30};(function aliases(){var x=B.DS.prototype
x.arT=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ub.prototype,"gaxf","Kw",0)
var v
w(v=B.Ua.prototype,"gaWu","afp",3)
x(v,"gacJ","F_",0)
x(v,"ga6z","KP",0)
x(v,"ga6y","KO",0)
x(v,"ga6w","KL",0)
x(v,"ga6x","KM",0)
w(v=B.a1z.prototype,"gaR2","aR3",7)
x(v,"gaQa","Xu",1)
x(B.Pg.prototype,"gdJ","k",0)
x(B.Pj.prototype,"gaOg","aOh",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DS,B.aqe,B.Gw,B.a1N,B.aPS,B.a1z,B.aKW,B.NU,B.F8,B.aGz,B.Pe,B.aL7,B.a9f,B.V3,B.a9e,B.xX,B.tg,B.Ho,B.aan,B.FM,B.Ax,B.Pf,B.Ph])
w(B.QL,A.fm)
x(A.jW,[B.aQv,B.bbE,B.bbB,B.bbC,B.bby,B.bbz,B.bbA,B.bbv,B.bbw,B.bbD,B.bbf,B.bbd,B.bbg,B.bbh,B.bbi,B.bbc,B.bbm,B.bbb,B.bba,B.bb9,B.ati,B.aGC,B.aGD,B.aKZ,B.aLd,B.aLf,B.aAg,B.aAf,B.aow])
x(A.is,[B.aQw,B.aqf,B.bbF,B.bbx,B.bbe,B.bbj,B.bbk,B.bbl,B.bbo,B.bbp,B.bbq,B.bbr,B.bbs,B.bbt,B.bbn,B.aPT,B.aPU,B.aPV,B.ath,B.bM3,B.aGR,B.aGS,B.aGO,B.aGP,B.aGQ,B.aGE,B.aL_,B.aL0,B.aL1,B.aL2,B.aL3,B.aL4,B.aL5,B.aL6,B.aKY,B.bMb,B.aLc,B.aL8,B.aL9,B.aLa,B.aLb,B.bgh,B.asc,B.asd,B.ase,B.asf,B.aox,B.aou,B.aov,B.aoy])
x(A.L,[B.p6,B.yD,B.Pi])
x(A.S,[B.Ub,B.Ua,B.Pj])
x(A.as,[B.SQ,B.ac1,B.wF])
x(A.qL,[B.bbu,B.aGB,B.aLe])
w(B.aKX,B.aKW)
w(B.mK,B.NU)
w(B.a5l,B.F8)
w(B.aGA,B.aGz)
w(B.a7_,B.Pe)
w(B.bQh,B.aL7)
w(B.Pg,A.d3)
x(B.a9f,[B.a3P,B.aot])
x(B.tg,[B.GV,B.D5,B.Dv])
w(B.Hn,B.Ho)
w(B.alh,B.DS)
x(A.HR,[B.vR,B.Pd,B.vQ,B.mW,B.a70])})()
A.oz(b.typeUniverse,JSON.parse('{"DS":{"dH":["1"]},"QL":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yD":{"L":[],"m":[]},"p6":{"L":[],"m":[]},"Ub":{"S":["p6"]},"SQ":{"as":[],"m":[]},"Ua":{"S":["yD"]},"ac1":{"as":[],"m":[]},"wF":{"as":[],"m":[]},"mK":{"NU":[]},"a5l":{"F8":[]},"a7_":{"Pe":[]},"Pg":{"d3":["Ph"],"aV":[]},"Pi":{"L":[],"m":[]},"Pj":{"S":["Pi"]},"V3":{"dH":["1"]},"xX":{"bQS":[]},"GV":{"tg":[]},"D5":{"tg":[]},"Dv":{"tg":[]},"Ho":{"bM":[]},"Hn":{"bM":[]},"alh":{"dH":["@"]},"aan":{"bM":[]}}'))
A.bRk(b.typeUniverse,JSON.parse('{"DS":1,"a9f":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xX"),L:x("bM"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F8>"),d:x("D<iA<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("aw"),l:x("J<aw>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NU"),G:x("F8"),h:x("mK"),o:x("pu"),a:x("bm"),K:x("a0"),J:x("Pe"),v:x("Ax"),Z:x("a9e<a0?>"),N:x("o"),e:x("pY"),M:x("e0"),D:x("tg"),U:x("W<o>"),g:x("ds<Gw>"),n:x("ds<~>"),V:x("aZ<xX>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Ul<aw>"),C:x("os<aw>"),k:x("au<xX>"),c:x("au<@>"),W:x("au<~>"),q:x("kv"),y:x("K"),z:x("@"),A:x("aw?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Uo=new B.a1N(C.k8)
D.y8=new A.al(32,0,32,0)
D.qe=new A.aj(57638,"MaterialIcons",null,!1)
D.yQ=new A.aj(57639,"MaterialIcons",null,!1)
D.a_3=new A.aj(58337,"MaterialIcons",null,!1)
D.a_4=new A.aj(58341,"MaterialIcons",null,!1)
D.a_8=new A.aj(58923,"MaterialIcons",null,!1)
D.yW=new A.aj(59048,"MaterialIcons",null,!1)
D.a_9=new A.aj(59049,"MaterialIcons",null,!1)
D.a_a=new A.aj(59077,"MaterialIcons",null,!1)
D.a7H=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.abs=A.b(x([]),y.Q)
D.Gs=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.ajy=new B.mW(0,"RTCIceConnectionStateNew")
D.ajz=new B.mW(1,"RTCIceConnectionStateChecking")
D.ajA=new B.mW(2,"RTCIceConnectionStateCompleted")
D.ajB=new B.mW(3,"RTCIceConnectionStateConnected")
D.ajC=new B.mW(4,"RTCIceConnectionStateCount")
D.KO=new B.mW(5,"RTCIceConnectionStateFailed")
D.ajD=new B.mW(6,"RTCIceConnectionStateDisconnected")
D.KP=new B.mW(7,"RTCIceConnectionStateClosed")
D.KQ=new B.Pd(0,"RTCIceGatheringStateNew")
D.ajE=new B.Pd(1,"RTCIceGatheringStateGathering")
D.ajF=new B.Pd(2,"RTCIceGatheringStateComplete")
D.t0=new B.vQ(0,"RTCPeerConnectionStateClosed")
D.KR=new B.vQ(1,"RTCPeerConnectionStateFailed")
D.KS=new B.vQ(2,"RTCPeerConnectionStateDisconnected")
D.KT=new B.vQ(3,"RTCPeerConnectionStateNew")
D.KU=new B.vQ(4,"RTCPeerConnectionStateConnecting")
D.KV=new B.vQ(5,"RTCPeerConnectionStateConnected")
D.ajG=new B.vR(0,"RTCSignalingStateStable")
D.ajH=new B.vR(1,"RTCSignalingStateHaveLocalOffer")
D.ajI=new B.vR(2,"RTCSignalingStateHaveRemoteOffer")
D.ajJ=new B.vR(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajK=new B.vR(4,"RTCSignalingStateHaveRemotePrAnswer")
D.KW=new B.vR(5,"RTCSignalingStateClosed")
D.ajL=new B.Ph(0,0,0)
D.KX=new B.a70(0,"RTCVideoViewObjectFitContain")
D.KY=new B.a70(1,"RTCVideoViewObjectFitCover")
D.nQ=new A.c5(20,null,null,null)
D.anf=new A.c5(48,null,null,null)
D.Ms=new A.c5(null,64,null,null)
D.aqm=new A.y(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.N6=new A.y(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqL=new A.y(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Ne=new A.y(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ua=new A.y(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c_7=!1
$.bYs=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ctc","c4w",()=>new B.aKX())
x($,"crf","bSW",()=>C.c.q(A.an(A.an(A.an(A.bSA(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"kfbOcmmRczAA5Vfj2Uc7Tjh/suo=");