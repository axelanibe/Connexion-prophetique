((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DQ:function DQ(){},QN:function QN(d){this.$ti=d},aQx:function aQx(d){this.a=d},aQy:function aQy(d,e){this.a=d
this.b=e},
a0l(d){var x,w,v,u,t,s=new B.aqj(),r=J.Q(d),q=r.h(d,"id")
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
return new B.aqi(q,x,w,v,u,t)},
bZd(d){var x,w,v,u=J.Q(d),t=u.h(d,"contenu"),s=u.h(d,"id")
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
c9h(d){var x,w,v,u,t,s,r=J.Q(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Uw
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mf(s,u,t))}return new B.a1P(x)},
bLr(d){var x=C.h.b0(d.a,1e6)
return C.c.b_(C.h.j(C.h.b0(x,60)),2,"0")+":"+C.c.b_(C.h.j(C.h.aP(x,60)),2,"0")},
c35(d){var x=J.Q(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oE(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ahy(w,v)},
cmX(d){var x,w,v=J.Q(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahB(u,A.jM(w)?w:null,v)},
aqi:function aqi(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aqj:function aqj(){},
Gv:function Gv(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1P:function a1P(d){this.a=d},
bWj(d,e,f,g,h,i){return new B.p6(e,f,i,h,d,null)},
bWi(d,e,f,g,h){return new B.yD(e,h,f,g,d,null)},
c_t(d,e,f,g,h,i,j,k,l,m,n){return new B.ac4(g,f,e,i,h,d,m,l,k,j,n,null)},
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
bbG:function bbG(d){this.a=d},
bbH:function bbH(d){this.a=d},
bbD:function bbD(d){this.a=d},
bbE:function bbE(d){this.a=d},
bbA:function bbA(d){this.a=d},
bbB:function bbB(d){this.a=d},
bbC:function bbC(d){this.a=d},
bbx:function bbx(d){this.a=d},
bby:function bby(d){this.a=d},
bbz:function bbz(d){this.a=d},
bbF:function bbF(d){this.a=d},
SS:function SS(d,e,f,g,h){var _=this
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
Uc:function Uc(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
bbh:function bbh(d){this.a=d},
bbi:function bbi(d){this.a=d},
bbg:function bbg(){},
bbj:function bbj(d){this.a=d},
bbk:function bbk(d){this.a=d},
bbl:function bbl(d){this.a=d},
bbm:function bbm(d){this.a=d},
bbf:function bbf(d,e){this.a=d
this.b=e},
bbn:function bbn(){},
bbo:function bbo(d){this.a=d},
bbq:function bbq(d){this.a=d},
bbr:function bbr(d){this.a=d},
bbs:function bbs(d){this.a=d},
bbt:function bbt(d){this.a=d},
bbu:function bbu(d){this.a=d},
bbv:function bbv(d){this.a=d},
bbp:function bbp(d){this.a=d},
bbe:function bbe(d,e){this.a=d
this.b=e},
bbd:function bbd(d,e){this.a=d
this.b=e},
bbc:function bbc(d,e){this.a=d
this.b=e},
bbw:function bbw(d){this.a=d},
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
aPW:function aPW(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aPX:function aPX(d){this.a=d},
aPY:function aPY(d){this.a=d},
aPZ:function aPZ(d){this.a=d},
a1B:function a1B(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
atl:function atl(d){this.a=d},
atm:function atm(d){this.a=d},
anu(d){var x=y.U,w=A.G(new A.W(A.b(d.split(" "),y.s),new B.bMk(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bMk:function bMk(){},
aL0:function aL0(){},
mH:function mH(d,e,f){this.e=d
this.a=e
this.b=f},
aGW:function aGW(d){this.a=d},
aGX:function aGX(d){this.a=d},
bQ0(d){var x=new B.a5o(d)
x.awD(d)
return x},
a5o:function a5o(d){this.d=d},
aGT:function aGT(d){this.a=d},
aGU:function aGU(d){this.a=d},
aGV:function aGV(d){this.a=d},
aGF:function aGF(){},
aGH:function aGH(){},
aGI:function aGI(){},
aGJ:function aGJ(d){this.a=d},
aGG:function aGG(d){this.a=d},
ce9(d,e){var x=y.N
x=new B.a73(d,e,A.C(x,y.E),A.C(x,y.z))
x.awI(d,e)
return x},
a73:function a73(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aL3:function aL3(d){this.a=d},
aL4:function aL4(d){this.a=d},
aL5:function aL5(d){this.a=d},
aL6:function aL6(d){this.a=d},
aL7:function aL7(d){this.a=d},
aL8:function aL8(d){this.a=d},
aL9:function aL9(d){this.a=d},
aLa:function aLa(d){this.a=d},
aL1:function aL1(d){this.a=d},
aL2:function aL2(d,e){this.a=d
this.b=e},
bQx:function bQx(d){this.a=d},
coU(){return C.b.m5(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bMs())!==-1},
bMs:function bMs(){},
bYF(){var x=A.b([],y.d),w=$.bYG
$.bYG=w+1
return new B.Pi(w,x,D.ak_,$.ad())},
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
aLg:function aLg(d){this.a=d},
aLc:function aLc(d){this.a=d},
aLd:function aLd(d){this.a=d},
aLe:function aLe(d){this.a=d},
aLf:function aLf(){},
bYH(d,e,f){return new B.Pk(d,f,e,null)},
Pk:function Pk(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pl:function Pl(){this.c=this.a=null},
aLh:function aLh(){},
aLj:function aLj(d){this.a=d},
aLi:function aLi(d){this.a=d},
bWT(d,e,f,g){var x,w={}
w.a=d
x=new B.a3T(g.i("a3T<0>"))
x.awu(e,f,w,g)
return x},
a3T:function a3T(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aAl:function aAl(d,e){this.a=d
this.b=e},
aAk:function aAk(d){this.a=d},
V5:function V5(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bgl:function bgl(){},
a9i:function a9i(d){this.b=this.a=$
this.$ti=d},
a9j:function a9j(){},
bON(d,e){return B.c8z(d,e)},
c8z(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bON=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o6("ws")&&!d.o6("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xX(r,A.fL(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.b_(u,y.V)
if(J.q(r.readyState,1))p.cj(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fH(new B.Hn("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.or(r,"open",!1,y.C).gS(0).av(new B.asg(p,q),y.H)
t=y.C
s=y.H
new A.or(r,"error",!1,t).gS(0).av(new B.ash(p,q),s)
A.hT(r,"message",new B.asi(q),!1,y.m)
new A.or(r,"close",!1,t).gS(0).av(new B.asj(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bON,w)},
xX:function xX(d,e){this.a=d
this.b=e},
asg:function asg(d,e){this.a=d
this.b=e},
ash:function ash(d,e){this.a=d
this.b=e},
asi:function asi(d){this.a=d},
asj:function asj(d,e){this.a=d
this.b=e},
bRa(){return new B.Hm("Connection Closed")},
tf:function tf(){},
GU:function GU(d){this.a=d},
D3:function D3(d){this.a=d},
Dt:function Dt(d,e){this.a=d
this.b=e},
Hn:function Hn(d){this.a=d},
Hm:function Hm(d){this.a=d},
c84(d){var x=null,w=$.aE,v=new B.a9i(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bWT(new A.cz(s,r.i("cz<1>")),new A.Cg(t,q.i("Cg<1>")),!0,u)
v.b=B.bWT(new A.cz(t,q.i("cz<1>")),new A.Cg(s,r.i("Cg<1>")),!1,u)
v=new B.aow(new A.b_(new A.au(w,y.W),y.R),v)
v.awk(d)
return v},
aow:function aow(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
aoA:function aoA(d){this.a=d},
aox:function aox(d){this.a=d},
aoy:function aoy(d){this.a=d},
aoz:function aoz(d,e){this.a=d
this.b=e},
aoB:function aoB(d){this.a=d},
alj:function alj(d,e){this.b=d
this.a=e},
aaq:function aaq(d){this.a=d},
cou(d){switch(d){case"new":return D.ajN
case"checking":return D.ajO
case"connected":return D.ajQ
case"completed":return D.ajP
case"failed":return D.KS
case"disconnected":return D.ajS
case"closed":return D.KT
case"count":return D.ajR}return D.KT},
cov(d){switch(d){case"new":return D.KU
case"gathering":return D.ajT
case"complete":return D.ajU}return D.KU},
cq4(d){switch(d){case"stable":return D.ajV
case"have-local-offer":return D.ajW
case"have-local-pranswer":return D.ajY
case"have-remote-offer":return D.ajX
case"have-remote-pranswer":return D.ajZ
case"closed":return D.L_}return D.L_},
cpG(d){switch(d){case"new":return D.KX
case"connecting":return D.KY
case"connected":return D.KZ
case"closed":return D.t7
case"disconnected":return D.KW
case"failed":return D.KV}return D.t7},
vR:function vR(d,e){this.a=d
this.b=e},
Pf:function Pf(d,e){this.a=d
this.b=e},
vQ:function vQ(d,e){this.a=d
this.b=e},
mT:function mT(d,e){this.a=d
this.b=e},
a74:function a74(d,e){this.a=d
this.b=e},
aL_:function aL_(){},
NV:function NV(){},
F5:function F5(){},
aGE:function aGE(){},
FL:function FL(d,e,f){this.a=d
this.b=e
this.c=f},
Pg:function Pg(){},
aLb:function aLb(){},
Av:function Av(d,e){this.a=d
this.b=e},
Ph:function Ph(d){this.b=d},
Pj:function Pj(d,e,f){this.a=d
this.b=e
this.c=f},
bPI(d){var x=0,w=A.k(y.y)
var $async$bPI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bPI,w)},
aIT(d){var x=0,w=A.k(y.H),v
var $async$aIT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aUR("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aIT)
case 2:return A.i(null,w)}})
return A.j($async$aIT,w)},
aUR(d,e,f,g){return B.cgR(d,e,f,g,f.i("0?"))},
cgR(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUR=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aUQ(),$async$aUR)
case 3:v=D.Gu.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUR,w)},
aUQ(){var x=0,w=A.k(y.H),v,u
var $async$aUQ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c_k?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Gu.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aUQ)
case 4:$.c_k=!0
case 3:return A.i(null,w)}})
return A.j($async$aUQ,w)}},D,E
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
iP(d){var x=A.cy("subscription"),w=A.fL(new B.aQx(x),null,null,!0,this.$ti.y[1])
x.b=d.eU(new B.aQy(this,w),w.gm0(w),w.gnH())
return new A.cz(w,A.u(w).i("cz<1>"))}}
B.aqi.prototype={}
B.Gv.prototype={}
B.a1P.prototype={}
B.p6.prototype={
N(){return new B.Ud()}}
B.Ud.prototype={
U(){var x=this
x.W()
x.KK()
x.r=A.di(C.c2,new B.bbG(x))
x.w=A.iD(C.xQ,new B.bbH(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a2()},
XK(){var x=this.x
if(x!=null)x.V(0)
this.x=A.di(C.fW,new B.bbD(this))},
Oq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Oq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.AV(p.c),$async$Oq)
case 7:r=e
q=B.a0l(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbE(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.XK()}u=2
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
return A.e(n.AV(o.c),$async$KK)
case 7:r=e
q=B.a0l(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.galk()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bbA(s))
s.XK()
x=1
break}s.n(new B.bbB(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bbC(s))
s.XK()
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
break}s.n(new B.bbx(s))
u=4
q=s.a
q.toString
p=$.aa()
x=7
return A.e(p.a0w(q.c,"accepte"),$async$KA)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.n(new B.bby(s))
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
A.a8(q,!1).xv(A.e5(new B.bbz(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KA,w)},
F8(d){return this.aRu(d)},
aRt(){return this.F8(!1)},
aRu(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F8=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.a0w(r.c,"refuse"),$async$F8)
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
return A.j($async$F8,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jU(C.r,s,A.c(B.anu(r.d),s,s,s,s,D.Nk,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.Na,C.W,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.az,new A.Y(D.ya,x,s),C.l,A.c(q,s,s,s,s,D.ug,s,s,s),D.Mv],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbF(t)
v=A.a("Accepter")
u=t.f?s:t.gaxl()
q.push(A.T(A.b([new B.SS(D.yT,C.aC,r,x,s),D.anu,new B.SS(D.yS,C.cB,v,u,s)],w),C.o,C.bi,C.i,s))}if(t.d)q.push(C.wu)
return A.eA(s,C.n,A.fl(!0,A.cC(A.I(q,C.o,C.e,C.V),s,s),!0,C.ai,!0,!0),s,s,s)}}
B.SS.prototype={
C(d){var x=this,w=null,v=A.d2(x.d,w,w,C.ai,C.cA,w)
return A.I(A.b([A.ac(A.b5(!1,A.c5(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dR,w,w,w)],y.p),C.o,C.e,C.V)}}
B.yD.prototype={
N(){return new B.Uc(A.aZ(y.N),C.R)}}
B.Uc.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bYF()
w=B.bYF()
v.d!==$&&A.bj()
v.d=new B.aPW(x,w)
v.a.toString
x=new B.a1B(new A.ds(u,u,y.g),new A.ds(u,u,y.n))
v.e!==$&&A.bj()
v.e=x
v.vh()},
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
w.iU()
w=x.e
w===$&&A.d()
w.GY()
x.a2()},
vh(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$vh=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.aa()
x=7
return A.e(l.AV(m.c),$async$vh)
case 7:r=e
q=B.a0l(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mD(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Q2(),$async$vh)
case 8:p=e
o=B.c9h(p)
x=9
return A.e(s.UE(),$async$vh)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mD(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.uu(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$vh)
case 10:m.f=new B.bbh(s)
m.r=new B.bbi(s)
m.w=new B.bbj(s)
if(s.c==null){x=1
break}s.n(new B.bbk(s))
s.ch=A.di(C.c2,new B.bbl(s))
s.CW=A.iD(C.ck,new B.bbm(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.c0(k,A.u(k).i("c0<1>")).cA(s.gaWD())
k=m.w
s.cy=new A.c0(k,A.u(k).i("c0<1>")).cA(new B.bbn())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.Pd(C.c.So("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f7(C.ca,n,C.aj,!0))}s.ay=A.iD(C.fW,new B.bbo(s))
s.Ez()
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
return A.j($async$vh,w)},
UE(){var x=0,w=A.k(y.y),v
var $async$UE=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$UE,w)},
Ez(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Ez=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.aa()
x=7
return A.e(o.c0("/messagerie/appels/"+p.c+"/signaux"),$async$Ez)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gL(p)
s.afu(B.bZd(q))}u=2
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
return A.j($async$Ez,w)},
afu(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c35(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Ap(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).av(new B.bbq(s),y.a).fG(new B.bbr(s))
break
case"reponse":if(!s.a.f)return
u=B.c35(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.OR(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).av(new B.bbs(s),y.a).fG(new B.bbt(s))
break
case"candidat_ice":t=B.cmX(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.OM(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.GS().av(new B.bbu(s),y.a).fG(new B.bbv(s))
break
case"refuse":s.mD(A.a("Appel refus\xe9"))
break
case"annule":s.mD(A.a("Appel annul\xe9"))
break
case"termine":s.mD(A.a("Appel termin\xe9"))
break}},
acy(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbp(w))},
yR(d,e,f){return this.aEe(d,e,f)},
a8Z(d,e){return this.yR(d,e,!0)},
aEe(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yR=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.aa()
x=6
return A.e(r.ajo(s.c,e,d),$async$yR)
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
return A.j($async$yR,w)},
F4(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F4=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.aa()
x=7
return A.e(q.a0w(r.c,"termine"),$async$F4)
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
return A.j($async$F4,w)},
mD(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.V(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.z(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.a8(x,!1).bt()},
KT(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KT=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.TB(u),$async$KT)
case 2:if(v.c!=null)v.n(new B.bbe(v,u))
return A.i(null,w)}})
return A.j($async$KT,w)},
KS(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.JR(u),$async$KS)
case 2:if(v.c!=null)v.n(new B.bbd(v,u))
return A.i(null,w)}})
return A.j($async$KS,w)},
KP(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ty(u),$async$KP)
case 2:if(v.c!=null)v.n(new B.bbc(v,u))
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
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bYH(o.e,!1,D.L1)
else{x=A.jU(C.r,q,A.c(B.anu(w.e),q,q,q,q,D.aqZ,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aqB,q,q,q)
x=A.cC(A.I(A.b([x,C.p,w,C.l,A.c(r.w?B.bLr(r.ax):A.a(p),q,q,q,q,D.ug,q,q,q)],y.p),C.o,C.e,C.V),q,q)}x=A.FC(0,x)
o=A.fz(q,A.eL(A.O(12),B.bYH(o.d,!0,D.L1),C.ao),160,q,q,16,16,110)
w=r.w
v=B.bLr(r.ax)
u=r.z
t=r.Q
u=A.ew(C.b2,A.b([x,o,A.fz(24,B.c_t(r.as,v,w,!0,t,u,r.ga6G(),r.ga6F(),r.ga6H(),r.ga6I(),r.gacQ()),q,q,0,0,q,q)],y.p),C.f,C.aY,q)
o=u}else{o=A.jU(C.r,q,A.c(B.anu(w.e),q,q,q,q,D.Nk,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.Na,C.W,q,q)
if(r.w)w=B.bLr(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.ug,q,q,q)
v=r.w
u=B.bLr(r.ax)
t=r.z
s=r.Q
t=A.cC(A.I(A.b([o,C.az,new A.Y(D.ya,x,q),C.l,w,D.Mv,B.c_t(r.as,u,v,!1,s,t,r.ga6G(),r.ga6F(),r.ga6H(),r.ga6I(),r.gacQ())],y.p),C.o,C.e,C.V),q,q)
o=t}return A.bQr(!1,A.eA(q,C.n,A.fl(!0,o,!0,C.ai,!0,!0),q,q,q),new B.bbw(r),y.K)}}
B.ac4.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nn,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_a:D.a_9
t=A.b([new B.wF(x,r,A.a("Muet"),v.x,u,u),D.nY,new B.wF(D.a_g,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nY)
if(r){x=v.w
w=x?D.z_:D.a_f
t.push(new B.wF(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nY)
if(r)t.push(new B.wF(D.a_e,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nY)
t.push(new B.wF(D.yT,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.T(t,C.o,C.bi,C.i,u))
return A.I(s,C.o,C.e,C.V)}}
B.wF.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lL
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d2(u,v,v,C.ai,C.cA,v)
return A.I(A.b([A.ac(A.b5(!1,A.c5(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aW,A.c(w.e,v,v,v,v,C.No,v,v,v)],y.p),C.o,C.e,C.V)}}
B.aPW.prototype={
uu(d,e){return this.b9o(d,e)},
b9o(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$uu=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.it(0),$async$uu)
case 2:x=3
return A.e(v.e.it(0),$async$uu)
case 3:u=$.c4L()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aGF().CH(0,A.a6(["audio",!0,"video",t],s,r)),$async$uu)
case 4:q=v.b=g
o.sa4K(0,q)
x=5
return A.e(u.a_J(d,A.C(s,r)),$async$uu)
case 5:p=v.a=g
x=6
return A.e(p.km(0,q),$async$uu)
case 6:p.e=new B.aPX(v)
p.Q=new B.aPY(v)
p.d=new B.aPZ(v)
return A.i(null,w)}})
return A.j($async$uu,w)},
aCE(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4K(0,d)
x=w.r
if(x!=null)x.$0()}},
GS(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Po(0),$async$GS)
case 3:t=e
x=4
return A.e(s.CU(0,t),$async$GS)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GS,w)},
Ap(d){return this.b0W(d)},
b0W(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ap=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.CX(0,new B.Av(d.h(0,"sdp"),d.h(0,"type"))),$async$Ap)
case 3:x=4
return A.e(s.Pm(0),$async$Ap)
case 4:t=f
x=5
return A.e(s.CU(0,t),$async$Ap)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ap,w)},
OR(d){return this.aYW(d)},
aYW(d){var x=0,w=A.k(y.H),v=this,u
var $async$OR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.CX(0,new B.Av(d.h(0,"sdp"),d.h(0,"type"))),$async$OR)
case 2:return A.i(null,w)}})
return A.j($async$OR,w)},
OM(d){return this.aYI(d)},
aYI(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.OB(new B.FL(A.aM(d.h(0,"candidate")),A.aM(d.h(0,"sdpMid")),A.eh(d.h(0,"sdpMLineIndex")))),$async$OM)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OM,w)},
TB(d){return this.aq9(d)},
aq9(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$TB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T9(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skr(0,t)
return A.i(null,w)}})
return A.j($async$TB,w)},
JR(d){return this.aq0(d)},
aq0(d){var x=0,w=A.k(y.H)
var $async$JR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aIT(d),$async$JR)
case 2:return A.i(null,w)}})
return A.j($async$JR,w)},
Ty(d){return this.apT(d)},
apT(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ty=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.JA(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skr(0,d)
return A.i(null,w)}})
return A.j($async$Ty,w)},
OU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.JA(0)
if(s==null)s=D.abG
if(s.length===0){x=1
break}x=3
return A.e(B.bPI(C.b.gS(s)),$async$OU)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OU,w)},
iU(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iU=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a5(0)
x=7
return A.e(y.x.b(q)?q:A.dj(q,y.H),$async$iU)
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
q=o}if(q==null)q=C.dn
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c7Z(r)
if(!m.b(k)){j=new A.au($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$iU)
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
return A.e(s.d.k(),$async$iU)
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
return A.e(s.e.k(),$async$iU)
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
return A.j($async$iU,w)}}
B.a1B.prototype={
Pd(d){return this.b_f(d)},
b_f(d){var x=0,w=A.k(y.H),v=this
var $async$Pd=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Dr(),$async$Pd)
case 2:return A.i(null,w)}})
return A.j($async$Pd,w)},
Dr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dr=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.c84(B.bON(A.cx(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Dr)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cz(p,A.u(p).i("cz<1>")).aT(s.gaRc(),!0,s.gaQj(),new B.atl(s))
u=2
x=6
break
case 4:u=3
n=t
s.XB()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dr,w)},
aRd(d){var x,w,v,u
try{x=C.Z.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bZd(w))}catch(u){}},
XB(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7U[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.di(A.d1(0,0,0,0,x),new B.atm(w))},
GY(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GY=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.e(y.x.b(s)?s:A.dj(s,y.H),$async$GY)
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
return A.e(y._.b(s)?s:A.dj(s,y.z),$async$GY)
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
return A.j($async$GY,w)}}
B.aL0.prototype={
a_J(d,e){return this.b0M(d,e)},
b0M(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_J=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fv(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.ce9(C.cx.gle().bi(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_J,w)}}
B.mH.prototype={
T9(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fS(w,new B.aGW(x))
return x},
JA(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fS(w,new B.aGX(x))
return x}}
B.a5o.prototype={
awD(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aGT(x)))
w.addEventListener("mute",A.bF(new B.aGU(x)))
w.addEventListener("unmute",A.bF(new B.aGV(x)))},
skr(d,e){this.d.enabled=e},
aF(d){var x=0,w=A.k(y.H),v=this
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aF,w)}}
B.aGF.prototype={
CH(d,e){return this.ap0(0,e)},
ap0(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CH=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.coU())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iK(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aGH())
e.cq(0,"audio",new B.aGI())}catch(a0){A.nn("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fS(s,new B.aGJ(r))
J.iK(e.h(0,"audio"),"optional")
J.jb(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bd(a0)
A.nn("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bR(e)
x=10
return A.e(A.dS(o.getUserMedia(h.a(n)),h),$async$CH)
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
return A.e(A.dS(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CH)
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
return A.j($async$CH,w)}}
B.a73.prototype={
awI(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bF(new B.aL3(x)))
w.addEventListener("icecandidate",A.bF(new B.aL4(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aL5(x)))
w.onicegatheringstatechange=A.bF(new B.aL6(x))
w.addEventListener("signalingstatechange",A.bF(new B.aL7(x)))
if(!$.bTb())w.addEventListener("connectionstatechange",A.bF(new B.aL8(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aL9(x)))
w.addEventListener("track",A.bF(new B.aLa(x)))},
Po(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Po=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dS(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$Po)
case 3:t=f
v=new B.Av(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Po,w)},
Pm(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.dS(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$Pm)
case 3:t=f
v=new B.Av(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pm,w)},
km(d,e){var x
this.ax.cq(0,e.a,new B.aL2(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cG(null,y.H)},
CU(d,e){return this.aq4(0,e)},
aq4(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CU=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dS(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CU)
case 2:return A.i(null,w)}})
return A.j($async$CU,w)},
CX(d,e){return this.aqk(0,e)},
aqk(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.dS(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CX)
case 2:return A.i(null,w)}})
return A.j($async$CX,w)},
OB(d){return this.aYn(d)},
aYn(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$OB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.dS(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$OB)
case 2:return A.i(null,w)}})
return A.j($async$OB,w)},
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
B.bQx.prototype={
aF(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aF,w)}}
B.Pi.prototype={
salA(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hq()
if(x!=null)x.style.objectFit=e},
afD(){var x=this,w=x.Hq(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.aiu(u,x.z!=null,0,t))},
sa4K(d,e){var x,w,v,u,t=this
t.z=e
if(e.JA(0).length!==0){t.x=new self.MediaStream()
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
x=t.aE3()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hq()
if(u!=null){u.srcObject=t.x
x=t.Hq()
x.toString
t.a6u(x)}t.sl(0,t.a.b_E(t.z!=null))},
aE3(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Hq(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].V(0)
q=u.Hq()
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
it(d){var x=0,w=A.k(y.H),v=this
var $async$it=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CI()
$.oH().rd("RTCVideoRenderer-"+v.Q,new B.aLg(v),!0)
return A.i(null,w)}})
return A.j($async$it,w)},
a6u(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pk.prototype={
N(){return new B.Pl()}}
B.Pl.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a8(0,v.gaOo())
x=v.a
w=x.c
w.as=x.e
w.salA(0,x.d===D.L0?"contain":"cover")},
aOp(){if(this.c!=null)this.n(new B.aLh())},
k(){if(this.c!=null)this.a2()},
aS(d){var x,w
this.b7(d)
A.di(A.d1(0,0,10,0,0),new B.aLj(this))
x=this.a
w=x.c
w.salA(0,x.d===D.L0?"contain":"cover")},
C(d){return new A.i7(new B.aLi(this),null)}}
B.a3T.prototype={
awu(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.V5(d,x,new A.b_(new A.au(w,y.c),y.r),e,g.i("V5<0>"))
if(f.a.gi2())f.a=new B.QN(g.i("@<0>").bV(g).i("QN<1,2>")).iP(f.a)
w=A.fL(null,new B.aAl(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
acc(){var x,w
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
this.aGs(d,e)},
ho(d){return this.d6(d,null)},
aGs(d,e){var x=this
if(x.w){x.a.a.d6(d,e)
return}x.c.fo(d,e)
x.acd()
x.b.acc()
x.a.a.a5(0).fG(new B.bgl())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.acc()
x.c.cj(0,x.a.a.a5(0))}return x.c.a},
acd(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dd(0)
return},
$idH:1}
B.a9i.prototype={}
B.a9j.prototype={}
B.xX.prototype={
a7F(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dt(d,e))
x.a5(0)},
a4j(d){var x
if((this.b.b&4)!==0)throw A.n(B.bRa())
x=A.bR(d)
x.toString
this.a.send(x)},
wb(d,e,f){return this.b_0(0,e,f)},
b_0(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wb=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bRa())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wb,w)},
$ibR9:1}
B.tf.prototype={}
B.GU.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GU&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.D3.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.D3&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fX(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dt.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dt&&e.a===this.a&&e.b===this.b},
gH(d){return A.fX([this.a,this.b])},
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
B.aow.prototype={
awk(d){d.eG(new B.aoA(this),new B.aoB(this),y.a)}}
B.alj.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arZ(0)}}
B.aaq.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.vR.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Pf.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vQ.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mT.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a74.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aL_.prototype={}
B.NV.prototype={}
B.F5.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aGE.prototype={}
B.FL.prototype={}
B.Pg.prototype={}
B.aLb.prototype={}
B.Av.prototype={}
B.Ph.prototype={}
B.Pj.prototype={
aiu(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Pj(x,w,v)},
b_E(d){return this.aiu(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yD(E)","~(Gv)","bm(FL)","bm(Ph)","bm(mT)","~(@)","mH(@)","mH()","bm(bR9)","~(tf)"])
B.aQx.prototype={
$0(){return J.c7i(this.a.bp())},
$S:1}
B.aQy.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d6(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqj.prototype={
$1(d){if(d==null)return null
return A.bY(J.l(d))},
$S:142}
B.bbG.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F8(!0)},
$S:0}
B.bbH.prototype={
$1(d){return this.a.Oq()},
$S:32}
B.bbD.prototype={
$0(){var x=this.a.c
if(x!=null)A.a8(x,!1).bt()},
$S:0}
B.bbE.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bbA.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbB.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bbC.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbx.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bby.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbz.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bWi(x.w,w,u,!1,v)},
$S:z+2}
B.bbF.prototype={
$0(){return this.a.aRt()},
$S:0}
B.bbh.prototype={
$1(d){this.a.yR("candidat_ice",d,!1)},
$S:256}
B.bbi.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bbg())},
$S:0}
B.bbg.prototype={
$0(){},
$S:0}
B.bbj.prototype={
$0(){this.a.mD(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bbk.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bbl.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yR("annule",C.e8,!1)
x.mD(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbm.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bbf(x,w))},
$S:32}
B.bbf.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).ew(this.b)},
$S:0}
B.bbn.prototype={
$1(d){},
$S:164}
B.bbo.prototype={
$1(d){this.a.Ez()},
$S:32}
B.bbq.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.acy()
x.a8Z("reponse",d)},
$S:390}
B.bbr.prototype={
$1(d){this.a.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbs.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.acy()},
$S:28}
B.bbt.prototype={
$1(d){this.a.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbu.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8Z("offre",d)},
$S:390}
B.bbv.prototype={
$1(d){this.a.mD(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbp.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.bbe.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bbd.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bbc.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbw.prototype={
$2(d,e){if(!d)this.a.F4()},
$S:972}
B.aPX.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aPY.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aCE(w)},
$S:z+5}
B.aPZ.prototype={
$1(d){var x
if(d===D.KS){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.atl.prototype={
$1(d){return this.a.XB()},
$S:21}
B.atm.prototype={
$0(){var x=this.a
if(!x.e)x.Dr()},
$S:0}
B.bMk.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGW.prototype={
$1(d){return this.a.push(B.bQ0(d))},
$S:21}
B.aGX.prototype={
$1(d){return this.a.push(B.bQ0(d))},
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
$1(d){J.fS(d,new B.aGG(this.a))},
$S:256}
B.aGG.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:48}
B.aL3.prototype={
$1(d){},
$S:22}
B.aL4.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FL(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aL5.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cou(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bTb())switch(w.cx.a){case 0:w.cy=D.KX
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
B.aL6.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cov(w.iceGatheringState)},
$S:30}
B.aL7.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cq4(w.signalingState)},
$S:30}
B.aL8.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cpG(w.connectionState)},
$S:30}
B.aL9.prototype={
$1(d){},
$S:30}
B.aLa.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bQ0(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>"))
w=J.eB(x,new B.aL1(w),y.h)
v.$1(new B.Ph(A.G(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aL1.prototype={
$1(d){return new B.mH(d,d.id,this.a.as)},
$S:z+8}
B.aL2.prototype={
$0(){var x=this.b.e
return new B.mH(x,x.id,this.a.as)},
$S:z+9}
B.bMs.prototype={
$1(d){return J.fR(self.window.navigator.userAgent,A.bL(d,!1,!1))},
$S:12}
B.aLg.prototype={
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
x.a6u(t)
v=y.i.c
w.push(A.hT(t,"canplay",new B.aLc(x),!1,v))
w.push(A.hT(t,"resize",new B.aLd(x),!1,v))
w.push(A.hT(t,"error",new B.aLe(t),!1,v))
w.push(A.hT(t,"ended",new B.aLf(),!1,v))
return t},
$S:159}
B.aLc.prototype={
$1(d){this.a.afD()},
$S:21}
B.aLd.prototype={
$1(d){this.a.afD()},
$S:21}
B.aLe.prototype={
$1(d){var x,w,v=this.a.error
A.nn("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gi.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nX(x,C.Gh.h(0,A.ao(v,"code")),w,null))},
$S:26}
B.aLf.prototype={
$1(d){},
$S:21}
B.aLh.prototype={
$0(){},
$S:0}
B.aLj.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aLi.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a48("RTCVideoRenderer-"+w.Q)
else w=A.P(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cC(A.P(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:973}
B.aAl.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eU(w.ghn(w),new B.aAk(v),w.gnH())},
$S:0}
B.aAk.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.acd()
x=x.b
x===$&&A.d()
x.a5(0)},
$S:0}
B.bgl.prototype={
$1(d){},
$S:17}
B.asg.prototype={
$1(d){this.a.cj(0,this.b)},
$S:22}
B.ash.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fH(new B.Hn("Failed to connect WebSocket"))
else this.b.a7F(1006,"error")},
$S:22}
B.asi.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cy("data")
if(typeof x==="string")w.b=new B.GU(A.bx(x))
else if(typeof x==="object"&&A.bXl(y.m.a(x),"ArrayBuffer"))w.b=new B.D3(A.Ol(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bp())},
$S:26}
B.asj.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cj(0,this.b)
this.b.a7F(d.code,d.reason)},
$S:22}
B.aoA.prototype={
$1(d){var x=d.b,w=this.a
new A.cz(x,A.u(x).i("cz<1>")).cA(new B.aox(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cz(x,A.u(x).i("cz<1>")).b6t(new B.aoy(d),new B.aoz(w,d))
w.f.dd(0)},
$S:z+10}
B.aox.prototype={
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
B.aoy.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bRa())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4j(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4j(new Uint8Array(A.cT(u)))
break $label1$1}t=A.aN("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.N(r) instanceof B.Hm))throw r}},
$S:18}
B.aoz.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.wb(0,s.d,s.e),$async$$0)
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
B.aoB.prototype={
$1(d){var x,w=d instanceof A.RO?d:new B.aaq(J.l(d)),v=this.a
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
x.arZ=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ud.prototype,"gaxl","KA",0)
var v
w(v=B.Uc.prototype,"gaWD","afu",3)
x(v,"gacQ","F4",0)
x(v,"ga6I","KT",0)
x(v,"ga6H","KS",0)
x(v,"ga6F","KP",0)
x(v,"ga6G","KQ",0)
w(v=B.a1B.prototype,"gaRc","aRd",7)
x(v,"gaQj","XB",1)
x(B.Pi.prototype,"gdJ","k",0)
x(B.Pl.prototype,"gaOo","aOp",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DQ,B.aqi,B.Gv,B.a1P,B.aPW,B.a1B,B.aL_,B.NV,B.F5,B.aGE,B.Pg,B.aLb,B.a9j,B.V5,B.a9i,B.xX,B.tf,B.Hn,B.aaq,B.FL,B.Av,B.Ph,B.Pj])
w(B.QN,A.fm)
x(A.jW,[B.aQx,B.bbG,B.bbD,B.bbE,B.bbA,B.bbB,B.bbC,B.bbx,B.bby,B.bbF,B.bbi,B.bbg,B.bbj,B.bbk,B.bbl,B.bbf,B.bbp,B.bbe,B.bbd,B.bbc,B.atm,B.aGH,B.aGI,B.aL2,B.aLh,B.aLj,B.aAl,B.aAk,B.aoz])
x(A.it,[B.aQy,B.aqj,B.bbH,B.bbz,B.bbh,B.bbm,B.bbn,B.bbo,B.bbq,B.bbr,B.bbs,B.bbt,B.bbu,B.bbv,B.aPX,B.aPY,B.aPZ,B.atl,B.bMk,B.aGW,B.aGX,B.aGT,B.aGU,B.aGV,B.aGJ,B.aL3,B.aL4,B.aL5,B.aL6,B.aL7,B.aL8,B.aL9,B.aLa,B.aL1,B.bMs,B.aLg,B.aLc,B.aLd,B.aLe,B.aLf,B.bgl,B.asg,B.ash,B.asi,B.asj,B.aoA,B.aox,B.aoy,B.aoB])
x(A.M,[B.p6,B.yD,B.Pk])
x(A.S,[B.Ud,B.Uc,B.Pl])
x(A.at,[B.SS,B.ac4,B.wF])
x(A.qL,[B.bbw,B.aGG,B.aLi])
w(B.aL0,B.aL_)
w(B.mH,B.NV)
w(B.a5o,B.F5)
w(B.aGF,B.aGE)
w(B.a73,B.Pg)
w(B.bQx,B.aLb)
w(B.Pi,A.d4)
x(B.a9j,[B.a3T,B.aow])
x(B.tf,[B.GU,B.D3,B.Dt])
w(B.Hm,B.Hn)
w(B.alj,B.DQ)
x(A.HQ,[B.vR,B.Pf,B.vQ,B.mT,B.a74])})()
A.oy(b.typeUniverse,JSON.parse('{"DQ":{"dH":["1"]},"QN":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yD":{"M":[],"m":[]},"p6":{"M":[],"m":[]},"Ud":{"S":["p6"]},"SS":{"at":[],"m":[]},"Uc":{"S":["yD"]},"ac4":{"at":[],"m":[]},"wF":{"at":[],"m":[]},"mH":{"NV":[]},"a5o":{"F5":[]},"a73":{"Pg":[]},"Pi":{"d4":["Pj"],"aV":[]},"Pk":{"M":[],"m":[]},"Pl":{"S":["Pk"]},"V5":{"dH":["1"]},"xX":{"bR9":[]},"GU":{"tf":[]},"D3":{"tf":[]},"Dt":{"tf":[]},"Hn":{"bN":[]},"Hm":{"bN":[]},"alj":{"dH":["@"]},"aaq":{"bN":[]}}'))
A.bRC(b.typeUniverse,JSON.parse('{"DQ":1,"a9j":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("xX"),L:x("bN"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ae<o,K>>"),t:x("D<ae<o,@>>"),Q:x("D<F5>"),d:x("D<iB<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("J<av>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("NV"),G:x("F5"),h:x("mH"),o:x("pv"),a:x("bm"),K:x("a0"),J:x("Pg"),v:x("Av"),Z:x("a9i<a0?>"),N:x("o"),e:x("pZ"),M:x("e1"),D:x("tf"),U:x("W<o>"),g:x("ds<Gv>"),n:x("ds<~>"),V:x("b_<xX>"),r:x("b_<@>"),R:x("b_<~>"),i:x("Un<av>"),C:x("or<av>"),k:x("au<xX>"),c:x("au<@>"),W:x("au<~>"),q:x("kw"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Uw=new B.a1P(C.kc)
D.ya=new A.al(32,0,32,0)
D.yS=new A.aj(57638,"MaterialIcons",null,!1)
D.yT=new A.aj(57639,"MaterialIcons",null,!1)
D.a_9=new A.aj(58337,"MaterialIcons",null,!1)
D.a_a=new A.aj(58341,"MaterialIcons",null,!1)
D.a_e=new A.aj(58923,"MaterialIcons",null,!1)
D.z_=new A.aj(59048,"MaterialIcons",null,!1)
D.a_f=new A.aj(59049,"MaterialIcons",null,!1)
D.a_g=new A.aj(59077,"MaterialIcons",null,!1)
D.a7U=A.b(x([1,2,4,8,16]),A.ay("D<v>"))
D.abG=A.b(x([]),y.Q)
D.Gu=new A.fk("FlutterWebRTC.Method",C.b7,null)
D.ajN=new B.mT(0,"RTCIceConnectionStateNew")
D.ajO=new B.mT(1,"RTCIceConnectionStateChecking")
D.ajP=new B.mT(2,"RTCIceConnectionStateCompleted")
D.ajQ=new B.mT(3,"RTCIceConnectionStateConnected")
D.ajR=new B.mT(4,"RTCIceConnectionStateCount")
D.KS=new B.mT(5,"RTCIceConnectionStateFailed")
D.ajS=new B.mT(6,"RTCIceConnectionStateDisconnected")
D.KT=new B.mT(7,"RTCIceConnectionStateClosed")
D.KU=new B.Pf(0,"RTCIceGatheringStateNew")
D.ajT=new B.Pf(1,"RTCIceGatheringStateGathering")
D.ajU=new B.Pf(2,"RTCIceGatheringStateComplete")
D.t7=new B.vQ(0,"RTCPeerConnectionStateClosed")
D.KV=new B.vQ(1,"RTCPeerConnectionStateFailed")
D.KW=new B.vQ(2,"RTCPeerConnectionStateDisconnected")
D.KX=new B.vQ(3,"RTCPeerConnectionStateNew")
D.KY=new B.vQ(4,"RTCPeerConnectionStateConnecting")
D.KZ=new B.vQ(5,"RTCPeerConnectionStateConnected")
D.ajV=new B.vR(0,"RTCSignalingStateStable")
D.ajW=new B.vR(1,"RTCSignalingStateHaveLocalOffer")
D.ajX=new B.vR(2,"RTCSignalingStateHaveRemoteOffer")
D.ajY=new B.vR(3,"RTCSignalingStateHaveLocalPrAnswer")
D.ajZ=new B.vR(4,"RTCSignalingStateHaveRemotePrAnswer")
D.L_=new B.vR(5,"RTCSignalingStateClosed")
D.ak_=new B.Pj(0,0,0)
D.L0=new B.a74(0,"RTCVideoViewObjectFitContain")
D.L1=new B.a74(1,"RTCVideoViewObjectFitCover")
D.nY=new A.c4(20,null,null,null)
D.anu=new A.c4(48,null,null,null)
D.Mv=new A.c4(null,64,null,null)
D.aqB=new A.y(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Na=new A.y(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqZ=new A.y(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nk=new A.y(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ug=new A.y(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c_k=!1
$.bYG=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ctt","c4L",()=>new B.aL0())
x($,"crw","bTb",()=>C.c.q(A.ao(A.ao(A.ao(A.bSQ(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"sXReW+LLnCGQH52vPqd/4+z61zA=");