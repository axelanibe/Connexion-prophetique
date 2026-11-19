((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DQ:function DQ(){},QO:function QO(d){this.$ti=d},aR7:function aR7(d){this.a=d},aR8:function aR8(d,e){this.a=d
this.b=e},
a0k(d){var x,w,v,u,t,s=new B.aqi(),r=J.Q(d),q=r.h(d,"id")
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
return new B.aqh(q,x,w,v,u,t)},
bZT(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mg(t,y.N,y.z):C.ea
if(u.h(d,"cree_le")!=null)A.bZ(J.l(u.h(d,"cree_le")))
return new B.Gv(s,x,w,v)},
c9X(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.UA
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mg(s,u,t))}return new B.a1O(x)},
bM2(d){var x=C.h.b_(d.a,1e6)
return C.c.aZ(C.h.j(C.h.b_(x,60)),2,"0")+":"+C.c.aZ(C.h.j(C.h.aP(x,60)),2,"0")},
c3L(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oE(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ahy(w,v)},
cnw(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahB(u,A.jN(w)?w:null,v)},
aqh:function aqh(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aqi:function aqi(){},
Gv:function Gv(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1O:function a1O(d){this.a=d},
bWY(d,e,f,g,h,i){return new B.p6(e,f,i,h,d,null)},
bWX(d,e,f,g,h){return new B.yC(e,h,f,g,d,null)},
c09(d,e,f,g,h,i,j,k,l,m,n){return new B.ac4(g,f,e,i,h,d,m,l,k,j,n,null)},
p6:function p6(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Ue:function Ue(){var _=this
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
ST:function ST(d,e,f,g,h){var _=this
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
Ud:function Ud(d,e){var _=this
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
ac4:function ac4(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
aQw:function aQw(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aQx:function aQx(d){this.a=d},
aQy:function aQy(d){this.a=d},
aQz:function aQz(d){this.a=d},
a1A:function a1A(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
atk:function atk(d){this.a=d},
atl:function atl(d){this.a=d},
anu(d){var x=y.U,w=A.G(new A.W(A.b(d.split(" "),y.s),new B.bMX(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bMX:function bMX(){},
aLB:function aLB(){},
mI:function mI(d,e,f){this.e=d
this.a=e
this.b=f},
aGW:function aGW(d){this.a=d},
aGX:function aGX(d){this.a=d},
bQE(d){var x=new B.a5n(d)
x.awC(d)
return x},
a5n:function a5n(d){this.d=d},
aGT:function aGT(d){this.a=d},
aGU:function aGU(d){this.a=d},
aGV:function aGV(d){this.a=d},
aGF:function aGF(){},
aGH:function aGH(){},
aGI:function aGI(){},
aGJ:function aGJ(d){this.a=d},
aGG:function aGG(d){this.a=d},
ceK(d,e){var x=y.N
x=new B.a72(d,e,A.C(x,y.E),A.C(x,y.z))
x.awH(d,e)
return x},
a72:function a72(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aLE:function aLE(d){this.a=d},
aLF:function aLF(d){this.a=d},
aLG:function aLG(d){this.a=d},
aLH:function aLH(d){this.a=d},
aLI:function aLI(d){this.a=d},
aLJ:function aLJ(d){this.a=d},
aLK:function aLK(d){this.a=d},
aLL:function aLL(d){this.a=d},
aLC:function aLC(d){this.a=d},
aLD:function aLD(d,e){this.a=d
this.b=e},
bRb:function bRb(d){this.a=d},
cpt(){return C.b.m5(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bN4())!==-1},
bN4:function bN4(){},
bZk(){var x=A.b([],y.d),w=$.bZl
$.bZl=w+1
return new B.Pj(w,x,D.ajR,$.ad())},
Pj:function Pj(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aLR:function aLR(d){this.a=d},
aLN:function aLN(d){this.a=d},
aLO:function aLO(d){this.a=d},
aLP:function aLP(d){this.a=d},
aLQ:function aLQ(){},
bZm(d,e,f){return new B.Pl(d,f,e,null)},
Pl:function Pl(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pm:function Pm(){this.c=this.a=null},
aLS:function aLS(){},
aLU:function aLU(d){this.a=d},
aLT:function aLT(d){this.a=d},
bXx(d,e,f,g){var x,w={}
w.a=d
x=new B.a3S(g.i("a3S<0>"))
x.awt(e,f,w,g)
return x},
a3S:function a3S(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAk:function aAk(d,e){this.a=d
this.b=e},
aAj:function aAj(d){this.a=d},
V6:function V6(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgV:function bgV(){},
a9h:function a9h(d){this.b=this.a=$
this.$ti=d},
a9i:function a9i(){},
bPr(d,e){return B.c9f(d,e)},
c9f(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bPr=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o6("ws")&&!d.o6("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xW(r,A.fL(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.cj(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fH(new B.Hn("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.or(r,"open",!1,y.C).gS(0).aB(new B.asf(p,q),y.H)
t=y.C
s=y.H
new A.or(r,"error",!1,t).gS(0).aB(new B.asg(p,q),s)
A.hT(r,"message",new B.ash(q),!1,y.m)
new A.or(r,"close",!1,t).gS(0).aB(new B.asi(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bPr,w)},
xW:function xW(d,e){this.a=d
this.b=e},
asf:function asf(d,e){this.a=d
this.b=e},
asg:function asg(d,e){this.a=d
this.b=e},
ash:function ash(d){this.a=d},
asi:function asi(d,e){this.a=d
this.b=e},
bRO(){return new B.Hm("Connection Closed")},
tg:function tg(){},
GU:function GU(d){this.a=d},
D3:function D3(d){this.a=d},
Dt:function Dt(d,e){this.a=d
this.b=e},
Hn:function Hn(d){this.a=d},
Hm:function Hm(d){this.a=d},
c8L(d){var x=null,w=$.aE,v=new B.a9h(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bXx(new A.cA(s,r.i("cA<1>")),new A.Cg(t,q.i("Cg<1>")),!0,u)
v.b=B.bXx(new A.cA(t,q.i("cA<1>")),new A.Cg(s,r.i("Cg<1>")),!1,u)
v=new B.aov(new A.aZ(new A.au(w,y.W),y.R),v)
v.awj(d)
return v},
aov:function aov(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
aoz:function aoz(d){this.a=d},
aow:function aow(d){this.a=d},
aox:function aox(d){this.a=d},
aoy:function aoy(d,e){this.a=d
this.b=e},
aoA:function aoA(d){this.a=d},
alj:function alj(d,e){this.b=d
this.a=e},
aaq:function aaq(d){this.a=d},
cp3(d){switch(d){case"new":return D.ajE
case"checking":return D.ajF
case"connected":return D.ajH
case"completed":return D.ajG
case"failed":return D.KW
case"disconnected":return D.ajJ
case"closed":return D.KX
case"count":return D.ajI}return D.KX},
cp4(d){switch(d){case"new":return D.KY
case"gathering":return D.ajK
case"complete":return D.ajL}return D.KY},
cqC(d){switch(d){case"stable":return D.ajM
case"have-local-offer":return D.ajN
case"have-local-pranswer":return D.ajP
case"have-remote-offer":return D.ajO
case"have-remote-pranswer":return D.ajQ
case"closed":return D.L3}return D.L3},
cqd(d){switch(d){case"new":return D.L0
case"connecting":return D.L1
case"connected":return D.L2
case"closed":return D.t6
case"disconnected":return D.L_
case"failed":return D.KZ}return D.t6},
vT:function vT(d,e){this.a=d
this.b=e},
Pg:function Pg(d,e){this.a=d
this.b=e},
vS:function vS(d,e){this.a=d
this.b=e},
mU:function mU(d,e){this.a=d
this.b=e},
a73:function a73(d,e){this.a=d
this.b=e},
aLA:function aLA(){},
NV:function NV(){},
F5:function F5(){},
aGE:function aGE(){},
FL:function FL(d,e,f){this.a=d
this.b=e
this.c=f},
Ph:function Ph(){},
aLM:function aLM(){},
Au:function Au(d,e){this.a=d
this.b=e},
Pi:function Pi(d){this.b=d},
Pk:function Pk(d,e,f){this.a=d
this.b=e
this.c=f},
bQm(d){var x=0,w=A.k(y.y)
var $async$bQm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bQm,w)},
aJt(d){var x=0,w=A.k(y.H),v
var $async$aJt=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aVq("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aJt)
case 2:return A.i(null,w)}})
return A.j($async$aJt,w)},
aVq(d,e,f,g){return B.chq(d,e,f,g,f.i("0?"))},
chq(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aVq=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aVp(),$async$aVq)
case 3:v=D.Gw.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVq,w)},
aVp(){var x=0,w=A.k(y.H),v,u
var $async$aVp=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c00?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Gw.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aVp)
case 4:$.c00=!0
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
B.QO.prototype={
iO(d){var x=A.cz("subscription"),w=A.fL(new B.aR7(x),null,null,!0,this.$ti.y[1])
x.b=d.eU(new B.aR8(this,w),w.gm0(w),w.gnH())
return new A.cA(w,A.u(w).i("cA<1>"))}}
B.aqh.prototype={}
B.Gv.prototype={}
B.a1O.prototype={}
B.p6.prototype={
N(){return new B.Ue()}}
B.Ue.prototype={
U(){var x=this
x.W()
x.KK()
x.r=A.di(C.c4,new B.bcf(x))
x.w=A.iC(C.xO,new B.bcg(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a2()},
XJ(){var x=this.x
if(x!=null)x.V(0)
this.x=A.di(C.h0,new B.bcc(this))},
Oq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Oq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.AU(p.c),$async$Oq)
case 7:r=e
q=B.a0k(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bcd(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.XJ()}u=2
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
return A.j($async$Oq,w)},
KK(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$KK=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.aa()
x=7
return A.e(n.AU(o.c),$async$KK)
case 7:r=e
q=B.a0k(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gali()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bc9(s))
s.XJ()
x=1
break}s.n(new B.bca(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bcb(s))
s.XJ()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KK,w)},
KA(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$KA=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.bc6(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.e(p.a0v(q.c,"accepte"),$async$KA)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.P(n)
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
return A.j($async$KA,w)},
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
return A.e(q.a0v(r.c,"refuse"),$async$F7)
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
r=A.jV(C.r,s,A.c(B.anu(r.d),s,s,s,s,D.Nn,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.Nd,C.V,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.az,new A.Y(D.y8,x,s),C.l,A.c(q,s,s,s,s,D.ue,s,s,s),D.My],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bce(t)
v=A.a("Accepter")
u=t.f?s:t.gaxk()
q.push(A.T(A.b([new B.ST(D.yU,C.aC,r,x,s),D.anl,new B.ST(D.yT,C.cC,v,u,s)],w),C.o,C.bi,C.i,s))}if(t.d)q.push(C.ws)
return A.eA(s,C.n,A.fl(!0,A.cD(A.H(q,C.o,C.e,C.W),s,s),!0,C.aj,!0,!0),s,s,s)}}
B.ST.prototype={
B(d){var x=this,w=null,v=A.d4(x.d,w,w,C.aj,C.ck,w)
return A.H(A.b([A.ab(A.b5(!1,A.c0(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.ei,w,w,w)],y.p),C.o,C.e,C.W)}}
B.yC.prototype={
N(){return new B.Ud(A.b0(y.N),C.R)}}
B.Ud.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bZk()
w=B.bZk()
v.d!==$&&A.bj()
v.d=new B.aQw(x,w)
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
if(m==="termine"||m==="expire"){s.mC(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Q2(),$async$vg)
case 8:p=e
o=B.c9X(p)
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
s.ch=A.di(C.c4,new B.bbV(s))
s.CW=A.iC(C.cm,new B.bbW(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.c2(k,A.u(k).i("c2<1>")).cA(s.gaWC())
k=m.w
s.cy=new A.c2(k,A.u(k).i("c2<1>")).cA(new B.bbX())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.Pd(C.c.So("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f7(C.cc,n,C.ai,!0))}s.ay=A.iC(C.h0,new B.bbY(s))
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
s.afr(B.bZT(q))}u=2
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
v=B.c3L(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Ao(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aB(new B.bc_(s),y.a).fG(new B.bc0(s))
break
case"reponse":if(!s.a.f)return
u=B.c3L(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.OR(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aB(new B.bc1(s),y.a).fG(new B.bc2(s))
break
case"candidat_ice":t=B.cnw(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.OM(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.GR().aB(new B.bc3(s),y.a).fG(new B.bc4(s))
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
w.n(new B.bbZ(w))},
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
return A.e(q.a0v(r.c,"termine"),$async$F3)
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
KT(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KT=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.TB(u),$async$KT)
case 2:if(v.c!=null)v.n(new B.bbO(v,u))
return A.i(null,w)}})
return A.j($async$KT,w)},
KS(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.JR(u),$async$KS)
case 2:if(v.c!=null)v.n(new B.bbN(v,u))
return A.i(null,w)}})
return A.j($async$KS,w)},
KP(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ty(u),$async$KP)
case 2:if(v.c!=null)v.n(new B.bbM(v,u))
return A.i(null,w)}})
return A.j($async$KP,w)},
KQ(){var x=0,w=A.k(y.H),v=this,u
var $async$KQ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.OU(),$async$KQ)
case 2:return A.i(null,w)}})
return A.j($async$KQ,w)},
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bZm(o.e,!1,D.L5)
else{x=A.jV(C.r,q,A.c(B.anu(w.e),q,q,q,q,D.aqO,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aqq,q,q,q)
x=A.cD(A.H(A.b([x,C.p,w,C.l,A.c(r.w?B.bM2(r.ax):A.a(p),q,q,q,q,D.ue,q,q,q)],y.p),C.o,C.e,C.W),q,q)}x=A.FC(0,x)
o=A.fA(q,A.eD(A.N(12),B.bZm(o.d,!0,D.L5),C.am),160,q,q,16,16,110)
w=r.w
v=B.bM2(r.ax)
u=r.z
t=r.Q
u=A.ew(C.b1,A.b([x,o,A.fA(24,B.c09(r.as,v,w,!0,t,u,r.ga6D(),r.ga6C(),r.ga6E(),r.ga6F(),r.gacN()),q,q,0,0,q,q)],y.p),C.f,C.aY,q)
o=u}else{o=A.jV(C.r,q,A.c(B.anu(w.e),q,q,q,q,D.Nn,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.Nd,C.V,q,q)
if(r.w)w=B.bM2(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.ue,q,q,q)
v=r.w
u=B.bM2(r.ax)
t=r.z
s=r.Q
t=A.cD(A.H(A.b([o,C.az,new A.Y(D.y8,x,q),C.l,w,D.My,B.c09(r.as,u,v,!1,s,t,r.ga6D(),r.ga6C(),r.ga6E(),r.ga6F(),r.gacN())],y.p),C.o,C.e,C.W),q,q)
o=t}return A.bR5(!1,A.eA(q,C.n,A.fl(!0,o,!0,C.aj,!0,!0),q,q,q),new B.bc5(r),y.K)}}
B.ac4.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nr,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_c:D.a_b
t=A.b([new B.wF(x,r,A.a("Muet"),v.x,u,u),D.o3,new B.wF(D.a_i,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.o3)
if(r){x=v.w
w=x?D.z_:D.a_h
t.push(new B.wF(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.o3)
if(r)t.push(new B.wF(D.a_g,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.o3)
t.push(new B.wF(D.yU,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.T(t,C.o,C.bi,C.i,u))
return A.H(s,C.o,C.e,C.W)}}
B.wF.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lJ
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d4(u,v,v,C.aj,C.ck,v)
return A.H(A.b([A.ab(A.b5(!1,A.c0(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aW,A.c(w.e,v,v,v,v,C.Ns,v,v,v)],y.p),C.o,C.e,C.W)}}
B.aQw.prototype={
ut(d,e){return this.b9m(d,e)},
b9m(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$ut=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.is(0),$async$ut)
case 2:x=3
return A.e(v.e.is(0),$async$ut)
case 3:u=$.c5r()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aGF().CG(0,A.a6(["audio",!0,"video",t],s,r)),$async$ut)
case 4:q=v.b=g
o.sa4H(0,q)
x=5
return A.e(u.a_I(d,A.C(s,r)),$async$ut)
case 5:p=v.a=g
x=6
return A.e(p.kl(0,q),$async$ut)
case 6:p.e=new B.aQx(v)
p.Q=new B.aQy(v)
p.d=new B.aQz(v)
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
return A.e(s.Po(0),$async$GR)
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
OR(d){return this.aYV(d)},
aYV(d){var x=0,w=A.k(y.H),v=this,u
var $async$OR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.CV(0,new B.Au(d.h(0,"sdp"),d.h(0,"type"))),$async$OR)
case 2:return A.i(null,w)}})
return A.j($async$OR,w)},
OM(d){return this.aYH(d)},
aYH(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.OB(new B.FL(A.aM(d.h(0,"candidate")),A.aM(d.h(0,"sdpMid")),A.eh(d.h(0,"sdpMLineIndex")))),$async$OM)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OM,w)},
TB(d){return this.aq8(d)},
aq8(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$TB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T9(0)
if(r==null)r=C.dr
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skq(0,t)
return A.i(null,w)}})
return A.j($async$TB,w)},
JR(d){return this.aq_(d)},
aq_(d){var x=0,w=A.k(y.H)
var $async$JR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aJt(d),$async$JR)
case 2:return A.i(null,w)}})
return A.j($async$JR,w)},
Ty(d){return this.apS(d)},
apS(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ty=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.JA(0)
if(s==null)s=C.dr
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skq(0,d)
return A.i(null,w)}})
return A.j($async$Ty,w)},
OU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.JA(0)
if(s==null)s=D.abC
if(s.length===0){x=1
break}x=3
return A.e(B.bQm(C.b.gS(s)),$async$OU)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OU,w)},
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
else{o=A.G(q.T9(0),!0,y.G)
C.b.t(o,q.JA(0))
q=o}if(q==null)q=C.dr
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c8F(r)
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
Pd(d){return this.b_e(d)},
b_e(d){var x=0,w=A.k(y.H),v=this
var $async$Pd=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Dq(),$async$Pd)
case 2:return A.i(null,w)}})
return A.j($async$Pd,w)},
Dq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.c8L(B.bPr(A.cy(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Dq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cA(p,A.u(p).i("cA<1>")).aT(s.gaRb(),!0,s.gaQi(),new B.atk(s))
u=2
x=6
break
case 4:u=3
n=t
s.XA()
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
if((v.c&4)===0)v.D(0,B.bZT(w))}catch(u){}},
XA(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7Q[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.di(A.d3(0,0,0,0,x),new B.atl(w))},
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
r=s.w=new B.alj(s,q)}s=r.a5(0)}x=7
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
B.aLB.prototype={
a_I(d,e){return this.b0L(d,e)},
b0L(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_I=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fw(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.ceK(C.cz.gld().bi(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_I,w)}}
B.mI.prototype={
T9(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.V(w).i("cI<1,av>"))
J.fQ(w,new B.aGW(x))
return x},
JA(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.V(w).i("cI<1,av>"))
J.fQ(w,new B.aGX(x))
return x}}
B.a5n.prototype={
awC(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aGT(x)))
w.addEventListener("mute",A.bF(new B.aGU(x)))
w.addEventListener("unmute",A.bF(new B.aGV(x)))},
skq(d,e){this.d.enabled=e},
aF(d){var x=0,w=A.k(y.H),v=this
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aF,w)}}
B.aGF.prototype={
CG(d,e){return this.ap_(0,e)},
ap_(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CG=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cpt())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iJ(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aGH())
e.cq(0,"audio",new B.aGI())}catch(a0){A.nn("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fQ(s,new B.aGJ(r))
J.iJ(e.h(0,"audio"),"optional")
J.jb(e.h(0,"audio"),r)}}catch(a0){q=A.P(a0)
p=A.bd(a0)
A.nn("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
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
v=new B.mI(i,h,"local")
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
v=new B.mI(h,g,"local")
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
B.a72.prototype={
awH(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bF(new B.aLE(x)))
w.addEventListener("icecandidate",A.bF(new B.aLF(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aLG(x)))
w.onicegatheringstatechange=A.bF(new B.aLH(x))
w.addEventListener("signalingstatechange",A.bF(new B.aLI(x)))
if(!$.bTP())w.addEventListener("connectionstatechange",A.bF(new B.aLJ(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aLK(x)))
w.addEventListener("track",A.bF(new B.aLL(x)))},
Po(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Po=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dR(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Po)
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
return A.e(A.dR(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Pm)
case 3:t=f
v=new B.Au(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pm,w)},
kl(d,e){var x
this.ax.cq(0,e.a,new B.aLD(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cH(null,y.H)},
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
OB(d){return this.aYm(d)},
aYm(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$OB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.dR(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$OB)
case 2:return A.i(null,w)}})
return A.j($async$OB,w)},
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
B.bRb.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.P(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.Pj.prototype={
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
if(e.JA(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.V(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T9(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.V(x).i("cI<1,av>")))
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
while(true)switch(x){case 0:$.CI()
$.oH().rb("RTCVideoRenderer-"+v.Q,new B.aLR(v),!0)
return A.i(null,w)}})
return A.j($async$is,w)},
a6r(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pl.prototype={
N(){return new B.Pm()}}
B.Pm.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a8(0,v.gaOn())
x=v.a
w=x.c
w.as=x.e
w.saly(0,x.d===D.L4?"contain":"cover")},
aOo(){if(this.c!=null)this.n(new B.aLS())},
k(){if(this.c!=null)this.a2()},
aS(d){var x,w
this.b7(d)
A.di(A.d3(0,0,10,0,0),new B.aLU(this))
x=this.a
w=x.c
w.saly(0,x.d===D.L4?"contain":"cover")},
B(d){return new A.iv(new B.aLT(this),null)}}
B.a3S.prototype={
awt(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.V6(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("V6<0>"))
if(f.a.gi2())f.a=new B.QO(g.i("@<0>").bV(g).i("QO<1,2>")).iO(f.a)
w=A.fL(null,new B.aAk(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
ac9(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.d()
w.a5(0)}}
B.V6.prototype={
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
x.a.a.a5(0).fG(new B.bgV())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ac9()
x.c.cj(0,x.a.a.a5(0))}return x.c.a},
aca(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dd(0)
return},
$idH:1}
B.a9h.prototype={}
B.a9i.prototype={}
B.xW.prototype={
a7C(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dt(d,e))
x.a5(0)},
a4g(d){var x
if((this.b.b&4)!==0)throw A.n(B.bRO())
x=A.bQ(d)
x.toString
this.a.send(x)},
wa(d,e,f){return this.b__(0,e,f)},
b__(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wa=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bRO())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wa,w)},
$ibRN:1}
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
gH(d){return A.fV(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dt.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dt&&e.a===this.a&&e.b===this.b},
gH(d){return A.fV([this.a,this.b])},
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
B.aov.prototype={
awj(d){d.eG(new B.aoz(this),new B.aoA(this),y.a)}}
B.alj.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arY(0)}}
B.aaq.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.vT.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pg.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vS.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mU.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a73.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aLA.prototype={}
B.NV.prototype={}
B.F5.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGE.prototype={}
B.FL.prototype={}
B.Ph.prototype={}
B.aLM.prototype={}
B.Au.prototype={}
B.Pi.prototype={}
B.Pk.prototype={
air(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Pk(x,w,v)},
b_D(d){return this.air(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yC(E)","~(Gv)","bn(FL)","bn(Pi)","bn(mU)","~(@)","mI(@)","mI()","bn(bRN)","~(tg)"])
B.aR7.prototype={
$0(){return J.c7Z(this.a.bp())},
$S:1}
B.aR8.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.P(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d6(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqi.prototype={
$1(d){if(d==null)return null
return A.bZ(J.l(d))},
$S:132}
B.bcf.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F7(!0)},
$S:0}
B.bcg.prototype={
$1(d){return this.a.Oq()},
$S:35}
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
return B.bWX(x.w,w,u,!1,v)},
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
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yQ("annule",C.ea,!1)
x.mC(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbW.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbP(x,w))},
$S:35}
B.bbP.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).ew(this.b)},
$S:0}
B.bbX.prototype={
$1(d){},
$S:138}
B.bbY.prototype={
$1(d){this.a.Ey()},
$S:35}
B.bc_.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acv()
x.a8W("reponse",d)},
$S:384}
B.bc0.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bc1.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acv()},
$S:29}
B.bc2.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bc3.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8W("offre",d)},
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
B.aQx.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aQy.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aCD(w)},
$S:z+5}
B.aQz.prototype={
$1(d){var x
if(d===D.KW){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.atk.prototype={
$1(d){return this.a.XA()},
$S:21}
B.atl.prototype={
$0(){var x=this.a
if(!x.e)x.Dq()},
$S:0}
B.bMX.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGW.prototype={
$1(d){return this.a.push(B.bQE(d))},
$S:21}
B.aGX.prototype={
$1(d){return this.a.push(B.bQE(d))},
$S:21}
B.aGT.prototype={
$1(d){},
$S:22}
B.aGU.prototype={
$1(d){},
$S:22}
B.aGV.prototype={
$1(d){},
$S:22}
B.aGH.prototype={
$0(){return!1},
$S:47}
B.aGI.prototype={
$0(){return!1},
$S:47}
B.aGJ.prototype={
$1(d){J.fQ(d,new B.aGG(this.a))},
$S:383}
B.aGG.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:50}
B.aLE.prototype={
$1(d){},
$S:22}
B.aLF.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FL(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aLG.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cp3(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bTP())switch(w.cx.a){case 0:w.cy=D.L0
break
case 1:w.cy=D.L1
break
case 3:w.cy=D.L2
break
case 5:w.cy=D.KZ
break
case 6:w.cy=D.L_
break
case 7:w.cy=D.t6
break
default:break}},
$S:30}
B.aLH.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cp4(w.iceGatheringState)},
$S:30}
B.aLI.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cqC(w.signalingState)},
$S:30}
B.aLJ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cqd(w.connectionState)},
$S:30}
B.aLK.prototype={
$1(d){},
$S:30}
B.aLL.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bQE(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.V(x).i("cI<1,av>"))
w=J.eB(x,new B.aLC(w),y.h)
v.$1(new B.Pi(A.G(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aLC.prototype={
$1(d){return new B.mI(d,d.id,this.a.as)},
$S:z+8}
B.aLD.prototype={
$0(){var x=this.b.e
return new B.mI(x,x.id,this.a.as)},
$S:z+9}
B.bN4.prototype={
$1(d){return J.fZ(self.window.navigator.userAgent,A.bL(d,!1,!1))},
$S:12}
B.aLR.prototype={
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
w.push(A.hT(t,"canplay",new B.aLN(x),!1,v))
w.push(A.hT(t,"resize",new B.aLO(x),!1,v))
w.push(A.hT(t,"error",new B.aLP(t),!1,v))
w.push(A.hT(t,"ended",new B.aLQ(),!1,v))
return t},
$S:165}
B.aLN.prototype={
$1(d){this.a.afA()},
$S:21}
B.aLO.prototype={
$1(d){this.a.afA()},
$S:21}
B.aLP.prototype={
$1(d){var x,w,v=this.a.error
A.nn("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gk.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nX(x,C.Gj.h(0,A.ao(v,"code")),w,null))},
$S:27}
B.aLQ.prototype={
$1(d){},
$S:21}
B.aLS.prototype={
$0(){},
$S:0}
B.aLU.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLT.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a47("RTCVideoRenderer-"+w.Q)
else w=A.O(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cD(A.O(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:974}
B.aAk.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eU(w.ghn(w),new B.aAj(v),w.gnH())},
$S:0}
B.aAj.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aca()
x=x.b
x===$&&A.d()
x.a5(0)},
$S:0}
B.bgV.prototype={
$1(d){},
$S:17}
B.asf.prototype={
$1(d){this.a.cj(0,this.b)},
$S:22}
B.asg.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fH(new B.Hn("Failed to connect WebSocket"))
else this.b.a7C(1006,"error")},
$S:22}
B.ash.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cz("data")
if(typeof x==="string")w.b=new B.GU(A.by(x))
else if(typeof x==="object"&&A.bY_(y.m.a(x),"ArrayBuffer"))w.b=new B.D3(A.Om(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bp())},
$S:27}
B.asi.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cj(0,this.b)
this.b.a7C(d.code,d.reason)},
$S:22}
B.aoz.prototype={
$1(d){var x=d.b,w=this.a
new A.cA(x,A.u(x).i("cA<1>")).cA(new B.aow(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cA(x,A.u(x).i("cA<1>")).b6s(new B.aox(d),new B.aoy(w,d))
w.f.dd(0)},
$S:z+10}
B.aow.prototype={
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
B.aox.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bRO())
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
if(t){this.a.a4g(new Uint8Array(A.cU(u)))
break $label1$1}t=A.aN("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.P(r) instanceof B.Hm))throw r}},
$S:18}
B.aoy.prototype={
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
if(!(A.P(q) instanceof B.Hm))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.aoA.prototype={
$1(d){var x,w=d instanceof A.RP?d:new B.aaq(J.l(d)),v=this.a
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
x.arY=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ue.prototype,"gaxk","KA",0)
var v
w(v=B.Ud.prototype,"gaWC","afr",3)
x(v,"gacN","F3",0)
x(v,"ga6F","KT",0)
x(v,"ga6E","KS",0)
x(v,"ga6C","KP",0)
x(v,"ga6D","KQ",0)
w(v=B.a1A.prototype,"gaRb","aRc",7)
x(v,"gaQi","XA",1)
x(B.Pj.prototype,"gdJ","k",0)
x(B.Pm.prototype,"gaOn","aOo",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DQ,B.aqh,B.Gv,B.a1O,B.aQw,B.a1A,B.aLA,B.NV,B.F5,B.aGE,B.Ph,B.aLM,B.a9i,B.V6,B.a9h,B.xW,B.tg,B.Hn,B.aaq,B.FL,B.Au,B.Pi,B.Pk])
w(B.QO,A.fm)
x(A.jX,[B.aR7,B.bcf,B.bcc,B.bcd,B.bc9,B.bca,B.bcb,B.bc6,B.bc7,B.bce,B.bbS,B.bbQ,B.bbT,B.bbU,B.bbV,B.bbP,B.bbZ,B.bbO,B.bbN,B.bbM,B.atl,B.aGH,B.aGI,B.aLD,B.aLS,B.aLU,B.aAk,B.aAj,B.aoy])
x(A.ir,[B.aR8,B.aqi,B.bcg,B.bc8,B.bbR,B.bbW,B.bbX,B.bbY,B.bc_,B.bc0,B.bc1,B.bc2,B.bc3,B.bc4,B.aQx,B.aQy,B.aQz,B.atk,B.bMX,B.aGW,B.aGX,B.aGT,B.aGU,B.aGV,B.aGJ,B.aLE,B.aLF,B.aLG,B.aLH,B.aLI,B.aLJ,B.aLK,B.aLL,B.aLC,B.bN4,B.aLR,B.aLN,B.aLO,B.aLP,B.aLQ,B.bgV,B.asf,B.asg,B.ash,B.asi,B.aoz,B.aow,B.aox,B.aoA])
x(A.M,[B.p6,B.yC,B.Pl])
x(A.S,[B.Ue,B.Ud,B.Pm])
x(A.as,[B.ST,B.ac4,B.wF])
x(A.qL,[B.bc5,B.aGG,B.aLT])
w(B.aLB,B.aLA)
w(B.mI,B.NV)
w(B.a5n,B.F5)
w(B.aGF,B.aGE)
w(B.a72,B.Ph)
w(B.bRb,B.aLM)
w(B.Pj,A.d6)
x(B.a9i,[B.a3S,B.aov])
x(B.tg,[B.GU,B.D3,B.Dt])
w(B.Hm,B.Hn)
w(B.alj,B.DQ)
x(A.HQ,[B.vT,B.Pg,B.vS,B.mU,B.a73])})()
A.oy(b.typeUniverse,JSON.parse('{"DQ":{"dH":["1"]},"QO":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yC":{"M":[],"m":[]},"p6":{"M":[],"m":[]},"Ue":{"S":["p6"]},"ST":{"as":[],"m":[]},"Ud":{"S":["yC"]},"ac4":{"as":[],"m":[]},"wF":{"as":[],"m":[]},"mI":{"NV":[]},"a5n":{"F5":[]},"a72":{"Ph":[]},"Pj":{"d6":["Pk"],"aV":[]},"Pl":{"M":[],"m":[]},"Pm":{"S":["Pl"]},"V6":{"dH":["1"]},"xW":{"bRN":[]},"GU":{"tg":[]},"D3":{"tg":[]},"Dt":{"tg":[]},"Hn":{"bN":[]},"Hm":{"bN":[]},"alj":{"dH":["@"]},"aaq":{"bN":[]}}'))
A.bSf(b.typeUniverse,JSON.parse('{"DQ":1,"a9i":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xW"),L:x("bN"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F5>"),d:x("D<iA<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("J<av>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NV"),G:x("F5"),h:x("mI"),o:x("pu"),a:x("bn"),K:x("a0"),J:x("Ph"),v:x("Au"),Z:x("a9h<a0?>"),N:x("o"),e:x("pY"),M:x("e1"),D:x("tg"),U:x("W<o>"),g:x("ds<Gv>"),n:x("ds<~>"),V:x("aZ<xW>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Uo<av>"),C:x("or<av>"),k:x("au<xW>"),c:x("au<@>"),W:x("au<~>"),q:x("kx"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.UA=new B.a1O(C.kc)
D.y8=new A.am(32,0,32,0)
D.yT=new A.ak(57638,!1)
D.yU=new A.ak(57639,!1)
D.a_b=new A.ak(58337,!1)
D.a_c=new A.ak(58341,!1)
D.a_g=new A.ak(58923,!1)
D.z_=new A.ak(59048,!1)
D.a_h=new A.ak(59049,!1)
D.a_i=new A.ak(59077,!1)
D.a7Q=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.abC=A.b(x([]),y.Q)
D.Gw=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.ajE=new B.mU(0,"RTCIceConnectionStateNew")
D.ajF=new B.mU(1,"RTCIceConnectionStateChecking")
D.ajG=new B.mU(2,"RTCIceConnectionStateCompleted")
D.ajH=new B.mU(3,"RTCIceConnectionStateConnected")
D.ajI=new B.mU(4,"RTCIceConnectionStateCount")
D.KW=new B.mU(5,"RTCIceConnectionStateFailed")
D.ajJ=new B.mU(6,"RTCIceConnectionStateDisconnected")
D.KX=new B.mU(7,"RTCIceConnectionStateClosed")
D.KY=new B.Pg(0,"RTCIceGatheringStateNew")
D.ajK=new B.Pg(1,"RTCIceGatheringStateGathering")
D.ajL=new B.Pg(2,"RTCIceGatheringStateComplete")
D.t6=new B.vS(0,"RTCPeerConnectionStateClosed")
D.KZ=new B.vS(1,"RTCPeerConnectionStateFailed")
D.L_=new B.vS(2,"RTCPeerConnectionStateDisconnected")
D.L0=new B.vS(3,"RTCPeerConnectionStateNew")
D.L1=new B.vS(4,"RTCPeerConnectionStateConnecting")
D.L2=new B.vS(5,"RTCPeerConnectionStateConnected")
D.ajM=new B.vT(0,"RTCSignalingStateStable")
D.ajN=new B.vT(1,"RTCSignalingStateHaveLocalOffer")
D.ajO=new B.vT(2,"RTCSignalingStateHaveRemoteOffer")
D.ajP=new B.vT(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajQ=new B.vT(4,"RTCSignalingStateHaveRemotePrAnswer")
D.L3=new B.vT(5,"RTCSignalingStateClosed")
D.ajR=new B.Pk(0,0,0)
D.L4=new B.a73(0,"RTCVideoViewObjectFitContain")
D.L5=new B.a73(1,"RTCVideoViewObjectFitCover")
D.o3=new A.c5(20,null,null,null)
D.anl=new A.c5(48,null,null,null)
D.My=new A.c5(null,64,null,null)
D.aqq=new A.y(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nd=new A.y(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqO=new A.y(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nn=new A.y(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ue=new A.y(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c00=!1
$.bZl=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cu_","c5r",()=>new B.aLB())
x($,"cs3","bTP",()=>C.c.q(A.ao(A.ao(A.ao(A.bTu(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"NN4MKxo/+V/r0NZgsjsAYodx7zA=");