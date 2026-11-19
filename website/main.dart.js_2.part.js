((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DQ:function DQ(){},QM:function QM(d){this.$ti=d},aQu:function aQu(d){this.a=d},aQv:function aQv(d,e){this.a=d
this.b=e},
a0k(d){var x,w,v,u,t,s=new B.aqh(),r=J.Q(d),q=r.h(d,"id")
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
return new B.aqg(q,x,w,v,u,t)},
bZ9(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mf(t,y.N,y.z):C.e8
if(u.h(d,"cree_le")!=null)A.bY(J.l(u.h(d,"cree_le")))
return new B.Gv(s,x,w,v)},
c9d(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Uv
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mf(s,u,t))}return new B.a1O(x)},
bLm(d){var x=C.h.b0(d.a,1e6)
return C.c.b_(C.h.j(C.h.b0(x,60)),2,"0")+":"+C.c.b_(C.h.j(C.h.aP(x,60)),2,"0")},
c31(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oE(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ahx(w,v)},
cmT(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahA(u,A.jM(w)?w:null,v)},
aqg:function aqg(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aqh:function aqh(){},
Gv:function Gv(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1O:function a1O(d){this.a=d},
bWf(d,e,f,g,h,i){return new B.p6(e,f,i,h,d,null)},
bWe(d,e,f,g,h){return new B.yD(e,h,f,g,d,null)},
c_p(d,e,f,g,h,i,j,k,l,m,n){return new B.ac3(g,f,e,i,h,d,m,l,k,j,n,null)},
p6:function p6(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Uc:function Uc(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bbD:function bbD(d){this.a=d},
bbE:function bbE(d){this.a=d},
bbA:function bbA(d){this.a=d},
bbB:function bbB(d){this.a=d},
bbx:function bbx(d){this.a=d},
bby:function bby(d){this.a=d},
bbz:function bbz(d){this.a=d},
bbu:function bbu(d){this.a=d},
bbv:function bbv(d){this.a=d},
bbw:function bbw(d){this.a=d},
bbC:function bbC(d){this.a=d},
SR:function SR(d,e,f,g,h){var _=this
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
Ub:function Ub(d,e){var _=this
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
bbn:function bbn(d){this.a=d},
bbo:function bbo(d){this.a=d},
bbp:function bbp(d){this.a=d},
bbq:function bbq(d){this.a=d},
bbr:function bbr(d){this.a=d},
bbs:function bbs(d){this.a=d},
bbm:function bbm(d){this.a=d},
bbb:function bbb(d,e){this.a=d
this.b=e},
bba:function bba(d,e){this.a=d
this.b=e},
bb9:function bb9(d,e){this.a=d
this.b=e},
bbt:function bbt(d){this.a=d},
ac3:function ac3(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
aPT:function aPT(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aPU:function aPU(d){this.a=d},
aPV:function aPV(d){this.a=d},
aPW:function aPW(d){this.a=d},
a1A:function a1A(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
atj:function atj(d){this.a=d},
atk:function atk(d){this.a=d},
ant(d){var x=y.U,w=A.G(new A.W(A.b(d.split(" "),y.s),new B.bMf(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bMf:function bMf(){},
aKY:function aKY(){},
mH:function mH(d,e,f){this.e=d
this.a=e
this.b=f},
aGU:function aGU(d){this.a=d},
aGV:function aGV(d){this.a=d},
bPX(d){var x=new B.a5n(d)
x.awB(d)
return x},
a5n:function a5n(d){this.d=d},
aGR:function aGR(d){this.a=d},
aGS:function aGS(d){this.a=d},
aGT:function aGT(d){this.a=d},
aGD:function aGD(){},
aGF:function aGF(){},
aGG:function aGG(){},
aGH:function aGH(d){this.a=d},
aGE:function aGE(d){this.a=d},
ce5(d,e){var x=y.N
x=new B.a72(d,e,A.C(x,y.E),A.C(x,y.z))
x.awG(d,e)
return x},
a72:function a72(d,e,f,g){var _=this
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
bQt:function bQt(d){this.a=d},
coQ(){return C.b.m5(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bMn())!==-1},
bMn:function bMn(){},
bYB(){var x=A.b([],y.d),w=$.bYC
$.bYC=w+1
return new B.Ph(w,x,D.ajY,$.ad())},
Ph:function Ph(d,e,f,g){var _=this
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
bYD(d,e,f){return new B.Pj(d,f,e,null)},
Pj:function Pj(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pk:function Pk(){this.c=this.a=null},
aLe:function aLe(){},
aLg:function aLg(d){this.a=d},
aLf:function aLf(d){this.a=d},
bWP(d,e,f,g){var x,w={}
w.a=d
x=new B.a3S(g.i("a3S<0>"))
x.aws(e,f,w,g)
return x},
a3S:function a3S(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAj:function aAj(d,e){this.a=d
this.b=e},
aAi:function aAi(d){this.a=d},
V4:function V4(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgi:function bgi(){},
a9h:function a9h(d){this.b=this.a=$
this.$ti=d},
a9i:function a9i(){},
bOJ(d,e){return B.c8v(d,e)},
c8v(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bOJ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o6("ws")&&!d.o6("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xX(r,A.fL(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.cj(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fH(new B.Hn("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.or(r,"open",!1,y.C).gS(0).aB(new B.ase(p,q),y.H)
t=y.C
s=y.H
new A.or(r,"error",!1,t).gS(0).aB(new B.asf(p,q),s)
A.hT(r,"message",new B.asg(q),!1,y.m)
new A.or(r,"close",!1,t).gS(0).aB(new B.ash(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bOJ,w)},
xX:function xX(d,e){this.a=d
this.b=e},
ase:function ase(d,e){this.a=d
this.b=e},
asf:function asf(d,e){this.a=d
this.b=e},
asg:function asg(d){this.a=d},
ash:function ash(d,e){this.a=d
this.b=e},
bR6(){return new B.Hm("Connection Closed")},
te:function te(){},
GU:function GU(d){this.a=d},
D3:function D3(d){this.a=d},
Dt:function Dt(d,e){this.a=d
this.b=e},
Hn:function Hn(d){this.a=d},
Hm:function Hm(d){this.a=d},
c80(d){var x=null,w=$.aE,v=new B.a9h(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bWP(new A.cz(s,r.i("cz<1>")),new A.Cg(t,q.i("Cg<1>")),!0,u)
v.b=B.bWP(new A.cz(t,q.i("cz<1>")),new A.Cg(s,r.i("Cg<1>")),!1,u)
v=new B.aou(new A.aZ(new A.au(w,y.W),y.R),v)
v.awi(d)
return v},
aou:function aou(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
aoy:function aoy(d){this.a=d},
aov:function aov(d){this.a=d},
aow:function aow(d){this.a=d},
aox:function aox(d,e){this.a=d
this.b=e},
aoz:function aoz(d){this.a=d},
ali:function ali(d,e){this.b=d
this.a=e},
aap:function aap(d){this.a=d},
coq(d){switch(d){case"new":return D.ajL
case"checking":return D.ajM
case"connected":return D.ajO
case"completed":return D.ajN
case"failed":return D.KS
case"disconnected":return D.ajQ
case"closed":return D.KT
case"count":return D.ajP}return D.KT},
cor(d){switch(d){case"new":return D.KU
case"gathering":return D.ajR
case"complete":return D.ajS}return D.KU},
cq0(d){switch(d){case"stable":return D.ajT
case"have-local-offer":return D.ajU
case"have-local-pranswer":return D.ajW
case"have-remote-offer":return D.ajV
case"have-remote-pranswer":return D.ajX
case"closed":return D.L_}return D.L_},
cpC(d){switch(d){case"new":return D.KX
case"connecting":return D.KY
case"connected":return D.KZ
case"closed":return D.t7
case"disconnected":return D.KW
case"failed":return D.KV}return D.t7},
vR:function vR(d,e){this.a=d
this.b=e},
Pe:function Pe(d,e){this.a=d
this.b=e},
vQ:function vQ(d,e){this.a=d
this.b=e},
mT:function mT(d,e){this.a=d
this.b=e},
a73:function a73(d,e){this.a=d
this.b=e},
aKX:function aKX(){},
NU:function NU(){},
F5:function F5(){},
aGC:function aGC(){},
FL:function FL(d,e,f){this.a=d
this.b=e
this.c=f},
Pf:function Pf(){},
aL8:function aL8(){},
Av:function Av(d,e){this.a=d
this.b=e},
Pg:function Pg(d){this.b=d},
Pi:function Pi(d,e,f){this.a=d
this.b=e
this.c=f},
bPE(d){var x=0,w=A.k(y.y)
var $async$bPE=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bPE,w)},
aIR(d){var x=0,w=A.k(y.H),v
var $async$aIR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aUO("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aIR)
case 2:return A.i(null,w)}})
return A.j($async$aIR,w)},
aUO(d,e,f,g){return B.cgN(d,e,f,g,f.i("0?"))},
cgN(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUO=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aUN(),$async$aUO)
case 3:v=D.Gu.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUO,w)},
aUN(){var x=0,w=A.k(y.H),v,u
var $async$aUN=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c_g?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Gu.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aUN)
case 4:$.c_g=!0
case 3:return A.i(null,w)}})
return A.j($async$aUN,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[28]
E=c[18]
B.DQ.prototype={
D(d,e){this.a.D(0,e)},
d6(d,e){this.a.d6(d,e)},
a5(d){return this.a.a5(0)},
$idH:1}
B.QM.prototype={
iO(d){var x=A.cy("subscription"),w=A.fL(new B.aQu(x),null,null,!0,this.$ti.y[1])
x.b=d.eU(new B.aQv(this,w),w.gm0(w),w.gnH())
return new A.cz(w,A.u(w).i("cz<1>"))}}
B.aqg.prototype={}
B.Gv.prototype={}
B.a1O.prototype={}
B.p6.prototype={
N(){return new B.Uc()}}
B.Uc.prototype={
U(){var x=this
x.W()
x.KJ()
x.r=A.di(C.c2,new B.bbD(x))
x.w=A.iD(C.xQ,new B.bbE(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a2()},
XI(){var x=this.x
if(x!=null)x.V(0)
this.x=A.di(C.fW,new B.bbA(this))},
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
q=B.a0k(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbB(s))
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
q=B.a0k(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gali()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bbx(s))
s.XI()
x=1
break}s.n(new B.bby(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bbz(s))
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
break}s.n(new B.bbu(s))
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
r=A.N(n)
if(s.c==null){x=1
break}s.n(new B.bbv(s))
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
A.a8(q,!1).xu(A.e5(new B.bbw(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Kz,w)},
F7(d){return this.aRs(d)},
aRr(){return this.F7(!1)},
aRs(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
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
if(r!=null)A.a8(r,!1).bt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F7,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jU(C.r,s,A.c(B.ant(r.d),s,s,s,s,D.Nj,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.N9,C.V,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.az,new A.Y(D.ya,x,s),C.l,A.c(q,s,s,s,s,D.ug,s,s,s),D.Mu],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbC(t)
v=A.a("Accepter")
u=t.f?s:t.gaxj()
q.push(A.T(A.b([new B.SR(D.yT,C.aC,r,x,s),D.ans,new B.SR(D.yS,C.cB,v,u,s)],w),C.o,C.bi,C.i,s))}if(t.d)q.push(C.wu)
return A.eA(s,C.n,A.fl(!0,A.cC(A.I(q,C.o,C.e,C.W),s,s),!0,C.ai,!0,!0),s,s,s)}}
B.SR.prototype={
C(d){var x=this,w=null,v=A.d2(x.d,w,w,C.ai,C.cA,w)
return A.I(A.b([A.ac(A.b5(!1,A.c5(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dR,w,w,w)],y.p),C.o,C.e,C.W)}}
B.yD.prototype={
N(){return new B.Ub(A.b0(y.N),C.R)}}
B.Ub.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bYB()
w=B.bYB()
v.d!==$&&A.bj()
v.d=new B.aPT(x,w)
v.a.toString
x=new B.a1A(new A.ds(u,u,y.g),new A.ds(u,u,y.n))
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
q=B.a0k(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mD(A.a("Appel termin\xe9"))
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
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mD(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.ut(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$vg)
case 10:m.f=new B.bbe(s)
m.r=new B.bbf(s)
m.w=new B.bbg(s)
if(s.c==null){x=1
break}s.n(new B.bbh(s))
s.ch=A.di(C.c2,new B.bbi(s))
s.CW=A.iD(C.ck,new B.bbj(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.c0(k,A.u(k).i("c0<1>")).cA(s.gaWB())
k=m.w
s.cy=new A.c0(k,A.u(k).i("c0<1>")).cA(new B.bbk())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.Pc(C.c.Sn("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f7(C.ca,n,C.aj,!0))}s.ay=A.iD(C.fW,new B.bbl(s))
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
s.mD(null)
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
s.afs(B.bZ9(q))}u=2
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
afs(d){var x,w,v,u,t,s=this
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
x.Ao(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.bbn(s),y.a).fG(new B.bbo(s))
break
case"reponse":if(!s.a.f)return
u=B.c31(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.OQ(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.bbp(s),y.a).fG(new B.bbq(s))
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
x.GR().aB(new B.bbr(s),y.a).fG(new B.bbs(s))
break
case"refuse":s.mD(A.a("Appel refus\xe9"))
break
case"annule":s.mD(A.a("Appel annul\xe9"))
break
case"termine":s.mD(A.a("Appel termin\xe9"))
break}},
acw(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbm(w))},
yQ(d,e,f){return this.aEc(d,e,f)},
a8X(d,e){return this.yQ(d,e,!0)},
aEc(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yQ=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.aa()
x=6
return A.e(r.ajm(s.c,e,d),$async$yQ)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))
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
if(r!=null)A.a8(r,!1).bt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F3,w)},
mD(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.V(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.z(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.a8(x,!1).bt()},
KS(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.TA(u),$async$KS)
case 2:if(v.c!=null)v.n(new B.bbb(v,u))
return A.i(null,w)}})
return A.j($async$KS,w)},
KR(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.JQ(u),$async$KR)
case 2:if(v.c!=null)v.n(new B.bba(v,u))
return A.i(null,w)}})
return A.j($async$KR,w)},
KO(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KO=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Tx(u),$async$KO)
case 2:if(v.c!=null)v.n(new B.bb9(v,u))
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
if(w.d==="video"&&r.y){if(x!=null)x=B.bYD(o.e,!1,D.L1)
else{x=A.jU(C.r,q,A.c(B.ant(w.e),q,q,q,q,D.aqX,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aqz,q,q,q)
x=A.cC(A.I(A.b([x,C.p,w,C.l,A.c(r.w?B.bLm(r.ax):A.a(p),q,q,q,q,D.ug,q,q,q)],y.p),C.o,C.e,C.W),q,q)}x=A.FC(0,x)
o=A.fz(q,A.eL(A.O(12),B.bYD(o.d,!0,D.L1),C.ao),160,q,q,16,16,110)
w=r.w
v=B.bLm(r.ax)
u=r.z
t=r.Q
u=A.ew(C.b2,A.b([x,o,A.fz(24,B.c_p(r.as,v,w,!0,t,u,r.ga6E(),r.ga6D(),r.ga6F(),r.ga6G(),r.gacO()),q,q,0,0,q,q)],y.p),C.f,C.aY,q)
o=u}else{o=A.jU(C.r,q,A.c(B.ant(w.e),q,q,q,q,D.Nj,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.N9,C.V,q,q)
if(r.w)w=B.bLm(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.ug,q,q,q)
v=r.w
u=B.bLm(r.ax)
t=r.z
s=r.Q
t=A.cC(A.I(A.b([o,C.az,new A.Y(D.ya,x,q),C.l,w,D.Mu,B.c_p(r.as,u,v,!1,s,t,r.ga6E(),r.ga6D(),r.ga6F(),r.ga6G(),r.gacO())],y.p),C.o,C.e,C.W),q,q)
o=t}return A.bQn(!1,A.eA(q,C.n,A.fl(!0,o,!0,C.ai,!0,!0),q,q,q),new B.bbt(r),y.K)}}
B.ac3.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nm,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_9:D.a_8
t=A.b([new B.wF(x,r,A.a("Muet"),v.x,u,u),D.nY,new B.wF(D.a_f,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nY)
if(r){x=v.w
w=x?D.z_:D.a_e
t.push(new B.wF(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nY)
if(r)t.push(new B.wF(D.a_d,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nY)
t.push(new B.wF(D.yT,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.T(t,C.o,C.bi,C.i,u))
return A.I(s,C.o,C.e,C.W)}}
B.wF.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lL
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d2(u,v,v,C.ai,C.cA,v)
return A.I(A.b([A.ac(A.b5(!1,A.c5(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aW,A.c(w.e,v,v,v,v,C.Nn,v,v,v)],y.p),C.o,C.e,C.W)}}
B.aPT.prototype={
ut(d,e){return this.b9l(d,e)},
b9l(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
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
o.sa4I(0,q)
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
aCC(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4I(0,d)
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
Ao(d){return this.b0U(d)},
b0U(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ao=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.CV(0,new B.Av(d.h(0,"sdp"),d.h(0,"type"))),$async$Ao)
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
OQ(d){return this.aYU(d)},
aYU(d){var x=0,w=A.k(y.H),v=this,u
var $async$OQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.CV(0,new B.Av(d.h(0,"sdp"),d.h(0,"type"))),$async$OQ)
case 2:return A.i(null,w)}})
return A.j($async$OQ,w)},
OL(d){return this.aYG(d)},
aYG(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.OA(new B.FL(A.aM(d.h(0,"candidate")),A.aM(d.h(0,"sdpMid")),A.eh(d.h(0,"sdpMLineIndex")))),$async$OL)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OL,w)},
TA(d){return this.aq7(d)},
aq7(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$TA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T8(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skq(0,t)
return A.i(null,w)}})
return A.j($async$TA,w)},
JQ(d){return this.apZ(d)},
apZ(d){var x=0,w=A.k(y.H)
var $async$JQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aIR(d),$async$JQ)
case 2:return A.i(null,w)}})
return A.j($async$JQ,w)},
Tx(d){return this.apR(d)},
apR(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Tx=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jz(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skq(0,d)
return A.i(null,w)}})
return A.j($async$Tx,w)},
OT(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OT=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jz(0)
if(s==null)s=D.abF
if(s.length===0){x=1
break}x=3
return A.e(B.bPE(C.b.gS(s)),$async$OT)
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
else{o=A.G(q.T8(0),!0,y.G)
C.b.t(o,q.Jz(0))
q=o}if(q==null)q=C.dn
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
B.a1A.prototype={
Pc(d){return this.b_d(d)},
b_d(d){var x=0,w=A.k(y.H),v=this
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
q=B.c80(B.bOJ(A.cx(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Dq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cz(p,A.u(p).i("cz<1>")).aT(s.gaRa(),!0,s.gaQh(),new B.atj(s))
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
aRb(d){var x,w,v,u
try{x=C.Z.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bZ9(w))}catch(u){}},
Xz(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7T[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.di(A.d1(0,0,0,0,x),new B.atk(w))},
GX(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GX=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.e(y.x.b(s)?s:A.dj(s,y.H),$async$GX)
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
r=s.w=new B.ali(s,q)}s=r.a5(0)}x=7
return A.e(y._.b(s)?s:A.dj(s,y.z),$async$GX)
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
a_H(d,e){return this.b0K(d,e)},
b0K(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
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
v=B.ce5(C.cx.gld().bi(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_H,w)}}
B.mH.prototype={
T8(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fR(w,new B.aGU(x))
return x},
Jz(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fR(w,new B.aGV(x))
return x}}
B.a5n.prototype={
awB(d){var x=this,w=x.d
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
CG(d,e){return this.aoZ(0,e)},
aoZ(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CG=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.coQ())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iK(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aGF())
e.cq(0,"audio",new B.aGG())}catch(a0){A.nn("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fR(s,new B.aGH(r))
J.iK(e.h(0,"audio"),"optional")
J.jb(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bd(a0)
A.nn("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.dS(o.getUserMedia(h.a(n)),h),$async$CG)
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
return A.e(A.dS(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CG)
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
return A.j($async$CG,w)}}
B.a72.prototype={
awG(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bF(new B.aL0(x)))
w.addEventListener("icecandidate",A.bF(new B.aL1(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aL2(x)))
w.onicegatheringstatechange=A.bF(new B.aL3(x))
w.addEventListener("signalingstatechange",A.bF(new B.aL4(x)))
if(!$.bT7())w.addEventListener("connectionstatechange",A.bF(new B.aL5(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aL6(x)))
w.addEventListener("track",A.bF(new B.aL7(x)))},
Pn(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dS(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Pn)
case 3:t=f
v=new B.Av(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pn,w)},
Pl(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dS(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Pl)
case 3:t=f
v=new B.Av(t.sdp,t.type)
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
CT(d,e){return this.aq2(0,e)},
aq2(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CT=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dS(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CT)
case 2:return A.i(null,w)}})
return A.j($async$CT,w)},
CV(d,e){return this.aqi(0,e)},
aqi(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CV=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dS(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CV)
case 2:return A.i(null,w)}})
return A.j($async$CV,w)},
OA(d){return this.aYl(d)},
aYl(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$OA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.dS(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$OA)
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
B.bQt.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.Ph.prototype={
saly(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hp()
if(x!=null)x.style.objectFit=e},
afB(){var x=this,w=x.Hp(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.ais(u,x.z!=null,0,t))},
sa4I(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jz(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T8(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aE1()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hp()
if(u!=null){u.srcObject=t.x
x=t.Hp()
x.toString
t.a6s(x)}t.sl(0,t.a.b_C(t.z!=null))},
aE1(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
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
while(true)switch(x){case 0:$.CI()
$.oH().rb("RTCVideoRenderer-"+v.Q,new B.aLd(v),!0)
return A.i(null,w)}})
return A.j($async$is,w)},
a6s(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pj.prototype={
N(){return new B.Pk()}}
B.Pk.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a8(0,v.gaOm())
x=v.a
w=x.c
w.as=x.e
w.saly(0,x.d===D.L0?"contain":"cover")},
aOn(){if(this.c!=null)this.n(new B.aLe())},
k(){if(this.c!=null)this.a2()},
aS(d){var x,w
this.b7(d)
A.di(A.d1(0,0,10,0,0),new B.aLg(this))
x=this.a
w=x.c
w.saly(0,x.d===D.L0?"contain":"cover")},
C(d){return new A.i7(new B.aLf(this),null)}}
B.a3S.prototype={
aws(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.V4(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("V4<0>"))
if(f.a.gi2())f.a=new B.QM(g.i("@<0>").bV(g).i("QM<1,2>")).iO(f.a)
w=A.fL(null,new B.aAj(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
aca(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.d()
w.a5(0)}}
B.V4.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d6(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aGq(d,e)},
ho(d){return this.d6(d,null)},
aGq(d,e){var x=this
if(x.w){x.a.a.d6(d,e)
return}x.c.fo(d,e)
x.acb()
x.b.aca()
x.a.a.a5(0).fG(new B.bgi())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aca()
x.c.cj(0,x.a.a.a5(0))}return x.c.a},
acb(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dd(0)
return},
$idH:1}
B.a9h.prototype={}
B.a9i.prototype={}
B.xX.prototype={
a7D(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dt(d,e))
x.a5(0)},
a4h(d){var x
if((this.b.b&4)!==0)throw A.n(B.bR6())
x=A.bQ(d)
x.toString
this.a.send(x)},
wa(d,e,f){return this.aZZ(0,e,f)},
aZZ(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wa=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bR6())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wa,w)},
$ibR5:1}
B.te.prototype={}
B.GU.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GU&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.D3.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D3&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fW(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dt.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dt&&e.a===this.a&&e.b===this.b},
gH(d){return A.fW([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Hn.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibN:1}
B.Hm.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.aou.prototype={
awi(d){d.eG(new B.aoy(this),new B.aoz(this),y.a)}}
B.ali.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arX(0)}}
B.aap.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.vR.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pe.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vQ.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mT.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a73.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aKX.prototype={}
B.NU.prototype={}
B.F5.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGC.prototype={}
B.FL.prototype={}
B.Pf.prototype={}
B.aL8.prototype={}
B.Av.prototype={}
B.Pg.prototype={}
B.Pi.prototype={
ais(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Pi(x,w,v)},
b_C(d){return this.ais(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yD(E)","~(Gv)","bn(FL)","bn(Pg)","bn(mT)","~(@)","mH(@)","mH()","bn(bR5)","~(te)"])
B.aQu.prototype={
$0(){return J.c7e(this.a.bp())},
$S:1}
B.aQv.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d6(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqh.prototype={
$1(d){if(d==null)return null
return A.bY(J.l(d))},
$S:137}
B.bbD.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F7(!0)},
$S:0}
B.bbE.prototype={
$1(d){return this.a.Op()},
$S:33}
B.bbA.prototype={
$0(){var x=this.a.c
if(x!=null)A.a8(x,!1).bt()},
$S:0}
B.bbB.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bbx.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bby.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bbz.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbu.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bbv.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbw.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bWe(x.w,w,u,!1,v)},
$S:z+2}
B.bbC.prototype={
$0(){return this.a.aRr()},
$S:0}
B.bbe.prototype={
$1(d){this.a.yQ("candidat_ice",d,!1)},
$S:377}
B.bbf.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bbd())},
$S:0}
B.bbd.prototype={
$0(){},
$S:0}
B.bbg.prototype={
$0(){this.a.mD(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bbh.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bbi.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yQ("annule",C.e8,!1)
x.mD(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbj.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbc(x,w))},
$S:33}
B.bbc.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).ew(this.b)},
$S:0}
B.bbk.prototype={
$1(d){},
$S:135}
B.bbl.prototype={
$1(d){this.a.Ey()},
$S:33}
B.bbn.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acw()
x.a8X("reponse",d)},
$S:378}
B.bbo.prototype={
$1(d){this.a.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbp.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acw()},
$S:28}
B.bbq.prototype={
$1(d){this.a.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbr.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8X("offre",d)},
$S:378}
B.bbs.prototype={
$1(d){this.a.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbm.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.bbb.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bba.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bb9.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbt.prototype={
$2(d,e){if(!d)this.a.F3()},
$S:970}
B.aPU.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aPV.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aCC(w)},
$S:z+5}
B.aPW.prototype={
$1(d){var x
if(d===D.KS){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.atj.prototype={
$1(d){return this.a.Xz()},
$S:21}
B.atk.prototype={
$0(){var x=this.a
if(!x.e)x.Dq()},
$S:0}
B.bMf.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGU.prototype={
$1(d){return this.a.push(B.bPX(d))},
$S:21}
B.aGV.prototype={
$1(d){return this.a.push(B.bPX(d))},
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
$1(d){J.fR(d,new B.aGE(this.a))},
$S:377}
B.aGE.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:45}
B.aL0.prototype={
$1(d){},
$S:22}
B.aL1.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FL(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aL2.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.coq(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bT7())switch(w.cx.a){case 0:w.cy=D.KX
break
case 1:w.cy=D.KY
break
case 3:w.cy=D.KZ
break
case 5:w.cy=D.KV
break
case 6:w.cy=D.KW
break
case 7:w.cy=D.t7
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
x.ch=B.cq0(w.signalingState)},
$S:30}
B.aL5.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cpC(w.connectionState)},
$S:30}
B.aL6.prototype={
$1(d){},
$S:30}
B.aL7.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bPX(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>"))
w=J.eB(x,new B.aKZ(w),y.h)
v.$1(new B.Pg(A.G(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aKZ.prototype={
$1(d){return new B.mH(d,d.id,this.a.as)},
$S:z+8}
B.aL_.prototype={
$0(){var x=this.b.e
return new B.mH(x,x.id,this.a.as)},
$S:z+9}
B.bMn.prototype={
$1(d){return J.h_(self.window.navigator.userAgent,A.bL(d,!1,!1))},
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
x.a6s(t)
v=y.i.c
w.push(A.hT(t,"canplay",new B.aL9(x),!1,v))
w.push(A.hT(t,"resize",new B.aLa(x),!1,v))
w.push(A.hT(t,"error",new B.aLb(t),!1,v))
w.push(A.hT(t,"ended",new B.aLc(),!1,v))
return t},
$S:164}
B.aL9.prototype={
$1(d){this.a.afB()},
$S:21}
B.aLa.prototype={
$1(d){this.a.afB()},
$S:21}
B.aLb.prototype={
$1(d){var x,w,v=this.a.error
A.nn("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gi.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nX(x,C.Gh.h(0,A.ao(v,"code")),w,null))},
$S:26}
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
if(w.z!=null)w=A.a47("RTCVideoRenderer-"+w.Q)
else w=A.P(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cC(A.P(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:971}
B.aAj.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eU(w.ghn(w),new B.aAi(v),w.gnH())},
$S:0}
B.aAi.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.acb()
x=x.b
x===$&&A.d()
x.a5(0)},
$S:0}
B.bgi.prototype={
$1(d){},
$S:17}
B.ase.prototype={
$1(d){this.a.cj(0,this.b)},
$S:22}
B.asf.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fH(new B.Hn("Failed to connect WebSocket"))
else this.b.a7D(1006,"error")},
$S:22}
B.asg.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cy("data")
if(typeof x==="string")w.b=new B.GU(A.bx(x))
else if(typeof x==="object"&&A.bXh(y.m.a(x),"ArrayBuffer"))w.b=new B.D3(A.Ok(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bp())},
$S:26}
B.ash.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cj(0,this.b)
this.b.a7D(d.code,d.reason)},
$S:22}
B.aoy.prototype={
$1(d){var x=d.b,w=this.a
new A.cz(x,A.u(x).i("cz<1>")).cA(new B.aov(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cz(x,A.u(x).i("cz<1>")).b6r(new B.aow(d),new B.aox(w,d))
w.f.dd(0)},
$S:z+10}
B.aov.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GU
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.D3
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.Dt){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a5(0)}}},
$S:z+11}
B.aow.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bR6())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4h(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4h(new Uint8Array(A.cT(u)))
break $label1$1}t=A.aN("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.N(r) instanceof B.Hm))throw r}},
$S:18}
B.aox.prototype={
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
if(!(A.N(q) instanceof B.Hm))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.aoz.prototype={
$1(d){var x,w=d instanceof A.RN?d:new B.aap(J.l(d)),v=this.a
v.f.fH(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.ho(w)
v=v.a
v===$&&A.d()
v.a5(0)},
$S:30};(function aliases(){var x=B.DQ.prototype
x.arX=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Uc.prototype,"gaxj","Kz",0)
var v
w(v=B.Ub.prototype,"gaWB","afs",3)
x(v,"gacO","F3",0)
x(v,"ga6G","KS",0)
x(v,"ga6F","KR",0)
x(v,"ga6D","KO",0)
x(v,"ga6E","KP",0)
w(v=B.a1A.prototype,"gaRa","aRb",7)
x(v,"gaQh","Xz",1)
x(B.Ph.prototype,"gdJ","k",0)
x(B.Pk.prototype,"gaOm","aOn",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DQ,B.aqg,B.Gv,B.a1O,B.aPT,B.a1A,B.aKX,B.NU,B.F5,B.aGC,B.Pf,B.aL8,B.a9i,B.V4,B.a9h,B.xX,B.te,B.Hn,B.aap,B.FL,B.Av,B.Pg,B.Pi])
w(B.QM,A.fm)
x(A.jW,[B.aQu,B.bbD,B.bbA,B.bbB,B.bbx,B.bby,B.bbz,B.bbu,B.bbv,B.bbC,B.bbf,B.bbd,B.bbg,B.bbh,B.bbi,B.bbc,B.bbm,B.bbb,B.bba,B.bb9,B.atk,B.aGF,B.aGG,B.aL_,B.aLe,B.aLg,B.aAj,B.aAi,B.aox])
x(A.it,[B.aQv,B.aqh,B.bbE,B.bbw,B.bbe,B.bbj,B.bbk,B.bbl,B.bbn,B.bbo,B.bbp,B.bbq,B.bbr,B.bbs,B.aPU,B.aPV,B.aPW,B.atj,B.bMf,B.aGU,B.aGV,B.aGR,B.aGS,B.aGT,B.aGH,B.aL0,B.aL1,B.aL2,B.aL3,B.aL4,B.aL5,B.aL6,B.aL7,B.aKZ,B.bMn,B.aLd,B.aL9,B.aLa,B.aLb,B.aLc,B.bgi,B.ase,B.asf,B.asg,B.ash,B.aoy,B.aov,B.aow,B.aoz])
x(A.M,[B.p6,B.yD,B.Pj])
x(A.S,[B.Uc,B.Ub,B.Pk])
x(A.at,[B.SR,B.ac3,B.wF])
x(A.qJ,[B.bbt,B.aGE,B.aLf])
w(B.aKY,B.aKX)
w(B.mH,B.NU)
w(B.a5n,B.F5)
w(B.aGD,B.aGC)
w(B.a72,B.Pf)
w(B.bQt,B.aL8)
w(B.Ph,A.d4)
x(B.a9i,[B.a3S,B.aou])
x(B.te,[B.GU,B.D3,B.Dt])
w(B.Hm,B.Hn)
w(B.ali,B.DQ)
x(A.HQ,[B.vR,B.Pe,B.vQ,B.mT,B.a73])})()
A.oy(b.typeUniverse,JSON.parse('{"DQ":{"dH":["1"]},"QM":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yD":{"M":[],"m":[]},"p6":{"M":[],"m":[]},"Uc":{"S":["p6"]},"SR":{"at":[],"m":[]},"Ub":{"S":["yD"]},"ac3":{"at":[],"m":[]},"wF":{"at":[],"m":[]},"mH":{"NU":[]},"a5n":{"F5":[]},"a72":{"Pf":[]},"Ph":{"d4":["Pi"],"aV":[]},"Pj":{"M":[],"m":[]},"Pk":{"S":["Pj"]},"V4":{"dH":["1"]},"xX":{"bR5":[]},"GU":{"te":[]},"D3":{"te":[]},"Dt":{"te":[]},"Hn":{"bN":[]},"Hm":{"bN":[]},"ali":{"dH":["@"]},"aap":{"bN":[]}}'))
A.bRy(b.typeUniverse,JSON.parse('{"DQ":1,"a9i":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xX"),L:x("bN"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F5>"),d:x("D<iB<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("J<av>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NU"),G:x("F5"),h:x("mH"),o:x("pu"),a:x("bn"),K:x("a0"),J:x("Pf"),v:x("Av"),Z:x("a9h<a0?>"),N:x("o"),e:x("pY"),M:x("e1"),D:x("te"),U:x("W<o>"),g:x("ds<Gv>"),n:x("ds<~>"),V:x("aZ<xX>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Um<av>"),C:x("or<av>"),k:x("au<xX>"),c:x("au<@>"),W:x("au<~>"),q:x("kw"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Uv=new B.a1O(C.kc)
D.ya=new A.al(32,0,32,0)
D.yS=new A.aj(57638,"MaterialIcons",null,!1)
D.yT=new A.aj(57639,"MaterialIcons",null,!1)
D.a_8=new A.aj(58337,"MaterialIcons",null,!1)
D.a_9=new A.aj(58341,"MaterialIcons",null,!1)
D.a_d=new A.aj(58923,"MaterialIcons",null,!1)
D.z_=new A.aj(59048,"MaterialIcons",null,!1)
D.a_e=new A.aj(59049,"MaterialIcons",null,!1)
D.a_f=new A.aj(59077,"MaterialIcons",null,!1)
D.a7T=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.abF=A.b(x([]),y.Q)
D.Gu=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.ajL=new B.mT(0,"RTCIceConnectionStateNew")
D.ajM=new B.mT(1,"RTCIceConnectionStateChecking")
D.ajN=new B.mT(2,"RTCIceConnectionStateCompleted")
D.ajO=new B.mT(3,"RTCIceConnectionStateConnected")
D.ajP=new B.mT(4,"RTCIceConnectionStateCount")
D.KS=new B.mT(5,"RTCIceConnectionStateFailed")
D.ajQ=new B.mT(6,"RTCIceConnectionStateDisconnected")
D.KT=new B.mT(7,"RTCIceConnectionStateClosed")
D.KU=new B.Pe(0,"RTCIceGatheringStateNew")
D.ajR=new B.Pe(1,"RTCIceGatheringStateGathering")
D.ajS=new B.Pe(2,"RTCIceGatheringStateComplete")
D.t7=new B.vQ(0,"RTCPeerConnectionStateClosed")
D.KV=new B.vQ(1,"RTCPeerConnectionStateFailed")
D.KW=new B.vQ(2,"RTCPeerConnectionStateDisconnected")
D.KX=new B.vQ(3,"RTCPeerConnectionStateNew")
D.KY=new B.vQ(4,"RTCPeerConnectionStateConnecting")
D.KZ=new B.vQ(5,"RTCPeerConnectionStateConnected")
D.ajT=new B.vR(0,"RTCSignalingStateStable")
D.ajU=new B.vR(1,"RTCSignalingStateHaveLocalOffer")
D.ajV=new B.vR(2,"RTCSignalingStateHaveRemoteOffer")
D.ajW=new B.vR(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajX=new B.vR(4,"RTCSignalingStateHaveRemotePrAnswer")
D.L_=new B.vR(5,"RTCSignalingStateClosed")
D.ajY=new B.Pi(0,0,0)
D.L0=new B.a73(0,"RTCVideoViewObjectFitContain")
D.L1=new B.a73(1,"RTCVideoViewObjectFitCover")
D.nY=new A.c4(20,null,null,null)
D.ans=new A.c4(48,null,null,null)
D.Mu=new A.c4(null,64,null,null)
D.aqz=new A.y(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.N9=new A.y(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqX=new A.y(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nj=new A.y(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ug=new A.y(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c_g=!1
$.bYC=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cto","c4H",()=>new B.aKY())
x($,"crs","bT7",()=>C.c.q(A.ao(A.ao(A.ao(A.bSM(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"0IC7Zw07In3ISQeGmGqJVOqFN2s=");