((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DP:function DP(){},QL:function QL(d){this.$ti=d},aQu:function aQu(d){this.a=d},aQv:function aQv(d,e){this.a=d
this.b=e},
a0i(d){var x,w,v,u,t,s=new B.aqg(),r=J.Q(d),q=r.h(d,"id")
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
return new B.aqf(q,x,w,v,u,t)},
bZa(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.me(t,y.N,y.z):C.e9
if(u.h(d,"cree_le")!=null)A.bY(J.l(u.h(d,"cree_le")))
return new B.Gu(s,x,w,v)},
c9d(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Uu
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.me(s,u,t))}return new B.a1M(x)},
bLn(d){var x=C.h.b_(d.a,1e6)
return C.c.aZ(C.h.j(C.h.b_(x,60)),2,"0")+":"+C.c.aZ(C.h.j(C.h.aP(x,60)),2,"0")},
c31(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oD(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ahw(w,v)},
cmT(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahz(u,A.jL(w)?w:null,v)},
aqf:function aqf(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aqg:function aqg(){},
Gu:function Gu(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1M:function a1M(d){this.a=d},
bWg(d,e,f,g,h,i){return new B.p5(e,f,i,h,d,null)},
bWf(d,e,f,g,h){return new B.yB(e,h,f,g,d,null)},
c_q(d,e,f,g,h,i,j,k,l,m,n){return new B.ac2(g,f,e,i,h,d,m,l,k,j,n,null)},
p5:function p5(d,e,f,g,h,i){var _=this
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
bbC:function bbC(d){this.a=d},
bbD:function bbD(d){this.a=d},
bbz:function bbz(d){this.a=d},
bbA:function bbA(d){this.a=d},
bbw:function bbw(d){this.a=d},
bbx:function bbx(d){this.a=d},
bby:function bby(d){this.a=d},
bbt:function bbt(d){this.a=d},
bbu:function bbu(d){this.a=d},
bbv:function bbv(d){this.a=d},
bbB:function bbB(d){this.a=d},
SQ:function SQ(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yB:function yB(d,e,f,g,h,i){var _=this
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
bbd:function bbd(d){this.a=d},
bbe:function bbe(d){this.a=d},
bbc:function bbc(){},
bbf:function bbf(d){this.a=d},
bbg:function bbg(d){this.a=d},
bbh:function bbh(d){this.a=d},
bbi:function bbi(d){this.a=d},
bbb:function bbb(d,e){this.a=d
this.b=e},
bbj:function bbj(){},
bbk:function bbk(d){this.a=d},
bbm:function bbm(d){this.a=d},
bbn:function bbn(d){this.a=d},
bbo:function bbo(d){this.a=d},
bbp:function bbp(d){this.a=d},
bbq:function bbq(d){this.a=d},
bbr:function bbr(d){this.a=d},
bbl:function bbl(d){this.a=d},
bba:function bba(d,e){this.a=d
this.b=e},
bb9:function bb9(d,e){this.a=d
this.b=e},
bb8:function bb8(d,e){this.a=d
this.b=e},
bbs:function bbs(d){this.a=d},
ac2:function ac2(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wD:function wD(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aPT:function aPT(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aPU:function aPU(d){this.a=d},
aPV:function aPV(d){this.a=d},
aPW:function aPW(d){this.a=d},
a1y:function a1y(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
ati:function ati(d){this.a=d},
atj:function atj(d){this.a=d},
ans(d){var x=y.U,w=A.G(new A.W(A.b(d.split(" "),y.s),new B.bMh(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bMh:function bMh(){},
aKY:function aKY(){},
mG:function mG(d,e,f){this.e=d
this.a=e
this.b=f},
aGU:function aGU(d){this.a=d},
aGV:function aGV(d){this.a=d},
bPZ(d){var x=new B.a5l(d)
x.awC(d)
return x},
a5l:function a5l(d){this.d=d},
aGR:function aGR(d){this.a=d},
aGS:function aGS(d){this.a=d},
aGT:function aGT(d){this.a=d},
aGD:function aGD(){},
aGF:function aGF(){},
aGG:function aGG(){},
aGH:function aGH(d){this.a=d},
aGE:function aGE(d){this.a=d},
ce5(d,e){var x=y.N
x=new B.a70(d,e,A.C(x,y.E),A.C(x,y.z))
x.awH(d,e)
return x},
a70:function a70(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aL0:function aL0(d){this.a=d},
aL1:function aL1(d){this.a=d},
aL2:function aL2(d){this.a=d},
aL3:function aL3(d){this.a=d},
aL4:function aL4(d){this.a=d},
aL5:function aL5(d){this.a=d},
aL6:function aL6(d){this.a=d},
aL7:function aL7(d){this.a=d},
aKZ:function aKZ(d){this.a=d},
aL_:function aL_(d,e){this.a=d
this.b=e},
bQv:function bQv(d){this.a=d},
coQ(){return C.b.m5(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bMp())!==-1},
bMp:function bMp(){},
bYC(){var x=A.b([],y.d),w=$.bYD
$.bYD=w+1
return new B.Pg(w,x,D.ajQ,$.ad())},
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
aLd:function aLd(d){this.a=d},
aL9:function aL9(d){this.a=d},
aLa:function aLa(d){this.a=d},
aLb:function aLb(d){this.a=d},
aLc:function aLc(){},
bYE(d,e,f){return new B.Pi(d,f,e,null)},
Pi:function Pi(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pj:function Pj(){this.c=this.a=null},
aLe:function aLe(){},
aLg:function aLg(d){this.a=d},
aLf:function aLf(d){this.a=d},
bWQ(d,e,f,g){var x,w={}
w.a=d
x=new B.a3Q(g.i("a3Q<0>"))
x.awt(e,f,w,g)
return x},
a3Q:function a3Q(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAi:function aAi(d,e){this.a=d
this.b=e},
aAh:function aAh(d){this.a=d},
V3:function V3(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgh:function bgh(){},
a9f:function a9f(d){this.b=this.a=$
this.$ti=d},
a9g:function a9g(){},
bOM(d,e){return B.c8v(d,e)},
c8v(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bOM=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o6("ws")&&!d.o6("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xV(r,A.fL(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.cj(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fH(new B.Hm("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oq(r,"open",!1,y.C).gS(0).aB(new B.asd(p,q),y.H)
t=y.C
s=y.H
new A.oq(r,"error",!1,t).gS(0).aB(new B.ase(p,q),s)
A.hS(r,"message",new B.asf(q),!1,y.m)
new A.oq(r,"close",!1,t).gS(0).aB(new B.asg(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bOM,w)},
xV:function xV(d,e){this.a=d
this.b=e},
asd:function asd(d,e){this.a=d
this.b=e},
ase:function ase(d,e){this.a=d
this.b=e},
asf:function asf(d){this.a=d},
asg:function asg(d,e){this.a=d
this.b=e},
bR7(){return new B.Hl("Connection Closed")},
te:function te(){},
GT:function GT(d){this.a=d},
D2:function D2(d){this.a=d},
Ds:function Ds(d,e){this.a=d
this.b=e},
Hm:function Hm(d){this.a=d},
Hl:function Hl(d){this.a=d},
c80(d){var x=null,w=$.aE,v=new B.a9f(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bWQ(new A.cz(s,r.i("cz<1>")),new A.Cf(t,q.i("Cf<1>")),!0,u)
v.b=B.bWQ(new A.cz(t,q.i("cz<1>")),new A.Cf(s,r.i("Cf<1>")),!1,u)
v=new B.aot(new A.aZ(new A.au(w,y.W),y.R),v)
v.awj(d)
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
aao:function aao(d){this.a=d},
coq(d){switch(d){case"new":return D.ajD
case"checking":return D.ajE
case"connected":return D.ajG
case"completed":return D.ajF
case"failed":return D.KQ
case"disconnected":return D.ajI
case"closed":return D.KR
case"count":return D.ajH}return D.KR},
cor(d){switch(d){case"new":return D.KS
case"gathering":return D.ajJ
case"complete":return D.ajK}return D.KS},
cq_(d){switch(d){case"stable":return D.ajL
case"have-local-offer":return D.ajM
case"have-local-pranswer":return D.ajO
case"have-remote-offer":return D.ajN
case"have-remote-pranswer":return D.ajP
case"closed":return D.KY}return D.KY},
cpB(d){switch(d){case"new":return D.KV
case"connecting":return D.KW
case"connected":return D.KX
case"closed":return D.t2
case"disconnected":return D.KU
case"failed":return D.KT}return D.t2},
vR:function vR(d,e){this.a=d
this.b=e},
Pd:function Pd(d,e){this.a=d
this.b=e},
vQ:function vQ(d,e){this.a=d
this.b=e},
mS:function mS(d,e){this.a=d
this.b=e},
a71:function a71(d,e){this.a=d
this.b=e},
aKX:function aKX(){},
NT:function NT(){},
F4:function F4(){},
aGC:function aGC(){},
FK:function FK(d,e,f){this.a=d
this.b=e
this.c=f},
Pe:function Pe(){},
aL8:function aL8(){},
At:function At(d,e){this.a=d
this.b=e},
Pf:function Pf(d){this.b=d},
Ph:function Ph(d,e,f){this.a=d
this.b=e
this.c=f},
bPH(d){var x=0,w=A.k(y.y)
var $async$bPH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bPH,w)},
aIR(d){var x=0,w=A.k(y.H),v
var $async$aIR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aUN("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aIR)
case 2:return A.i(null,w)}})
return A.j($async$aIR,w)},
aUN(d,e,f,g){return B.cgN(d,e,f,g,f.i("0?"))},
cgN(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUN=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aUM(),$async$aUN)
case 3:v=D.Gs.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUN,w)},
aUM(){var x=0,w=A.k(y.H),v,u
var $async$aUM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c_h?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Gs.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aUM)
case 4:$.c_h=!0
case 3:return A.i(null,w)}})
return A.j($async$aUM,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[28]
E=c[18]
B.DP.prototype={
D(d,e){this.a.D(0,e)},
d6(d,e){this.a.d6(d,e)},
a5(d){return this.a.a5(0)},
$idG:1}
B.QL.prototype={
iO(d){var x=A.cy("subscription"),w=A.fL(new B.aQu(x),null,null,!0,this.$ti.y[1])
x.b=d.eU(new B.aQv(this,w),w.gm0(w),w.gnH())
return new A.cz(w,A.u(w).i("cz<1>"))}}
B.aqf.prototype={}
B.Gu.prototype={}
B.a1M.prototype={}
B.p5.prototype={
N(){return new B.Ub()}}
B.Ub.prototype={
U(){var x=this
x.W()
x.KJ()
x.r=A.dh(C.c2,new B.bbC(x))
x.w=A.iC(C.xK,new B.bbD(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a2()},
XI(){var x=this.x
if(x!=null)x.V(0)
this.x=A.dh(C.fY,new B.bbz(this))},
Op(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Op=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.AU(p.c),$async$Op)
case 7:r=e
q=B.a0i(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbA(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.XI()}u=2
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
return A.j($async$Op,w)},
KJ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$KJ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.aa()
x=7
return A.e(n.AU(o.c),$async$KJ)
case 7:r=e
q=B.a0i(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gali()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bbw(s))
s.XI()
x=1
break}s.n(new B.bbx(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bby(s))
s.XI()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KJ,w)},
Kz(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Kz=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.bbt(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.e(p.a0u(q.c,"accepte"),$async$Kz)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.P(n)
if(s.c==null){x=1
break}s.n(new B.bbu(s))
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
A.a9(q,!1).xu(A.e5(new B.bbv(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Kz,w)},
F7(d){return this.aRt(d)},
aRs(){return this.F7(!1)},
aRt(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F7=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.a0u(r.c,"refuse"),$async$F7)
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
return A.j($async$F7,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jT(C.r,s,A.c(B.ans(r.d),s,s,s,s,D.Nh,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.N7,C.V,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.az,new A.Y(D.y4,x,s),C.l,A.c(q,s,s,s,s,D.ua,s,s,s),D.Ms],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbB(t)
v=A.a("Accepter")
u=t.f?s:t.gaxk()
q.push(A.T(A.b([new B.SQ(D.yR,C.aC,r,x,s),D.ank,new B.SQ(D.yQ,C.cB,v,u,s)],w),C.o,C.bi,C.i,s))}if(t.d)q.push(C.wo)
return A.eA(s,C.n,A.fl(!0,A.cC(A.I(q,C.o,C.e,C.W),s,s),!0,C.aj,!0,!0),s,s,s)}}
B.SQ.prototype={
C(d){var x=this,w=null,v=A.d2(x.d,w,w,C.aj,C.cj,w)
return A.I(A.b([A.ac(A.b5(!1,A.c3(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.eh,w,w,w)],y.p),C.o,C.e,C.W)}}
B.yB.prototype={
N(){return new B.Ua(A.b0(y.N),C.R)}}
B.Ua.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bYC()
w=B.bYC()
v.d!==$&&A.bj()
v.d=new B.aPT(x,w)
v.a.toString
x=new B.a1y(new A.dr(u,u,y.g),new A.dr(u,u,y.n))
v.e!==$&&A.bj()
v.e=x
v.vg()},
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
w.GX()
x.a2()},
vg(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$vg=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.aa()
x=7
return A.e(l.AU(m.c),$async$vg)
case 7:r=e
q=B.a0i(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mC(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Q1(),$async$vg)
case 8:p=e
o=B.c9d(p)
x=9
return A.e(s.UD(),$async$vg)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mC(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.ut(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$vg)
case 10:m.f=new B.bbd(s)
m.r=new B.bbe(s)
m.w=new B.bbf(s)
if(s.c==null){x=1
break}s.n(new B.bbg(s))
s.ch=A.dh(C.c2,new B.bbh(s))
s.CW=A.iC(C.cl,new B.bbi(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.c1(k,A.u(k).i("c1<1>")).cA(s.gaWC())
k=m.w
s.cy=new A.c1(k,A.u(k).i("c1<1>")).cA(new B.bbj())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.Pc(C.c.Sn("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f7(C.cb,n,C.ai,!0))}s.ay=A.iC(C.fY,new B.bbk(s))
s.Ey()
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
return A.j($async$vg,w)},
UD(){var x=0,w=A.k(y.y),v
var $async$UD=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$UD,w)},
Ey(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Ey=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.c0("/messagerie/appels/"+p.c+"/signaux"),$async$Ey)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gL(p)
s.afr(B.bZa(q))}u=2
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
return A.j($async$Ey,w)},
afr(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c31(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Ao(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.bbm(s),y.a).fG(new B.bbn(s))
break
case"reponse":if(!s.a.f)return
u=B.c31(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.OQ(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.bbo(s),y.a).fG(new B.bbp(s))
break
case"candidat_ice":t=B.cmT(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.OL(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.GR().aB(new B.bbq(s),y.a).fG(new B.bbr(s))
break
case"refuse":s.mC(A.a("Appel refus\xe9"))
break
case"annule":s.mC(A.a("Appel annul\xe9"))
break
case"termine":s.mC(A.a("Appel termin\xe9"))
break}},
acv(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbl(w))},
yQ(d,e,f){return this.aEd(d,e,f)},
a8W(d,e){return this.yQ(d,e,!0)},
aEd(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yQ=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.aa()
x=6
return A.e(r.ajl(s.c,e,d),$async$yQ)
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
return A.j($async$yQ,w)},
F3(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F3=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.aa()
x=7
return A.e(q.a0u(r.c,"termine"),$async$F3)
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
mC(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.V(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.z(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.a9(x,!1).bt()},
KS(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.TA(u),$async$KS)
case 2:if(v.c!=null)v.n(new B.bba(v,u))
return A.i(null,w)}})
return A.j($async$KS,w)},
KR(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.JQ(u),$async$KR)
case 2:if(v.c!=null)v.n(new B.bb9(v,u))
return A.i(null,w)}})
return A.j($async$KR,w)},
KO(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KO=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Tx(u),$async$KO)
case 2:if(v.c!=null)v.n(new B.bb8(v,u))
return A.i(null,w)}})
return A.j($async$KO,w)},
KP(){var x=0,w=A.k(y.H),v=this,u
var $async$KP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.OT(),$async$KP)
case 2:return A.i(null,w)}})
return A.j($async$KP,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bYE(o.e,!1,D.L_)
else{x=A.jT(C.r,q,A.c(B.ans(w.e),q,q,q,q,D.aqN,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aqp,q,q,q)
x=A.cC(A.I(A.b([x,C.p,w,C.l,A.c(r.w?B.bLn(r.ax):A.a(p),q,q,q,q,D.ua,q,q,q)],y.p),C.o,C.e,C.W),q,q)}x=A.FB(0,x)
o=A.fz(q,A.eD(A.N(12),B.bYE(o.d,!0,D.L_),C.am),160,q,q,16,16,110)
w=r.w
v=B.bLn(r.ax)
u=r.z
t=r.Q
u=A.ew(C.b1,A.b([x,o,A.fz(24,B.c_q(r.as,v,w,!0,t,u,r.ga6D(),r.ga6C(),r.ga6E(),r.ga6F(),r.gacN()),q,q,0,0,q,q)],y.p),C.f,C.aY,q)
o=u}else{o=A.jT(C.r,q,A.c(B.ans(w.e),q,q,q,q,D.Nh,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.N7,C.V,q,q)
if(r.w)w=B.bLn(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.ua,q,q,q)
v=r.w
u=B.bLn(r.ax)
t=r.z
s=r.Q
t=A.cC(A.I(A.b([o,C.az,new A.Y(D.y4,x,q),C.l,w,D.Ms,B.c_q(r.as,u,v,!1,s,t,r.ga6D(),r.ga6C(),r.ga6E(),r.ga6F(),r.gacN())],y.p),C.o,C.e,C.W),q,q)
o=t}return A.bQp(!1,A.eA(q,C.n,A.fl(!0,o,!0,C.aj,!0,!0),q,q,q),new B.bbs(r),y.K)}}
B.ac2.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nl,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_6:D.a_5
t=A.b([new B.wD(x,r,A.a("Muet"),v.x,u,u),D.nZ,new B.wD(D.a_c,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nZ)
if(r){x=v.w
w=x?D.yX:D.a_b
t.push(new B.wD(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nZ)
if(r)t.push(new B.wD(D.a_a,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nZ)
t.push(new B.wD(D.yR,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.T(t,C.o,C.bi,C.i,u))
return A.I(s,C.o,C.e,C.W)}}
B.wD.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lH
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d2(u,v,v,C.aj,C.cj,v)
return A.I(A.b([A.ac(A.b5(!1,A.c3(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aW,A.c(w.e,v,v,v,v,C.Nm,v,v,v)],y.p),C.o,C.e,C.W)}}
B.aPT.prototype={
ut(d,e){return this.b9m(d,e)},
b9m(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$ut=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.is(0),$async$ut)
case 2:x=3
return A.e(v.e.is(0),$async$ut)
case 3:u=$.c4H()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aGD().CG(0,A.a6(["audio",!0,"video",t],s,r)),$async$ut)
case 4:q=v.b=g
o.sa4H(0,q)
x=5
return A.e(u.a_H(d,A.C(s,r)),$async$ut)
case 5:p=v.a=g
x=6
return A.e(p.kl(0,q),$async$ut)
case 6:p.e=new B.aPU(v)
p.Q=new B.aPV(v)
p.d=new B.aPW(v)
return A.i(null,w)}})
return A.j($async$ut,w)},
aCD(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4H(0,d)
x=w.r
if(x!=null)x.$0()}},
GR(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Pn(0),$async$GR)
case 3:t=e
x=4
return A.e(s.CT(0,t),$async$GR)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GR,w)},
Ao(d){return this.b0V(d)},
b0V(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ao=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.CV(0,new B.At(d.h(0,"sdp"),d.h(0,"type"))),$async$Ao)
case 3:x=4
return A.e(s.Pl(0),$async$Ao)
case 4:t=f
x=5
return A.e(s.CT(0,t),$async$Ao)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ao,w)},
OQ(d){return this.aYV(d)},
aYV(d){var x=0,w=A.k(y.H),v=this,u
var $async$OQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.CV(0,new B.At(d.h(0,"sdp"),d.h(0,"type"))),$async$OQ)
case 2:return A.i(null,w)}})
return A.j($async$OQ,w)},
OL(d){return this.aYH(d)},
aYH(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.OA(new B.FK(A.aM(d.h(0,"candidate")),A.aM(d.h(0,"sdpMid")),A.eh(d.h(0,"sdpMLineIndex")))),$async$OL)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OL,w)},
TA(d){return this.aq8(d)},
aq8(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$TA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T8(0)
if(r==null)r=C.dp
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skq(0,t)
return A.i(null,w)}})
return A.j($async$TA,w)},
JQ(d){return this.aq_(d)},
aq_(d){var x=0,w=A.k(y.H)
var $async$JQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aIR(d),$async$JQ)
case 2:return A.i(null,w)}})
return A.j($async$JQ,w)},
Tx(d){return this.apS(d)},
apS(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Tx=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jz(0)
if(s==null)s=C.dp
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skq(0,d)
return A.i(null,w)}})
return A.j($async$Tx,w)},
OT(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OT=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jz(0)
if(s==null)s=D.abz
if(s.length===0){x=1
break}x=3
return A.e(B.bPH(C.b.gS(s)),$async$OT)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OT,w)},
iT(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iT=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a5(0)
x=7
return A.e(y.x.b(q)?q:A.di(q,y.H),$async$iT)
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
else{o=A.G(q.T8(0),!0,y.G)
C.b.t(o,q.Jz(0))
q=o}if(q==null)q=C.dp
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c7V(r)
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
case 14:case 9:q.length===o||(0,A.L)(q),++l
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
B.a1y.prototype={
Pc(d){return this.b_e(d)},
b_e(d){var x=0,w=A.k(y.H),v=this
var $async$Pc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Dq(),$async$Pc)
case 2:return A.i(null,w)}})
return A.j($async$Pc,w)},
Dq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.c80(B.bOM(A.cx(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Dq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cz(p,A.u(p).i("cz<1>")).aT(s.gaRb(),!0,s.gaQi(),new B.ati(s))
u=2
x=6
break
case 4:u=3
n=t
s.Xz()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dq,w)},
aRc(d){var x,w,v,u
try{x=C.Z.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bZa(w))}catch(u){}},
Xz(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7N[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.dh(A.d1(0,0,0,0,x),new B.atj(w))},
GX(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GX=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.e(y.x.b(s)?s:A.di(s,y.H),$async$GX)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.aW()
r=s.w=new B.alh(s,q)}s=r.a5(0)}x=7
return A.e(y._.b(s)?s:A.di(s,y.z),$async$GX)
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
return A.j($async$GX,w)}}
B.aKY.prototype={
a_H(d,e){return this.b0L(d,e)},
b0L(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_H=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fv(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.ce5(C.cy.gld().bi(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_H,w)}}
B.mG.prototype={
T8(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cH(w,A.V(w).i("cH<1,av>"))
J.fQ(w,new B.aGU(x))
return x},
Jz(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cH(w,A.V(w).i("cH<1,av>"))
J.fQ(w,new B.aGV(x))
return x}}
B.a5l.prototype={
awC(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aGR(x)))
w.addEventListener("mute",A.bF(new B.aGS(x)))
w.addEventListener("unmute",A.bF(new B.aGT(x)))},
skq(d,e){this.d.enabled=e},
aF(d){var x=0,w=A.k(y.H),v=this
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aF,w)}}
B.aGD.prototype={
CG(d,e){return this.ap_(0,e)},
ap_(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CG=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.coQ())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iJ(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aGF())
e.cq(0,"audio",new B.aGG())}catch(a0){A.nm("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hP(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fQ(s,new B.aGH(r))
J.iJ(e.h(0,"audio"),"optional")
J.j9(e.h(0,"audio"),r)}}catch(a0){q=A.P(a0)
p=A.bd(a0)
A.nm("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.dR(o.getUserMedia(h.a(n)),h),$async$CG)
case 10:m=a2
i=m
h=i.id
v=new B.mG(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.dR(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CG)
case 11:l=a2
h=l
g=h.id
v=new B.mG(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.P(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$CG,w)}}
B.a70.prototype={
awH(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bF(new B.aL0(x)))
w.addEventListener("icecandidate",A.bF(new B.aL1(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aL2(x)))
w.onicegatheringstatechange=A.bF(new B.aL3(x))
w.addEventListener("signalingstatechange",A.bF(new B.aL4(x)))
if(!$.bT8())w.addEventListener("connectionstatechange",A.bF(new B.aL5(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aL6(x)))
w.addEventListener("track",A.bF(new B.aL7(x)))},
Pn(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dR(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Pn)
case 3:t=f
v=new B.At(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pn,w)},
Pl(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dR(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Pl)
case 3:t=f
v=new B.At(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pl,w)},
kl(d,e){var x
this.ax.cq(0,e.a,new B.aL_(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cG(null,y.H)},
CT(d,e){return this.aq3(0,e)},
aq3(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CT=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dR(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CT)
case 2:return A.i(null,w)}})
return A.j($async$CT,w)},
CV(d,e){return this.aqj(0,e)},
aqj(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CV=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dR(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CV)
case 2:return A.i(null,w)}})
return A.j($async$CV,w)},
OA(d){return this.aYm(d)},
aYm(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$OA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.dR(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$OA)
case 2:return A.i(null,w)}})
return A.j($async$OA,w)},
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
B.bQv.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.P(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.Pg.prototype={
saly(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hp()
if(x!=null)x.style.objectFit=e},
afA(){var x=this,w=x.Hp(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.air(u,x.z!=null,0,t))},
sa4H(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jz(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cH(x,A.V(x).i("cH<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T8(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cH(x,A.V(x).i("cH<1,av>")))
for(;x.A();){w=x.gL(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aE2()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hp()
if(u!=null){u.srcObject=t.x
x=t.Hp()
x.toString
t.a6r(x)}t.sl(0,t.a.b_D(t.z!=null))},
aE2(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Hp(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].V(0)
q=u.Hp()
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
while(true)switch(x){case 0:$.CH()
$.oG().rb("RTCVideoRenderer-"+v.Q,new B.aLd(v),!0)
return A.i(null,w)}})
return A.j($async$is,w)},
a6r(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pi.prototype={
N(){return new B.Pj()}}
B.Pj.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a8(0,v.gaOn())
x=v.a
w=x.c
w.as=x.e
w.saly(0,x.d===D.KZ?"contain":"cover")},
aOo(){if(this.c!=null)this.n(new B.aLe())},
k(){if(this.c!=null)this.a2()},
aS(d){var x,w
this.b7(d)
A.dh(A.d1(0,0,10,0,0),new B.aLg(this))
x=this.a
w=x.c
w.saly(0,x.d===D.KZ?"contain":"cover")},
C(d){return new A.iv(new B.aLf(this),null)}}
B.a3Q.prototype={
awt(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.V3(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("V3<0>"))
if(f.a.gi2())f.a=new B.QL(g.i("@<0>").bV(g).i("QL<1,2>")).iO(f.a)
w=A.fL(null,new B.aAi(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
ac9(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.d()
w.a5(0)}}
B.V3.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d6(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aGr(d,e)},
ho(d){return this.d6(d,null)},
aGr(d,e){var x=this
if(x.w){x.a.a.d6(d,e)
return}x.c.fo(d,e)
x.aca()
x.b.ac9()
x.a.a.a5(0).fG(new B.bgh())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ac9()
x.c.cj(0,x.a.a.a5(0))}return x.c.a},
aca(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dd(0)
return},
$idG:1}
B.a9f.prototype={}
B.a9g.prototype={}
B.xV.prototype={
a7C(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Ds(d,e))
x.a5(0)},
a4g(d){var x
if((this.b.b&4)!==0)throw A.n(B.bR7())
x=A.bQ(d)
x.toString
this.a.send(x)},
wa(d,e,f){return this.b__(0,e,f)},
b__(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wa=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bR7())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wa,w)},
$ibR6:1}
B.te.prototype={}
B.GT.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GT&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.D2.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D2&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fV(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Ds.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Ds&&e.a===this.a&&e.b===this.b},
gH(d){return A.fV([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Hm.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibN:1}
B.Hl.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.aot.prototype={
awj(d){d.eG(new B.aox(this),new B.aoy(this),y.a)}}
B.alh.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arY(0)}}
B.aao.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.vR.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pd.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vQ.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mS.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a71.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aKX.prototype={}
B.NT.prototype={}
B.F4.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGC.prototype={}
B.FK.prototype={}
B.Pe.prototype={}
B.aL8.prototype={}
B.At.prototype={}
B.Pf.prototype={}
B.Ph.prototype={
air(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Ph(x,w,v)},
b_D(d){return this.air(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yB(E)","~(Gu)","bn(FK)","bn(Pf)","bn(mS)","~(@)","mG(@)","mG()","bn(bR6)","~(te)"])
B.aQu.prototype={
$0(){return J.c7e(this.a.bp())},
$S:1}
B.aQv.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.P(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d6(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqg.prototype={
$1(d){if(d==null)return null
return A.bY(J.l(d))},
$S:141}
B.bbC.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F7(!0)},
$S:0}
B.bbD.prototype={
$1(d){return this.a.Op()},
$S:33}
B.bbz.prototype={
$0(){var x=this.a.c
if(x!=null)A.a9(x,!1).bt()},
$S:0}
B.bbA.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bbw.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbx.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bby.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbt.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bbu.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbv.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bWf(x.w,w,u,!1,v)},
$S:z+2}
B.bbB.prototype={
$0(){return this.a.aRs()},
$S:0}
B.bbd.prototype={
$1(d){this.a.yQ("candidat_ice",d,!1)},
$S:275}
B.bbe.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bbc())},
$S:0}
B.bbc.prototype={
$0(){},
$S:0}
B.bbf.prototype={
$0(){this.a.mC(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bbg.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bbh.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yQ("annule",C.e9,!1)
x.mC(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbi.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbb(x,w))},
$S:33}
B.bbb.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).ew(this.b)},
$S:0}
B.bbj.prototype={
$1(d){},
$S:164}
B.bbk.prototype={
$1(d){this.a.Ey()},
$S:33}
B.bbm.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acv()
x.a8W("reponse",d)},
$S:389}
B.bbn.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbo.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acv()},
$S:29}
B.bbp.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbq.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8W("offre",d)},
$S:389}
B.bbr.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbl.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.bba.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bb9.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bb8.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbs.prototype={
$2(d,e){if(!d)this.a.F3()},
$S:972}
B.aPU.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aPV.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aCD(w)},
$S:z+5}
B.aPW.prototype={
$1(d){var x
if(d===D.KQ){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.ati.prototype={
$1(d){return this.a.Xz()},
$S:21}
B.atj.prototype={
$0(){var x=this.a
if(!x.e)x.Dq()},
$S:0}
B.bMh.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGU.prototype={
$1(d){return this.a.push(B.bPZ(d))},
$S:21}
B.aGV.prototype={
$1(d){return this.a.push(B.bPZ(d))},
$S:21}
B.aGR.prototype={
$1(d){},
$S:22}
B.aGS.prototype={
$1(d){},
$S:22}
B.aGT.prototype={
$1(d){},
$S:22}
B.aGF.prototype={
$0(){return!1},
$S:46}
B.aGG.prototype={
$0(){return!1},
$S:46}
B.aGH.prototype={
$1(d){J.fQ(d,new B.aGE(this.a))},
$S:275}
B.aGE.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:50}
B.aL0.prototype={
$1(d){},
$S:22}
B.aL1.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FK(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aL2.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.coq(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bT8())switch(w.cx.a){case 0:w.cy=D.KV
break
case 1:w.cy=D.KW
break
case 3:w.cy=D.KX
break
case 5:w.cy=D.KT
break
case 6:w.cy=D.KU
break
case 7:w.cy=D.t2
break
default:break}},
$S:30}
B.aL3.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cor(w.iceGatheringState)},
$S:30}
B.aL4.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cq_(w.signalingState)},
$S:30}
B.aL5.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cpB(w.connectionState)},
$S:30}
B.aL6.prototype={
$1(d){},
$S:30}
B.aL7.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bPZ(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cH(x,A.V(x).i("cH<1,av>"))
w=J.eB(x,new B.aKZ(w),y.h)
v.$1(new B.Pf(A.G(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aKZ.prototype={
$1(d){return new B.mG(d,d.id,this.a.as)},
$S:z+8}
B.aL_.prototype={
$0(){var x=this.b.e
return new B.mG(x,x.id,this.a.as)},
$S:z+9}
B.bMp.prototype={
$1(d){return J.fZ(self.window.navigator.userAgent,A.bL(d,!1,!1))},
$S:12}
B.aLd.prototype={
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
x.a6r(t)
v=y.i.c
w.push(A.hS(t,"canplay",new B.aL9(x),!1,v))
w.push(A.hS(t,"resize",new B.aLa(x),!1,v))
w.push(A.hS(t,"error",new B.aLb(t),!1,v))
w.push(A.hS(t,"ended",new B.aLc(),!1,v))
return t},
$S:159}
B.aL9.prototype={
$1(d){this.a.afA()},
$S:21}
B.aLa.prototype={
$1(d){this.a.afA()},
$S:21}
B.aLb.prototype={
$1(d){var x,w,v=this.a.error
A.nm("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gg.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nW(x,C.Gf.h(0,A.ao(v,"code")),w,null))},
$S:25}
B.aLc.prototype={
$1(d){},
$S:21}
B.aLe.prototype={
$0(){},
$S:0}
B.aLg.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLf.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a45("RTCVideoRenderer-"+w.Q)
else w=A.O(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cC(A.O(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:973}
B.aAi.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eU(w.ghn(w),new B.aAh(v),w.gnH())},
$S:0}
B.aAh.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aca()
x=x.b
x===$&&A.d()
x.a5(0)},
$S:0}
B.bgh.prototype={
$1(d){},
$S:17}
B.asd.prototype={
$1(d){this.a.cj(0,this.b)},
$S:22}
B.ase.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fH(new B.Hm("Failed to connect WebSocket"))
else this.b.a7C(1006,"error")},
$S:22}
B.asf.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cy("data")
if(typeof x==="string")w.b=new B.GT(A.by(x))
else if(typeof x==="object"&&A.bXi(y.m.a(x),"ArrayBuffer"))w.b=new B.D2(A.Oj(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bp())},
$S:25}
B.asg.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cj(0,this.b)
this.b.a7C(d.code,d.reason)},
$S:22}
B.aox.prototype={
$1(d){var x=d.b,w=this.a
new A.cz(x,A.u(x).i("cz<1>")).cA(new B.aou(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cz(x,A.u(x).i("cz<1>")).b6s(new B.aov(d),new B.aow(w,d))
w.f.dd(0)},
$S:z+10}
B.aou.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GT
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.D2
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.Ds){x=this.a.r.a
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
if((t.b.b&4)!==0)A.ap(B.bR7())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4g(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4g(new Uint8Array(A.cT(u)))
break $label1$1}t=A.aN("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.P(r) instanceof B.Hl))throw r}},
$S:18}
B.aow.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.wa(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.P(q) instanceof B.Hl))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.aoy.prototype={
$1(d){var x,w=d instanceof A.RM?d:new B.aao(J.l(d)),v=this.a
v.f.fH(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.ho(w)
v=v.a
v===$&&A.d()
v.a5(0)},
$S:30};(function aliases(){var x=B.DP.prototype
x.arY=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ub.prototype,"gaxk","Kz",0)
var v
w(v=B.Ua.prototype,"gaWC","afr",3)
x(v,"gacN","F3",0)
x(v,"ga6F","KS",0)
x(v,"ga6E","KR",0)
x(v,"ga6C","KO",0)
x(v,"ga6D","KP",0)
w(v=B.a1y.prototype,"gaRb","aRc",7)
x(v,"gaQi","Xz",1)
x(B.Pg.prototype,"gdJ","k",0)
x(B.Pj.prototype,"gaOn","aOo",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DP,B.aqf,B.Gu,B.a1M,B.aPT,B.a1y,B.aKX,B.NT,B.F4,B.aGC,B.Pe,B.aL8,B.a9g,B.V3,B.a9f,B.xV,B.te,B.Hm,B.aao,B.FK,B.At,B.Pf,B.Ph])
w(B.QL,A.fm)
x(A.jV,[B.aQu,B.bbC,B.bbz,B.bbA,B.bbw,B.bbx,B.bby,B.bbt,B.bbu,B.bbB,B.bbe,B.bbc,B.bbf,B.bbg,B.bbh,B.bbb,B.bbl,B.bba,B.bb9,B.bb8,B.atj,B.aGF,B.aGG,B.aL_,B.aLe,B.aLg,B.aAi,B.aAh,B.aow])
x(A.ir,[B.aQv,B.aqg,B.bbD,B.bbv,B.bbd,B.bbi,B.bbj,B.bbk,B.bbm,B.bbn,B.bbo,B.bbp,B.bbq,B.bbr,B.aPU,B.aPV,B.aPW,B.ati,B.bMh,B.aGU,B.aGV,B.aGR,B.aGS,B.aGT,B.aGH,B.aL0,B.aL1,B.aL2,B.aL3,B.aL4,B.aL5,B.aL6,B.aL7,B.aKZ,B.bMp,B.aLd,B.aL9,B.aLa,B.aLb,B.aLc,B.bgh,B.asd,B.ase,B.asf,B.asg,B.aox,B.aou,B.aov,B.aoy])
x(A.M,[B.p5,B.yB,B.Pi])
x(A.S,[B.Ub,B.Ua,B.Pj])
x(A.at,[B.SQ,B.ac2,B.wD])
x(A.qJ,[B.bbs,B.aGE,B.aLf])
w(B.aKY,B.aKX)
w(B.mG,B.NT)
w(B.a5l,B.F4)
w(B.aGD,B.aGC)
w(B.a70,B.Pe)
w(B.bQv,B.aL8)
w(B.Pg,A.d4)
x(B.a9g,[B.a3Q,B.aot])
x(B.te,[B.GT,B.D2,B.Ds])
w(B.Hl,B.Hm)
w(B.alh,B.DP)
x(A.HP,[B.vR,B.Pd,B.vQ,B.mS,B.a71])})()
A.ox(b.typeUniverse,JSON.parse('{"DP":{"dG":["1"]},"QL":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yB":{"M":[],"m":[]},"p5":{"M":[],"m":[]},"Ub":{"S":["p5"]},"SQ":{"at":[],"m":[]},"Ua":{"S":["yB"]},"ac2":{"at":[],"m":[]},"wD":{"at":[],"m":[]},"mG":{"NT":[]},"a5l":{"F4":[]},"a70":{"Pe":[]},"Pg":{"d4":["Ph"],"aV":[]},"Pi":{"M":[],"m":[]},"Pj":{"S":["Pi"]},"V3":{"dG":["1"]},"xV":{"bR6":[]},"GT":{"te":[]},"D2":{"te":[]},"Ds":{"te":[]},"Hm":{"bN":[]},"Hl":{"bN":[]},"alh":{"dG":["@"]},"aao":{"bN":[]}}'))
A.bRz(b.typeUniverse,JSON.parse('{"DP":1,"a9g":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xV"),L:x("bN"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F4>"),d:x("D<iA<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("J<av>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NT"),G:x("F4"),h:x("mG"),o:x("pt"),a:x("bn"),K:x("a0"),J:x("Pe"),v:x("At"),Z:x("a9f<a0?>"),N:x("o"),e:x("pX"),M:x("e1"),D:x("te"),U:x("W<o>"),g:x("dr<Gu>"),n:x("dr<~>"),V:x("aZ<xV>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Ul<av>"),C:x("oq<av>"),k:x("au<xV>"),c:x("au<@>"),W:x("au<~>"),q:x("kv"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Uu=new B.a1M(C.ka)
D.y4=new A.al(32,0,32,0)
D.yQ=new A.aj(57638,!1)
D.yR=new A.aj(57639,!1)
D.a_5=new A.aj(58337,!1)
D.a_6=new A.aj(58341,!1)
D.a_a=new A.aj(58923,!1)
D.yX=new A.aj(59048,!1)
D.a_b=new A.aj(59049,!1)
D.a_c=new A.aj(59077,!1)
D.a7N=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.abz=A.b(x([]),y.Q)
D.Gs=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.ajD=new B.mS(0,"RTCIceConnectionStateNew")
D.ajE=new B.mS(1,"RTCIceConnectionStateChecking")
D.ajF=new B.mS(2,"RTCIceConnectionStateCompleted")
D.ajG=new B.mS(3,"RTCIceConnectionStateConnected")
D.ajH=new B.mS(4,"RTCIceConnectionStateCount")
D.KQ=new B.mS(5,"RTCIceConnectionStateFailed")
D.ajI=new B.mS(6,"RTCIceConnectionStateDisconnected")
D.KR=new B.mS(7,"RTCIceConnectionStateClosed")
D.KS=new B.Pd(0,"RTCIceGatheringStateNew")
D.ajJ=new B.Pd(1,"RTCIceGatheringStateGathering")
D.ajK=new B.Pd(2,"RTCIceGatheringStateComplete")
D.t2=new B.vQ(0,"RTCPeerConnectionStateClosed")
D.KT=new B.vQ(1,"RTCPeerConnectionStateFailed")
D.KU=new B.vQ(2,"RTCPeerConnectionStateDisconnected")
D.KV=new B.vQ(3,"RTCPeerConnectionStateNew")
D.KW=new B.vQ(4,"RTCPeerConnectionStateConnecting")
D.KX=new B.vQ(5,"RTCPeerConnectionStateConnected")
D.ajL=new B.vR(0,"RTCSignalingStateStable")
D.ajM=new B.vR(1,"RTCSignalingStateHaveLocalOffer")
D.ajN=new B.vR(2,"RTCSignalingStateHaveRemoteOffer")
D.ajO=new B.vR(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajP=new B.vR(4,"RTCSignalingStateHaveRemotePrAnswer")
D.KY=new B.vR(5,"RTCSignalingStateClosed")
D.ajQ=new B.Ph(0,0,0)
D.KZ=new B.a71(0,"RTCVideoViewObjectFitContain")
D.L_=new B.a71(1,"RTCVideoViewObjectFitCover")
D.nZ=new A.c5(20,null,null,null)
D.ank=new A.c5(48,null,null,null)
D.Ms=new A.c5(null,64,null,null)
D.aqp=new A.y(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.N7=new A.y(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqN=new A.y(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nh=new A.y(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ua=new A.y(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c_h=!1
$.bYD=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ctn","c4H",()=>new B.aKY())
x($,"crr","bT8",()=>C.c.q(A.ao(A.ao(A.ao(A.bSO(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"V+QshEn0ScgpJcTSA4wycciv4Ks=");