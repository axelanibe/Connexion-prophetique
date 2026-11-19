((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DQ:function DQ(){},QN:function QN(d){this.$ti=d},aR7:function aR7(d){this.a=d},aR8:function aR8(d,e){this.a=d
this.b=e},
a0j(d){var x,w,v,u,t,s=new B.aqh(),r=J.Q(d),q=r.h(d,"id")
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
return new B.aqg(q,x,w,v,u,t)},
bZJ(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mg(t,y.N,y.z):C.e8
if(u.h(d,"cree_le")!=null)A.c5(J.l(u.h(d,"cree_le")))
return new B.Gv(s,x,w,v)},
c9N(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Un
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mg(s,u,t))}return new B.a1N(x)},
bLV(d){var x=C.h.b_(d.a,1e6)
return C.c.aZ(C.h.j(C.h.b_(x,60)),2,"0")+":"+C.c.aZ(C.h.j(C.h.aP(x,60)),2,"0")},
c3B(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oE(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ahx(w,v)},
cnm(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
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
a1N:function a1N(d){this.a=d},
bWO(d,e,f,g,h,i){return new B.p6(e,f,i,h,d,null)},
bWN(d,e,f,g,h){return new B.yC(e,h,f,g,d,null)},
c0_(d,e,f,g,h,i,j,k,l,m,n){return new B.ac2(g,f,e,i,h,d,m,l,k,j,n,null)},
p6:function p6(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Ud:function Ud(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bcf:function bcf(d){this.a=d},
bcg:function bcg(d){this.a=d},
bcc:function bcc(d){this.a=d},
bcd:function bcd(d){this.a=d},
bc9:function bc9(d){this.a=d},
bca:function bca(d){this.a=d},
bcb:function bcb(d){this.a=d},
bc6:function bc6(d){this.a=d},
bc7:function bc7(d){this.a=d},
bc8:function bc8(d){this.a=d},
bce:function bce(d){this.a=d},
SS:function SS(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yC:function yC(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Uc:function Uc(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
bbR:function bbR(d){this.a=d},
bbS:function bbS(d){this.a=d},
bbQ:function bbQ(){},
bbT:function bbT(d){this.a=d},
bbU:function bbU(d){this.a=d},
bbV:function bbV(d){this.a=d},
bbW:function bbW(d){this.a=d},
bbP:function bbP(d,e){this.a=d
this.b=e},
bbX:function bbX(){},
bbY:function bbY(d){this.a=d},
bc_:function bc_(d){this.a=d},
bc0:function bc0(d){this.a=d},
bc1:function bc1(d){this.a=d},
bc2:function bc2(d){this.a=d},
bc3:function bc3(d){this.a=d},
bc4:function bc4(d){this.a=d},
bbZ:function bbZ(d){this.a=d},
bbO:function bbO(d,e){this.a=d
this.b=e},
bbN:function bbN(d,e){this.a=d
this.b=e},
bbM:function bbM(d,e){this.a=d
this.b=e},
bc5:function bc5(d){this.a=d},
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
wF:function wF(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aQv:function aQv(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aQw:function aQw(d){this.a=d},
aQx:function aQx(d){this.a=d},
aQy:function aQy(d){this.a=d},
a1z:function a1z(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
atj:function atj(d){this.a=d},
atk:function atk(d){this.a=d},
ant(d){var x=y.U,w=A.H(new A.X(A.b(d.split(" "),y.s),new B.bMP(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bMP:function bMP(){},
aLA:function aLA(){},
mI:function mI(d,e,f){this.e=d
this.a=e
this.b=f},
aGV:function aGV(d){this.a=d},
aGW:function aGW(d){this.a=d},
bQw(d){var x=new B.a5m(d)
x.awB(d)
return x},
a5m:function a5m(d){this.d=d},
aGS:function aGS(d){this.a=d},
aGT:function aGT(d){this.a=d},
aGU:function aGU(d){this.a=d},
aGE:function aGE(){},
aGG:function aGG(){},
aGH:function aGH(){},
aGI:function aGI(d){this.a=d},
aGF:function aGF(d){this.a=d},
ceA(d,e){var x=y.N
x=new B.a71(d,e,A.C(x,y.E),A.C(x,y.z))
x.awG(d,e)
return x},
a71:function a71(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aLD:function aLD(d){this.a=d},
aLE:function aLE(d){this.a=d},
aLF:function aLF(d){this.a=d},
aLG:function aLG(d){this.a=d},
aLH:function aLH(d){this.a=d},
aLI:function aLI(d){this.a=d},
aLJ:function aLJ(d){this.a=d},
aLK:function aLK(d){this.a=d},
aLB:function aLB(d){this.a=d},
aLC:function aLC(d,e){this.a=d
this.b=e},
bR3:function bR3(d){this.a=d},
cpj(){return C.b.m5(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bMX())!==-1},
bMX:function bMX(){},
bZa(){var x=A.b([],y.d),w=$.bZb
$.bZb=w+1
return new B.Pi(w,x,D.ajq,$.af())},
Pi:function Pi(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aLQ:function aLQ(d){this.a=d},
aLM:function aLM(d){this.a=d},
aLN:function aLN(d){this.a=d},
aLO:function aLO(d){this.a=d},
aLP:function aLP(){},
bZc(d,e,f){return new B.Pk(d,f,e,null)},
Pk:function Pk(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pl:function Pl(){this.c=this.a=null},
aLR:function aLR(){},
aLT:function aLT(d){this.a=d},
aLS:function aLS(d){this.a=d},
bXn(d,e,f,g){var x,w={}
w.a=d
x=new B.a3R(g.i("a3R<0>"))
x.aws(e,f,w,g)
return x},
a3R:function a3R(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAj:function aAj(d,e){this.a=d
this.b=e},
aAi:function aAi(d){this.a=d},
V5:function V5(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgV:function bgV(){},
a9f:function a9f(d){this.b=this.a=$
this.$ti=d},
a9g:function a9g(){},
bPj(d,e){return B.c95(d,e)},
c95(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bPj=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o6("ws")&&!d.o6("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xW(r,A.fH(null,null,null,!1,y.D))
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
return A.j($async$bPj,w)},
xW:function xW(d,e){this.a=d
this.b=e},
ase:function ase(d,e){this.a=d
this.b=e},
asf:function asf(d,e){this.a=d
this.b=e},
asg:function asg(d){this.a=d},
ash:function ash(d,e){this.a=d
this.b=e},
bRG(){return new B.Hm("Connection Closed")},
tg:function tg(){},
GU:function GU(d){this.a=d},
D3:function D3(d){this.a=d},
Dt:function Dt(d,e){this.a=d
this.b=e},
Hn:function Hn(d){this.a=d},
Hm:function Hm(d){this.a=d},
c8B(d){var x=null,w=$.aE,v=new B.a9f(y.Z),u=y.X,t=A.fH(x,x,x,!0,u),s=A.fH(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bXn(new A.cA(s,r.i("cA<1>")),new A.Cg(t,q.i("Cg<1>")),!0,u)
v.b=B.bXn(new A.cA(t,q.i("cA<1>")),new A.Cg(s,r.i("Cg<1>")),!1,u)
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
aao:function aao(d){this.a=d},
coU(d){switch(d){case"new":return D.ajd
case"checking":return D.aje
case"connected":return D.ajg
case"completed":return D.ajf
case"failed":return D.KN
case"disconnected":return D.aji
case"closed":return D.KO
case"count":return D.ajh}return D.KO},
coV(d){switch(d){case"new":return D.KP
case"gathering":return D.ajj
case"complete":return D.ajk}return D.KP},
cqr(d){switch(d){case"stable":return D.ajl
case"have-local-offer":return D.ajm
case"have-local-pranswer":return D.ajo
case"have-remote-offer":return D.ajn
case"have-remote-pranswer":return D.ajp
case"closed":return D.KV}return D.KV},
cq2(d){switch(d){case"new":return D.KS
case"connecting":return D.KT
case"connected":return D.KU
case"closed":return D.rZ
case"disconnected":return D.KR
case"failed":return D.KQ}return D.rZ},
vT:function vT(d,e){this.a=d
this.b=e},
Pf:function Pf(d,e){this.a=d
this.b=e},
vS:function vS(d,e){this.a=d
this.b=e},
mU:function mU(d,e){this.a=d
this.b=e},
a72:function a72(d,e){this.a=d
this.b=e},
aLz:function aLz(){},
NU:function NU(){},
F5:function F5(){},
aGD:function aGD(){},
FL:function FL(d,e,f){this.a=d
this.b=e
this.c=f},
Pg:function Pg(){},
aLL:function aLL(){},
Au:function Au(d,e){this.a=d
this.b=e},
Ph:function Ph(d){this.b=d},
Pj:function Pj(d,e,f){this.a=d
this.b=e
this.c=f},
bQe(d){var x=0,w=A.k(y.y)
var $async$bQe=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bQe,w)},
aJs(d){var x=0,w=A.k(y.H),v
var $async$aJs=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aVq("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aJs)
case 2:return A.i(null,w)}})
return A.j($async$aJs,w)},
aVq(d,e,f,g){return B.chg(d,e,f,g,f.i("0?"))},
chg(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aVq=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aVp(),$async$aVq)
case 3:v=D.Gn.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVq,w)},
aVp(){var x=0,w=A.k(y.H),v,u
var $async$aVp=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c_R?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Gn.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aVp)
case 4:$.c_R=!0
case 3:return A.i(null,w)}})
return A.j($async$aVp,w)}},D,E
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
B.QN.prototype={
iM(d){var x=A.cz("subscription"),w=A.fH(new B.aR7(x),null,null,!0,this.$ti.y[1])
x.b=d.eU(new B.aR8(this,w),w.gm0(w),w.gnH())
return new A.cA(w,A.u(w).i("cA<1>"))}}
B.aqg.prototype={}
B.Gv.prototype={}
B.a1N.prototype={}
B.p6.prototype={
N(){return new B.Ud()}}
B.Ud.prototype={
U(){var x=this
x.W()
x.KJ()
x.r=A.dg(C.c4,new B.bcf(x))
x.w=A.iB(C.xC,new B.bcg(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a2()},
XI(){var x=this.x
if(x!=null)x.V(0)
this.x=A.dg(C.fX,new B.bcc(this))},
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
q=B.a0j(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bcd(s))
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
q=B.a0j(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.galh()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bc9(s))
s.XI()
x=1
break}s.n(new B.bca(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bcb(s))
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
break}s.n(new B.bc6(s))
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
break}s.n(new B.bc7(s))
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
A.a9(q,!1).xu(A.e5(new B.bc8(s),null,y.z))
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
B(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jU(C.r,s,A.c(B.ant(r.d),s,s,s,s,D.Nf,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.N4,C.W,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.az,new A.Y(D.xY,x,s),C.k,A.c(q,s,s,s,s,D.u6,s,s,s),D.Mp],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bce(t)
v=A.a("Accepter")
u=t.f?s:t.gaxj()
q.push(A.W(A.b([new B.SS(D.yK,C.aC,r,x,s),D.amV,new B.SS(D.yJ,C.cB,v,u,s)],w),C.o,C.bl,C.i,s))}if(t.d)q.push(C.wj)
return A.ez(s,C.n,A.fl(!0,A.cB(A.I(q,C.o,C.e,C.V),s,s),!0,C.aj,!0,!0),s,s,s)}}
B.SS.prototype={
B(d){var x=this,w=null,v=A.dj(x.d,w,w,C.aj,C.ck,w)
return A.I(A.b([A.ab(A.b5(!1,A.c2(x.c,C.l,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.eg,w,w,w)],y.p),C.o,C.e,C.V)}}
B.yC.prototype={
N(){return new B.Uc(A.b0(y.N),C.R)}}
B.Uc.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bZa()
w=B.bZa()
v.d!==$&&A.bj()
v.d=new B.aQv(x,w)
v.a.toString
x=new B.a1z(new A.ds(u,u,y.g),new A.ds(u,u,y.n))
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
w.iS()
w=x.e
w===$&&A.d()
w.GW()
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
q=B.a0j(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mC(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Q2(),$async$vg)
case 8:p=e
o=B.c9N(p)
x=9
return A.e(s.UE(),$async$vg)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.C(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mC(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.ut(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$vg)
case 10:m.f=new B.bbR(s)
m.r=new B.bbS(s)
m.w=new B.bbT(s)
if(s.c==null){x=1
break}s.n(new B.bbU(s))
s.ch=A.dg(C.c4,new B.bbV(s))
s.CW=A.iB(C.cl,new B.bbW(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.c0(k,A.u(k).i("c0<1>")).cA(s.gaWA())
k=m.w
s.cy=new A.c0(k,A.u(k).i("c0<1>")).cA(new B.bbX())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.Pc(C.c.So("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f7(C.cb,n,C.ai,!0))}s.ay=A.iB(C.fX,new B.bbY(s))
s.Ey()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.C(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mC(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$vg,w)},
UE(){var x=0,w=A.k(y.y),v
var $async$UE=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$UE,w)},
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
s.afq(B.bZJ(q))}u=2
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
afq(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c3B(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Ao(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.bc_(s),y.a).fG(new B.bc0(s))
break
case"reponse":if(!s.a.f)return
u=B.c3B(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.OQ(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.bc1(s),y.a).fG(new B.bc2(s))
break
case"candidat_ice":t=B.cnm(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.OL(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.GQ().aB(new B.bc3(s),y.a).fG(new B.bc4(s))
break
case"refuse":s.mC(A.a("Appel refus\xe9"))
break
case"annule":s.mC(A.a("Appel annul\xe9"))
break
case"termine":s.mC(A.a("Appel termin\xe9"))
break}},
acu(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbZ(w))},
yQ(d,e,f){return this.aEc(d,e,f)},
a8V(d,e){return this.yQ(d,e,!0)},
aEc(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yQ=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.aa()
x=6
return A.e(r.ajk(s.c,e,d),$async$yQ)
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
if(d!=null&&w.c!=null)w.c.u(y.q).f.C(A.z(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.a9(x,!1).bt()},
KS(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.TB(u),$async$KS)
case 2:if(v.c!=null)v.n(new B.bbO(v,u))
return A.i(null,w)}})
return A.j($async$KS,w)},
KR(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.JQ(u),$async$KR)
case 2:if(v.c!=null)v.n(new B.bbN(v,u))
return A.i(null,w)}})
return A.j($async$KR,w)},
KO(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KO=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ty(u),$async$KO)
case 2:if(v.c!=null)v.n(new B.bbM(v,u))
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
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bZc(o.e,!1,D.KX)
else{x=A.jU(C.r,q,A.c(B.ant(w.e),q,q,q,q,D.aqi,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.apW,q,q,q)
x=A.cB(A.I(A.b([x,C.p,w,C.k,A.c(r.w?B.bLV(r.ax):A.a(p),q,q,q,q,D.u6,q,q,q)],y.p),C.o,C.e,C.V),q,q)}x=A.FC(0,x)
o=A.fA(q,A.eL(A.P(12),B.bZc(o.d,!0,D.KX),C.am),160,q,q,16,16,110)
w=r.w
v=B.bLV(r.ax)
u=r.z
t=r.Q
u=A.ew(C.b1,A.b([x,o,A.fA(24,B.c0_(r.as,v,w,!0,t,u,r.ga6C(),r.ga6B(),r.ga6D(),r.ga6E(),r.gacM()),q,q,0,0,q,q)],y.p),C.f,C.aY,q)
o=u}else{o=A.jU(C.r,q,A.c(B.ant(w.e),q,q,q,q,D.Nf,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.N4,C.W,q,q)
if(r.w)w=B.bLV(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.u6,q,q,q)
v=r.w
u=B.bLV(r.ax)
t=r.z
s=r.Q
t=A.cB(A.I(A.b([o,C.az,new A.Y(D.xY,x,q),C.k,w,D.Mp,B.c0_(r.as,u,v,!1,s,t,r.ga6C(),r.ga6B(),r.ga6D(),r.ga6E(),r.gacM())],y.p),C.o,C.e,C.V),q,q)
o=t}return A.bQY(!1,A.ez(q,C.n,A.fl(!0,o,!0,C.aj,!0,!0),q,q,q),new B.bc5(r),y.K)}}
B.ac2.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nj,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.ZY:D.ZX
t=A.b([new B.wF(x,r,A.a("Muet"),v.x,u,u),D.nX,new B.wF(D.a_3,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nX)
if(r){x=v.w
w=x?D.yP:D.a_2
t.push(new B.wF(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nX)
if(r)t.push(new B.wF(D.a_1,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nX)
t.push(new B.wF(D.yK,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.W(t,C.o,C.bl,C.i,u))
return A.I(s,C.o,C.e,C.V)}}
B.wF.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lE
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dj(u,v,v,C.aj,C.ck,v)
return A.I(A.b([A.ab(A.b5(!1,A.c2(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aX,A.c(w.e,v,v,v,v,C.Nk,v,v,v)],y.p),C.o,C.e,C.V)}}
B.aQv.prototype={
ut(d,e){return this.b9i(d,e)},
b9i(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$ut=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.ip(0),$async$ut)
case 2:x=3
return A.e(v.e.ip(0),$async$ut)
case 3:u=$.c5h()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aGE().CG(0,A.a6(["audio",!0,"video",t],s,r)),$async$ut)
case 4:q=v.b=g
o.sa4G(0,q)
x=5
return A.e(u.a_H(d,A.C(s,r)),$async$ut)
case 5:p=v.a=g
x=6
return A.e(p.kl(0,q),$async$ut)
case 6:p.e=new B.aQw(v)
p.Q=new B.aQx(v)
p.d=new B.aQy(v)
return A.i(null,w)}})
return A.j($async$ut,w)},
aCC(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4G(0,d)
x=w.r
if(x!=null)x.$0()}},
GQ(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GQ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Po(0),$async$GQ)
case 3:t=e
x=4
return A.e(s.CT(0,t),$async$GQ)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GQ,w)},
Ao(d){return this.b0S(d)},
b0S(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ao=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.CV(0,new B.Au(d.h(0,"sdp"),d.h(0,"type"))),$async$Ao)
case 3:x=4
return A.e(s.Pm(0),$async$Ao)
case 4:t=f
x=5
return A.e(s.CT(0,t),$async$Ao)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ao,w)},
OQ(d){return this.aYT(d)},
aYT(d){var x=0,w=A.k(y.H),v=this,u
var $async$OQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.CV(0,new B.Au(d.h(0,"sdp"),d.h(0,"type"))),$async$OQ)
case 2:return A.i(null,w)}})
return A.j($async$OQ,w)},
OL(d){return this.aYF(d)},
aYF(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.OA(new B.FL(A.aP(d.h(0,"candidate")),A.aP(d.h(0,"sdpMid")),A.eg(d.h(0,"sdpMLineIndex")))),$async$OL)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OL,w)},
TB(d){return this.aq7(d)},
aq7(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$TB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T9(0)
if(r==null)r=C.dq
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skq(0,t)
return A.i(null,w)}})
return A.j($async$TB,w)},
JQ(d){return this.apZ(d)},
apZ(d){var x=0,w=A.k(y.H)
var $async$JQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aJs(d),$async$JQ)
case 2:return A.i(null,w)}})
return A.j($async$JQ,w)},
Ty(d){return this.apR(d)},
apR(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ty=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jz(0)
if(s==null)s=C.dq
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skq(0,d)
return A.i(null,w)}})
return A.j($async$Ty,w)},
OT(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OT=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jz(0)
if(s==null)s=D.abb
if(s.length===0){x=1
break}x=3
return A.e(B.bQe(C.b.gS(s)),$async$OT)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OT,w)},
iS(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iS=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a5(0)
x=7
return A.e(y.x.b(q)?q:A.dh(q,y.H),$async$iS)
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
else{o=A.H(q.T9(0),!0,y.G)
C.b.t(o,q.Jz(0))
q=o}if(q==null)q=C.dq
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c8v(r)
if(!m.b(k)){j=new A.au($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$iS)
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
return A.e(s.d.k(),$async$iS)
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
return A.e(s.e.k(),$async$iS)
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
return A.j($async$iS,w)}}
B.a1z.prototype={
Pc(d){return this.b_c(d)},
b_c(d){var x=0,w=A.k(y.H),v=this
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
q=B.c8B(B.bPj(A.cy(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Dq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cA(p,A.u(p).i("cA<1>")).aT(s.gaRb(),!0,s.gaQi(),new B.atj(s))
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
if((v.c&4)===0)v.D(0,B.bZJ(w))}catch(u){}},
Xz(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7p[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.dg(A.d3(0,0,0,0,x),new B.atk(w))},
GW(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GW=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.e(y.x.b(s)?s:A.dh(s,y.H),$async$GW)
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
return A.e(y._.b(s)?s:A.dh(s,y.z),$async$GW)
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
return A.j($async$GW,w)}}
B.aLA.prototype={
a_H(d,e){return this.b0I(d,e)},
b0I(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_H=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fw(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.ceA(C.cy.gld().bi(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_H,w)}}
B.mI.prototype={
T9(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fM(w,new B.aGV(x))
return x},
Jz(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fM(w,new B.aGW(x))
return x}}
B.a5m.prototype={
awB(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aGS(x)))
w.addEventListener("mute",A.bF(new B.aGT(x)))
w.addEventListener("unmute",A.bF(new B.aGU(x)))},
skq(d,e){this.d.enabled=e},
aF(d){var x=0,w=A.k(y.H),v=this
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aF,w)}}
B.aGE.prototype={
CG(d,e){return this.aoZ(0,e)},
aoZ(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CG=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cpj())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iI(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aGG())
e.cq(0,"audio",new B.aGH())}catch(a0){A.nn("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fM(s,new B.aGI(r))
J.iI(e.h(0,"audio"),"optional")
J.ja(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bc(a0)
A.nn("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.dQ(o.getUserMedia(h.a(n)),h),$async$CG)
case 10:m=a2
i=m
h=i.id
v=new B.mI(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.dQ(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CG)
case 11:l=a2
h=l
g=h.id
v=new B.mI(h,g,"local")
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
B.a71.prototype={
awG(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bF(new B.aLD(x)))
w.addEventListener("icecandidate",A.bF(new B.aLE(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aLF(x)))
w.onicegatheringstatechange=A.bF(new B.aLG(x))
w.addEventListener("signalingstatechange",A.bF(new B.aLH(x)))
if(!$.bTF())w.addEventListener("connectionstatechange",A.bF(new B.aLI(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aLJ(x)))
w.addEventListener("track",A.bF(new B.aLK(x)))},
Po(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Po=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dQ(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Po)
case 3:t=f
v=new B.Au(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Po,w)},
Pm(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dQ(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Pm)
case 3:t=f
v=new B.Au(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pm,w)},
kl(d,e){var x
this.ax.cq(0,e.a,new B.aLC(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cH(null,y.H)},
CT(d,e){return this.aq2(0,e)},
aq2(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CT=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dQ(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CT)
case 2:return A.i(null,w)}})
return A.j($async$CT,w)},
CV(d,e){return this.aqi(0,e)},
aqi(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CV=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dQ(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CV)
case 2:return A.i(null,w)}})
return A.j($async$CV,w)},
OA(d){return this.aYk(d)},
aYk(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$OA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.dQ(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$OA)
case 2:return A.i(null,w)}})
return A.j($async$OA,w)},
a5(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cH(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5,w)}}
B.bR3.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.Pi.prototype={
salx(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Ho()
if(x!=null)x.style.objectFit=e},
afz(){var x=this,w=x.Ho(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.aiq(u,x.z!=null,0,t))},
sa4G(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jz(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T9(0).length!==0){t.y=new self.MediaStream()
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
if(x!=null)x.srcObject=t.y}u=t.Ho()
if(u!=null){u.srcObject=t.x
x=t.Ho()
x.toString
t.a6q(x)}t.sl(0,t.a.b_B(t.z!=null))},
aE1(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Ho(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].V(0)
q=u.Ho()
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
ip(d){var x=0,w=A.k(y.H),v=this
var $async$ip=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CI()
$.oH().rb("RTCVideoRenderer-"+v.Q,new B.aLQ(v),!0)
return A.i(null,w)}})
return A.j($async$ip,w)},
a6q(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pk.prototype={
N(){return new B.Pl()}}
B.Pl.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a8(0,v.gaOn())
x=v.a
w=x.c
w.as=x.e
w.salx(0,x.d===D.KW?"contain":"cover")},
aOo(){if(this.c!=null)this.n(new B.aLR())},
k(){if(this.c!=null)this.a2()},
aS(d){var x,w
this.b6(d)
A.dg(A.d3(0,0,10,0,0),new B.aLT(this))
x=this.a
w=x.c
w.salx(0,x.d===D.KW?"contain":"cover")},
B(d){return new A.iu(new B.aLS(this),null)}}
B.a3R.prototype={
aws(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.V5(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("V5<0>"))
if(f.a.gi1())f.a=new B.QN(g.i("@<0>").bV(g).i("QN<1,2>")).iM(f.a)
w=A.fH(null,new B.aAj(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
ac8(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.d()
w.a5(0)}}
B.V5.prototype={
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
x.ac9()
x.b.ac8()
x.a.a.a5(0).fG(new B.bgV())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ac8()
x.c.cj(0,x.a.a.a5(0))}return x.c.a},
ac9(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dd(0)
return},
$idH:1}
B.a9f.prototype={}
B.a9g.prototype={}
B.xW.prototype={
a7B(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dt(d,e))
x.a5(0)},
a4f(d){var x
if((this.b.b&4)!==0)throw A.n(B.bRG())
x=A.bQ(d)
x.toString
this.a.send(x)},
wa(d,e,f){return this.aZY(0,e,f)},
aZY(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wa=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bRG())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wa,w)},
$ibRF:1}
B.tg.prototype={}
B.GU.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GU&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.D3.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D3&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fR(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dt.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dt&&e.a===this.a&&e.b===this.b},
gH(d){return A.fR([this.a,this.b])},
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
awi(d){d.eF(new B.aoy(this),new B.aoz(this),y.a)}}
B.ali.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arX(0)}}
B.aao.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.vT.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pf.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vS.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mU.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a72.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aLz.prototype={}
B.NU.prototype={}
B.F5.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGD.prototype={}
B.FL.prototype={}
B.Pg.prototype={}
B.aLL.prototype={}
B.Au.prototype={}
B.Ph.prototype={}
B.Pj.prototype={
aiq(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Pj(x,w,v)},
b_B(d){return this.aiq(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yC(E)","~(Gv)","bn(FL)","bn(Ph)","bn(mU)","~(@)","mI(@)","mI()","bn(bRF)","~(tg)"])
B.aR7.prototype={
$0(){return J.c7P(this.a.bp())},
$S:1}
B.aR8.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bc(v)
this.b.d6(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqh.prototype={
$1(d){if(d==null)return null
return A.c5(J.l(d))},
$S:146}
B.bcf.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F7(!0)},
$S:0}
B.bcg.prototype={
$1(d){return this.a.Op()},
$S:33}
B.bcc.prototype={
$0(){var x=this.a.c
if(x!=null)A.a9(x,!1).bt()},
$S:0}
B.bcd.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bc9.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bca.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bcb.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bc6.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bc7.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bc8.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bWN(x.w,w,u,!1,v)},
$S:z+2}
B.bce.prototype={
$0(){return this.a.aRs()},
$S:0}
B.bbR.prototype={
$1(d){this.a.yQ("candidat_ice",d,!1)},
$S:383}
B.bbS.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bbQ())},
$S:0}
B.bbQ.prototype={
$0(){},
$S:0}
B.bbT.prototype={
$0(){this.a.mC(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bbU.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bbV.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yQ("annule",C.e8,!1)
x.mC(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbW.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbP(x,w))},
$S:33}
B.bbP.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eP(this.b)},
$S:0}
B.bbX.prototype={
$1(d){},
$S:163}
B.bbY.prototype={
$1(d){this.a.Ey()},
$S:33}
B.bc_.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acu()
x.a8V("reponse",d)},
$S:384}
B.bc0.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bc1.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acu()},
$S:28}
B.bc2.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bc3.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8V("offre",d)},
$S:384}
B.bc4.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbZ.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.bbO.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bbN.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bbM.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bc5.prototype={
$2(d,e){if(!d)this.a.F3()},
$S:973}
B.aQw.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aQx.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aCC(w)},
$S:z+5}
B.aQy.prototype={
$1(d){var x
if(d===D.KN){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.atj.prototype={
$1(d){return this.a.Xz()},
$S:21}
B.atk.prototype={
$0(){var x=this.a
if(!x.e)x.Dq()},
$S:0}
B.bMP.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGV.prototype={
$1(d){return this.a.push(B.bQw(d))},
$S:21}
B.aGW.prototype={
$1(d){return this.a.push(B.bQw(d))},
$S:21}
B.aGS.prototype={
$1(d){},
$S:22}
B.aGT.prototype={
$1(d){},
$S:22}
B.aGU.prototype={
$1(d){},
$S:22}
B.aGG.prototype={
$0(){return!1},
$S:47}
B.aGH.prototype={
$0(){return!1},
$S:47}
B.aGI.prototype={
$1(d){J.fM(d,new B.aGF(this.a))},
$S:383}
B.aGF.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:48}
B.aLD.prototype={
$1(d){},
$S:22}
B.aLE.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FL(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aLF.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.coU(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bTF())switch(w.cx.a){case 0:w.cy=D.KS
break
case 1:w.cy=D.KT
break
case 3:w.cy=D.KU
break
case 5:w.cy=D.KQ
break
case 6:w.cy=D.KR
break
case 7:w.cy=D.rZ
break
default:break}},
$S:30}
B.aLG.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.coV(w.iceGatheringState)},
$S:30}
B.aLH.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cqr(w.signalingState)},
$S:30}
B.aLI.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cq2(w.connectionState)},
$S:30}
B.aLJ.prototype={
$1(d){},
$S:30}
B.aLK.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bQw(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>"))
w=J.eB(x,new B.aLB(w),y.h)
v.$1(new B.Ph(A.H(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aLB.prototype={
$1(d){return new B.mI(d,d.id,this.a.as)},
$S:z+8}
B.aLC.prototype={
$0(){var x=this.b.e
return new B.mI(x,x.id,this.a.as)},
$S:z+9}
B.bMX.prototype={
$1(d){return J.fV(self.window.navigator.userAgent,A.bL(d,!1,!1))},
$S:12}
B.aLQ.prototype={
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
x.a6q(t)
v=y.i.c
w.push(A.hT(t,"canplay",new B.aLM(x),!1,v))
w.push(A.hT(t,"resize",new B.aLN(x),!1,v))
w.push(A.hT(t,"error",new B.aLO(t),!1,v))
w.push(A.hT(t,"ended",new B.aLP(),!1,v))
return t},
$S:155}
B.aLM.prototype={
$1(d){this.a.afz()},
$S:21}
B.aLN.prototype={
$1(d){this.a.afz()},
$S:21}
B.aLO.prototype={
$1(d){var x,w,v=this.a.error
A.nn("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gb.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nX(x,C.Ga.h(0,A.ao(v,"code")),w,null))},
$S:26}
B.aLP.prototype={
$1(d){},
$S:21}
B.aLR.prototype={
$0(){},
$S:0}
B.aLT.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLS.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a46("RTCVideoRenderer-"+w.Q)
else w=A.O(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cB(A.O(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:974}
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
w.ac9()
x=x.b
x===$&&A.d()
x.a5(0)},
$S:0}
B.bgV.prototype={
$1(d){},
$S:17}
B.ase.prototype={
$1(d){this.a.cj(0,this.b)},
$S:22}
B.asf.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fH(new B.Hn("Failed to connect WebSocket"))
else this.b.a7B(1006,"error")},
$S:22}
B.asg.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cz("data")
if(typeof x==="string")w.b=new B.GU(A.bA(x))
else if(typeof x==="object"&&A.bXQ(y.m.a(x),"ArrayBuffer"))w.b=new B.D3(A.Ol(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bp())},
$S:26}
B.ash.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cj(0,this.b)
this.b.a7B(d.code,d.reason)},
$S:22}
B.aoy.prototype={
$1(d){var x=d.b,w=this.a
new A.cA(x,A.u(x).i("cA<1>")).cA(new B.aov(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cA(x,A.u(x).i("cA<1>")).b6o(new B.aow(d),new B.aox(w,d))
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
if((t.b.b&4)!==0)A.ap(B.bRG())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4f(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4f(new Uint8Array(A.cU(u)))
break $label1$1}t=A.aM("Cannot send "+J.aA(d).j(0))
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
$1(d){var x,w=d instanceof A.RO?d:new B.aao(J.l(d)),v=this.a
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
x(B.Ud.prototype,"gaxj","Kz",0)
var v
w(v=B.Uc.prototype,"gaWA","afq",3)
x(v,"gacM","F3",0)
x(v,"ga6E","KS",0)
x(v,"ga6D","KR",0)
x(v,"ga6B","KO",0)
x(v,"ga6C","KP",0)
w(v=B.a1z.prototype,"gaRb","aRc",7)
x(v,"gaQi","Xz",1)
x(B.Pi.prototype,"gdI","k",0)
x(B.Pl.prototype,"gaOn","aOo",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DQ,B.aqg,B.Gv,B.a1N,B.aQv,B.a1z,B.aLz,B.NU,B.F5,B.aGD,B.Pg,B.aLL,B.a9g,B.V5,B.a9f,B.xW,B.tg,B.Hn,B.aao,B.FL,B.Au,B.Ph,B.Pj])
w(B.QN,A.fm)
x(A.jW,[B.aR7,B.bcf,B.bcc,B.bcd,B.bc9,B.bca,B.bcb,B.bc6,B.bc7,B.bce,B.bbS,B.bbQ,B.bbT,B.bbU,B.bbV,B.bbP,B.bbZ,B.bbO,B.bbN,B.bbM,B.atk,B.aGG,B.aGH,B.aLC,B.aLR,B.aLT,B.aAj,B.aAi,B.aox])
x(A.iq,[B.aR8,B.aqh,B.bcg,B.bc8,B.bbR,B.bbW,B.bbX,B.bbY,B.bc_,B.bc0,B.bc1,B.bc2,B.bc3,B.bc4,B.aQw,B.aQx,B.aQy,B.atj,B.bMP,B.aGV,B.aGW,B.aGS,B.aGT,B.aGU,B.aGI,B.aLD,B.aLE,B.aLF,B.aLG,B.aLH,B.aLI,B.aLJ,B.aLK,B.aLB,B.bMX,B.aLQ,B.aLM,B.aLN,B.aLO,B.aLP,B.bgV,B.ase,B.asf,B.asg,B.ash,B.aoy,B.aov,B.aow,B.aoz])
x(A.M,[B.p6,B.yC,B.Pk])
x(A.R,[B.Ud,B.Uc,B.Pl])
x(A.as,[B.SS,B.ac2,B.wF])
x(A.qL,[B.bc5,B.aGF,B.aLS])
w(B.aLA,B.aLz)
w(B.mI,B.NU)
w(B.a5m,B.F5)
w(B.aGE,B.aGD)
w(B.a71,B.Pg)
w(B.bR3,B.aLL)
w(B.Pi,A.d5)
x(B.a9g,[B.a3R,B.aou])
x(B.tg,[B.GU,B.D3,B.Dt])
w(B.Hm,B.Hn)
w(B.ali,B.DQ)
x(A.HQ,[B.vT,B.Pf,B.vS,B.mU,B.a72])})()
A.oy(b.typeUniverse,JSON.parse('{"DQ":{"dH":["1"]},"QN":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yC":{"M":[],"m":[]},"p6":{"M":[],"m":[]},"Ud":{"R":["p6"]},"SS":{"as":[],"m":[]},"Uc":{"R":["yC"]},"ac2":{"as":[],"m":[]},"wF":{"as":[],"m":[]},"mI":{"NU":[]},"a5m":{"F5":[]},"a71":{"Pg":[]},"Pi":{"d5":["Pj"],"aV":[]},"Pk":{"M":[],"m":[]},"Pl":{"R":["Pk"]},"V5":{"dH":["1"]},"xW":{"bRF":[]},"GU":{"tg":[]},"D3":{"tg":[]},"Dt":{"tg":[]},"Hn":{"bN":[]},"Hm":{"bN":[]},"ali":{"dH":["@"]},"aao":{"bN":[]}}'))
A.bS7(b.typeUniverse,JSON.parse('{"DQ":1,"a9g":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xW"),L:x("bN"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F5>"),d:x("D<iz<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("J<av>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NU"),G:x("F5"),h:x("mI"),o:x("pu"),a:x("bn"),K:x("a0"),J:x("Pg"),v:x("Au"),Z:x("a9f<a0?>"),N:x("o"),e:x("pY"),M:x("e1"),D:x("tg"),U:x("X<o>"),g:x("ds<Gv>"),n:x("ds<~>"),V:x("aZ<xW>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Un<av>"),C:x("or<av>"),k:x("au<xW>"),c:x("au<@>"),W:x("au<~>"),q:x("kx"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Un=new B.a1N(C.k7)
D.xY=new A.am(32,0,32,0)
D.yJ=new A.ak(57638,!1)
D.yK=new A.ak(57639,!1)
D.ZX=new A.ak(58337,!1)
D.ZY=new A.ak(58341,!1)
D.a_1=new A.ak(58923,!1)
D.yP=new A.ak(59048,!1)
D.a_2=new A.ak(59049,!1)
D.a_3=new A.ak(59077,!1)
D.a7p=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.abb=A.b(x([]),y.Q)
D.Gn=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.ajd=new B.mU(0,"RTCIceConnectionStateNew")
D.aje=new B.mU(1,"RTCIceConnectionStateChecking")
D.ajf=new B.mU(2,"RTCIceConnectionStateCompleted")
D.ajg=new B.mU(3,"RTCIceConnectionStateConnected")
D.ajh=new B.mU(4,"RTCIceConnectionStateCount")
D.KN=new B.mU(5,"RTCIceConnectionStateFailed")
D.aji=new B.mU(6,"RTCIceConnectionStateDisconnected")
D.KO=new B.mU(7,"RTCIceConnectionStateClosed")
D.KP=new B.Pf(0,"RTCIceGatheringStateNew")
D.ajj=new B.Pf(1,"RTCIceGatheringStateGathering")
D.ajk=new B.Pf(2,"RTCIceGatheringStateComplete")
D.rZ=new B.vS(0,"RTCPeerConnectionStateClosed")
D.KQ=new B.vS(1,"RTCPeerConnectionStateFailed")
D.KR=new B.vS(2,"RTCPeerConnectionStateDisconnected")
D.KS=new B.vS(3,"RTCPeerConnectionStateNew")
D.KT=new B.vS(4,"RTCPeerConnectionStateConnecting")
D.KU=new B.vS(5,"RTCPeerConnectionStateConnected")
D.ajl=new B.vT(0,"RTCSignalingStateStable")
D.ajm=new B.vT(1,"RTCSignalingStateHaveLocalOffer")
D.ajn=new B.vT(2,"RTCSignalingStateHaveRemoteOffer")
D.ajo=new B.vT(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajp=new B.vT(4,"RTCSignalingStateHaveRemotePrAnswer")
D.KV=new B.vT(5,"RTCSignalingStateClosed")
D.ajq=new B.Pj(0,0,0)
D.KW=new B.a72(0,"RTCVideoViewObjectFitContain")
D.KX=new B.a72(1,"RTCVideoViewObjectFitCover")
D.nX=new A.c4(20,null,null,null)
D.amV=new A.c4(48,null,null,null)
D.Mp=new A.c4(null,64,null,null)
D.apW=new A.y(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.N4=new A.y(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqi=new A.y(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nf=new A.y(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.u6=new A.y(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c_R=!1
$.bZb=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ctP","c5h",()=>new B.aLA())
x($,"crT","bTF",()=>C.c.q(A.ao(A.ao(A.ao(A.bTk(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"Lzz/ZZlIc9hJlVNRDjKSFOV/n8o=");