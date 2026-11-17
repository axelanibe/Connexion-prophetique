((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_12",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={CN:function CN(){},Pi:function Pi(d){this.$ti=d},aNt:function aNt(d){this.a=d},aNu:function aNu(d,e){this.a=d
this.b=e},
Zi(d){var x,w,v,u,t,s=new B.ana(),r=J.P(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aS(r.h(d,"appele_id"))
A.aS(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.an9(q,x,w,v,u,t)},
bR9(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lZ(t,y.N,y.z):D.fj
if(u.h(d,"cree_le")!=null)A.c5(J.l(u.h(d,"cree_le")))
return new B.Fn(s,x,w,v)},
c0V(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.To
x=A.b([],y.t)
for(r=J.ao(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lZ(s,u,t))}return new B.a_M(x)},
bDZ(d){var x=D.h.b7(d.a,1e6)
return D.c.b0(D.h.j(D.h.b7(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aP(x,60)),2,"0")},
bVW(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oc(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.aeS(w,v)},
ce5(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aeV(u,A.ke(w)?w:null,v)},
an9:function an9(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
ana:function ana(){},
Fn:function Fn(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a_M:function a_M(d){this.a=d},
bOi(d,e,f,g,h,i){return new B.oG(e,f,i,h,d,null)},
bOh(d,e,f,g,h){return new B.xS(e,h,f,g,d,null)},
bSl(d,e,f,g,h,i,j,k,l,m,n){return new B.a9x(g,f,e,i,h,d,m,l,k,j,n,null)},
oG:function oG(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Sw:function Sw(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b7v:function b7v(d){this.a=d},
b7w:function b7w(d){this.a=d},
b7s:function b7s(d){this.a=d},
b7t:function b7t(d){this.a=d},
b7p:function b7p(d){this.a=d},
b7q:function b7q(d){this.a=d},
b7r:function b7r(d){this.a=d},
b7m:function b7m(d){this.a=d},
b7n:function b7n(d){this.a=d},
b7o:function b7o(d){this.a=d},
b7u:function b7u(d){this.a=d},
Rd:function Rd(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
xS:function xS(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Sv:function Sv(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b76:function b76(d){this.a=d},
b77:function b77(d){this.a=d},
b75:function b75(){},
b78:function b78(d){this.a=d},
b79:function b79(d){this.a=d},
b7a:function b7a(d){this.a=d},
b7b:function b7b(d){this.a=d},
b74:function b74(d,e){this.a=d
this.b=e},
b7c:function b7c(){},
b7d:function b7d(d){this.a=d},
b7f:function b7f(d){this.a=d},
b7g:function b7g(d){this.a=d},
b7h:function b7h(d){this.a=d},
b7i:function b7i(d){this.a=d},
b7j:function b7j(d){this.a=d},
b7k:function b7k(d){this.a=d},
b7e:function b7e(d){this.a=d},
b73:function b73(d,e){this.a=d
this.b=e},
b72:function b72(d,e){this.a=d
this.b=e},
b71:function b71(d,e){this.a=d
this.b=e},
b7l:function b7l(d){this.a=d},
a9x:function a9x(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
w0:function w0(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aMT:function aMT(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aMU:function aMU(d){this.a=d},
aMV:function aMV(d){this.a=d},
aMW:function aMW(d){this.a=d},
a_w:function a_w(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aq_:function aq_(d){this.a=d},
aq0:function aq0(d){this.a=d},
bET(d){var x=y.U,w=A.J(new A.Y(A.b(d.split(" "),y.s),new B.bEU(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(D.b.gS(w),0).toUpperCase()
return(J.q(D.b.gS(w),0)+J.q(D.b.gaG(w),0)).toUpperCase()},
bEU:function bEU(){},
aIk:function aIk(){},
mn:function mn(d,e,f){this.e=d
this.a=e
this.b=f},
aDa:function aDa(d){this.a=d},
aDb:function aDb(d){this.a=d},
bIh(d){var x=new B.a3d(d)
x.at9(d)
return x},
a3d:function a3d(d){this.d=d},
aD7:function aD7(d){this.a=d},
aD8:function aD8(d){this.a=d},
aD9:function aD9(d){this.a=d},
aCX:function aCX(){},
aCZ:function aCZ(){},
aD_:function aD_(){},
aD0:function aD0(d){this.a=d},
aCY:function aCY(d){this.a=d},
c5x(d,e){var x=y.N
x=new B.a4J(d,e,A.C(x,y.E),A.C(x,y.z))
x.ate(d,e)
return x},
a4J:function a4J(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIn:function aIn(d){this.a=d},
aIo:function aIo(d){this.a=d},
aIp:function aIp(d){this.a=d},
aIq:function aIq(d){this.a=d},
aIr:function aIr(d){this.a=d},
aIs:function aIs(d){this.a=d},
aIt:function aIt(d){this.a=d},
aIu:function aIu(d){this.a=d},
aIl:function aIl(d){this.a=d},
aIm:function aIm(d,e){this.a=d
this.b=e},
bIO:function bIO(d){this.a=d},
cfR(){return D.b.mL(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bF1())!==-1},
bF1:function bF1(){},
bQB(){var x=A.b([],y.d),w=$.bQC
$.bQC=w+1
return new B.NU(w,x,C.agS,$.af())},
NU:function NU(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aIA:function aIA(d){this.a=d},
aIw:function aIw(d){this.a=d},
aIx:function aIx(d){this.a=d},
aIy:function aIy(d){this.a=d},
aIz:function aIz(){},
bQD(d,e,f){return new B.NW(d,f,e,null)},
NW:function NW(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
NX:function NX(){this.c=this.a=null},
aIB:function aIB(){},
aID:function aID(d){this.a=d},
aIC:function aIC(d){this.a=d},
bOP(d,e,f,g){var x,w={}
w.a=d
x=new B.a1K(g.i("a1K<0>"))
x.at0(e,f,w,g)
return x},
a1K:function a1K(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
awD:function awD(d,e){this.a=d
this.b=e},
awC:function awC(d){this.a=d},
Tl:function Tl(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bca:function bca(){},
a6S:function a6S(d){this.b=this.a=$
this.$ti=d},
a6T:function a6T(){},
bH4(d,e){return B.c0d(d,e)},
c0d(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bH4=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nI("ws")&&!d.nI("wss"))throw A.n(A.ff(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xe(r,A.fU(null,null,null,!1,y.D))
u=new A.aw($.aJ,y.k)
p=new A.b3(u,y.V)
if(J.p(r.readyState,1))p.cO(0,q)
else if(J.p(r.readyState,2)||J.p(r.readyState,3))p.hB(new B.Gc("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o1(r,"open",!1,y.C).gS(0).aE(new B.aoV(p,q),y.H)
t=y.C
s=y.H
new A.o1(r,"error",!1,t).gS(0).aE(new B.aoW(p,q),s)
A.mQ(r,"message",new B.aoX(q),!1,y.m)
new A.o1(r,"close",!1,t).gS(0).aE(new B.aoY(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bH4,w)},
xe:function xe(d,e){this.a=d
this.b=e},
aoV:function aoV(d,e){this.a=d
this.b=e},
aoW:function aoW(d,e){this.a=d
this.b=e},
aoX:function aoX(d){this.a=d},
aoY:function aoY(d,e){this.a=d
this.b=e},
bJo(){return new B.Gb("Connection Closed")},
rI:function rI(){},
FL:function FL(d){this.a=d},
C2:function C2(d){this.a=d},
Cq:function Cq(d,e){this.a=d
this.b=e},
Gc:function Gc(d){this.a=d},
Gb:function Gb(d){this.a=d},
c_K(d){var x=null,w=$.aJ,v=new B.a6S(y.Z),u=y.X,t=A.fU(x,x,x,!0,u),s=A.fU(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bOP(new A.cE(s,r.i("cE<1>")),new A.Bj(t,q.i("Bj<1>")),!0,u)
v.b=B.bOP(new A.cE(t,q.i("cE<1>")),new A.Bj(s,r.i("Bj<1>")),!1,u)
v=new B.alq(new A.b3(new A.aw(w,y.W),y.R),v)
v.asS(d)
return v},
alq:function alq(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
alu:function alu(d){this.a=d},
alr:function alr(d){this.a=d},
als:function als(d){this.a=d},
alt:function alt(d,e){this.a=d
this.b=e},
alv:function alv(d){this.a=d},
ais:function ais(d,e){this.b=d
this.a=e},
a7X:function a7X(d){this.a=d},
cfr(d){switch(d){case"new":return C.agF
case"checking":return C.agG
case"connected":return C.agI
case"completed":return C.agH
case"failed":return C.JP
case"disconnected":return C.agK
case"closed":return C.JQ
case"count":return C.agJ}return C.JQ},
cfs(d){switch(d){case"new":return C.JR
case"gathering":return C.agL
case"complete":return C.agM}return C.JR},
cgU(d){switch(d){case"stable":return C.agN
case"have-local-offer":return C.agO
case"have-local-pranswer":return C.agQ
case"have-remote-offer":return C.agP
case"have-remote-pranswer":return C.agR
case"closed":return C.JX}return C.JX},
cgw(d){switch(d){case"new":return C.JU
case"connecting":return C.JV
case"connected":return C.JW
case"closed":return C.rx
case"disconnected":return C.JT
case"failed":return C.JS}return C.rx},
vi:function vi(d,e){this.a=d
this.b=e},
NR:function NR(d,e){this.a=d
this.b=e},
vh:function vh(d,e){this.a=d
this.b=e},
my:function my(d,e){this.a=d
this.b=e},
a4K:function a4K(d,e){this.a=d
this.b=e},
aIj:function aIj(){},
Mu:function Mu(){},
E_:function E_(){},
aCW:function aCW(){},
ED:function ED(d,e,f){this.a=d
this.b=e
this.c=f},
NS:function NS(){},
aIv:function aIv(){},
zH:function zH(d,e){this.a=d
this.b=e},
NT:function NT(d){this.b=d},
NV:function NV(d,e,f){this.a=d
this.b=e
this.c=f},
bI_(d){var x=0,w=A.k(y.y)
var $async$bI_=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bI_,w)},
aGf(d){var x=0,w=A.k(y.H),v
var $async$aGf=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aR9("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGf)
case 2:return A.i(null,w)}})
return A.j($async$aGf,w)},
aR9(d,e,f,g){return B.c86(d,e,f,g,f.i("0?"))},
c86(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aR9=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aR8(),$async$aR9)
case 3:v=C.Fx.cw(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aR9,w)},
aR8(){var x=0,w=A.k(y.H),v,u
var $async$aR8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bSc?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(C.Fx.cw("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aR8)
case 4:$.bSc=!0
case 3:return A.i(null,w)}})
return A.j($async$aR8,w)}},C,E
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[28]
E=c[20]
B.CN.prototype={
E(d,e){this.a.E(0,e)},
cY(d,e){this.a.cY(d,e)},
a7(d){return this.a.a7(0)},
$idB:1}
B.Pi.prototype={
iG(d){var x=A.cC("subscription"),w=A.fU(new B.aNt(x),null,null,!0,this.$ti.y[1])
x.b=d.eH(new B.aNu(this,w),w.glK(w),w.gnk())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.an9.prototype={}
B.Fn.prototype={}
B.a_M.prototype={}
B.oG.prototype={
O(){return new B.Sw()}}
B.Sw.prototype={
T(){var x=this
x.V()
x.J5()
x.r=A.de(D.bZ,new B.b7v(x))
x.w=A.kO(C.WH,new B.b7w(x))},
k(){var x=this,w=x.r
if(w!=null)w.a2(0)
w=x.w
if(w!=null)w.a2(0)
w=x.x
if(w!=null)w.a2(0)
x.a5()},
Vh(){var x=this.x
if(x!=null)x.a2(0)
this.x=A.de(D.fU,new B.b7s(this))},
Mt(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Mt=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zE(p.c),$async$Mt)
case 7:r=e
q=B.Zi(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b7t(s))
p=s.r
if(p!=null)p.a2(0)
p=s.w
if(p!=null)p.a2(0)
s.Vh()}u=2
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
return A.j($async$Mt,w)},
J5(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$J5=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zE(o.c),$async$J5)
case 7:r=e
q=B.Zi(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaij()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b7p(s))
s.Vh()
x=1
break}s.n(new B.b7q(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b7r(s))
s.Vh()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$J5,w)},
IW(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$IW=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b7m(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.YV(q.c,"accepte"),$async$IW)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b7n(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(p,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.a2(0)
q=s.w
if(q!=null)q.a2(0)
q=s.c
q.toString
A.ab(q,!1).ww(A.ee(new B.b7o(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IW,w)},
C8(d){return this.aMX(d)},
auK(){return this.C8(!1)},
aMX(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$C8=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.a2(0)
r=s.w
if(r!=null)r.a2(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.YV(r.c,"refuse"),$async$C8)
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
if(r!=null)A.ab(r,!1).bJ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$C8,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oy(D.u,s,A.c(B.bET(r.d),s,s,s,s,C.M4,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.M_,D.a2,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.az,new A.a0(C.xq,x,s),D.j,A.c(q,s,s,s,s,C.tB,s,s,s),C.Lp],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b7u(t)
v=A.a("Accepter")
u=t.f?s:t.gatS()
q.push(A.a_(A.b([new B.Rd(C.ya,D.k1,r,x,s),C.akg,new B.Rd(C.y9,C.adl,v,u,s)],w),D.o,D.bS,D.i,s))}if(t.d)q.push(E.vJ)
return A.f0(s,D.n,A.hd(!0,A.cN(A.M(q,D.o,D.e,D.U),s,s),!0,D.aj,!0,!0),s,s)}}
B.Rd.prototype={
C(d){var x=this,w=null,v=A.di(x.d,w,w,D.aj,D.cs,w)
return A.M(A.b([A.aa(A.b4(!1,A.cc(x.c,D.l,w,32),D.k,w,D.q,w,w,w,w,x.f,w,v),72,72),D.j,A.c(x.e,w,w,w,w,D.eL,w,w,w)],y.p),D.o,D.e,D.U)}}
B.xS.prototype={
O(){return new B.Sv(A.b_(y.N),D.a3)}}
B.Sv.prototype={
T(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bQB()
w=B.bQB()
v.d!==$&&A.bi()
v.d=new B.aMT(x,w)
v.a.toString
x=new B.a_w(new A.er(u,u,y.O),new A.er(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uB()},
k(){var x=this,w=x.ay
if(w!=null)w.a2(0)
w=x.ch
if(w!=null)w.a2(0)
w=x.CW
if(w!=null)w.a2(0)
w=x.cx
if(w!=null)w.a2(0)
w=x.cy
if(w!=null)w.a2(0)
w=x.d
w===$&&A.d()
w.wh()
w=x.e
w===$&&A.d()
w.Ft()
x.a5()},
uB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.zE(m.c),$async$uB)
case 7:r=e
q=B.Zi(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.ml(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.O_(),$async$uB)
case 8:p=e
o=B.c0V(p)
x=9
return A.e(s.Sl(),$async$uB)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))}s.ml(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tO(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uB)
case 10:m.f=new B.b76(s)
m.r=new B.b77(s)
m.w=new B.b78(s)
if(s.c==null){x=1
break}s.n(new B.b79(s))
s.ch=A.de(D.bZ,new B.b7a(s))
s.CW=A.kO(D.cS,new B.b7b(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cK(k,A.u(k).i("cK<1>")).cQ(s.gaRE())
k=m.w
s.cy=new A.cK(k,A.u(k).i("cK<1>")).cQ(new B.b7c())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.N9(D.c.Q8("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f3(D.c9,n,D.ai,!0))}s.ay=A.kO(D.fU,new B.b7d(s))
s.De()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
s.ml(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uB,w)},
Sl(){var x=0,w=A.k(y.y),v
var $async$Sl=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Sl,w)},
De(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$De=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bW("/messagerie/appels/"+p.c+"/signaux"),$async$De)
case 7:r=e
for(p=J.ao(r);p.A();){q=p.gK(p)
s.acB(B.bR9(q))}u=2
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
return A.j($async$De,w)},
acB(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bVW(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.z9(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b7f(s),y.a).hi(new B.b7g(s))
break
case"reponse":if(!s.a.f)return
u=B.bVW(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.MR(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b7h(s),y.a).hi(new B.b7i(s))
break
case"candidat_ice":t=B.ce5(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.MN(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.Fn().aE(new B.b7j(s),y.a).hi(new B.b7k(s))
break
case"refuse":s.ml(A.a("Appel refus\xe9"))
break
case"annule":s.ml(A.a("Appel annul\xe9"))
break
case"termine":s.ml(A.a("Appel termin\xe9"))
break}},
a9O(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.a2(0)
w.n(new B.b7e(w))},
xK(d,e,f){return this.aAl(d,e,f)},
a6g(d,e){return this.xK(d,e,!0)},
aAl(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$xK=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.agn(s.c,e,d),$async$xK)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xK,w)},
DI(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$DI=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.a2(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.YV(r.c,"termine"),$async$DI)
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
if(r!=null)A.ab(r,!1).bJ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$DI,w)},
ml(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.a2(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.B(v,v,v,v,v,D.f,v,A.c(d,v,v,v,v,v,v,v,v),v,D.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.ab(x,!1).bJ()},
Jb(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Jb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Rl(u),$async$Jb)
case 2:if(v.c!=null)v.n(new B.b73(v,u))
return A.i(null,w)}})
return A.j($async$Jb,w)},
Ja(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ja=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ie(u),$async$Ja)
case 2:if(v.c!=null)v.n(new B.b72(v,u))
return A.i(null,w)}})
return A.j($async$Ja,w)},
J8(){var x=0,w=A.k(y.H),v=this,u,t
var $async$J8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ri(u),$async$J8)
case 2:if(v.c!=null)v.n(new B.b71(v,u))
return A.i(null,w)}})
return A.j($async$J8,w)},
J9(){var x=0,w=A.k(y.H),v=this,u
var $async$J9=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.MU(),$async$J9)
case 2:return A.i(null,w)}})
return A.j($async$J9,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bQD(o.e,!1,C.JZ)
else{x=A.oy(D.u,q,A.c(B.bET(w.e),q,q,q,q,C.aoG,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.an4,q,q,q)
x=A.cN(A.M(A.b([x,D.p,w,D.j,A.c(r.w?B.bDZ(r.ax):A.a(p),q,q,q,q,C.tB,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.NC(0,x)
o=A.lz(q,A.fo(A.Q(12),B.bQD(o.d,!0,C.JZ),D.as),160,q,q,16,16,110)
w=r.w
v=B.bDZ(r.ax)
u=r.z
t=r.Q
u=A.fR(D.bp,A.b([x,o,A.lz(24,B.bSl(r.as,v,w,!0,t,u,r.ga3U(),r.ga3T(),r.ga3V(),r.ga3W(),r.gaa4()),q,q,0,0,q,q)],y.p),D.f,D.bz,q)
o=u}else{o=A.oy(D.u,q,A.c(B.bET(w.e),q,q,q,q,C.M4,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.M_,D.a2,q,q)
if(r.w)w=B.bDZ(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tB,q,q,q)
v=r.w
u=B.bDZ(r.ax)
t=r.z
s=r.Q
t=A.cN(A.M(A.b([o,D.az,new A.a0(C.xq,x,q),D.j,w,C.Lp,B.bSl(r.as,u,v,!1,s,t,r.ga3U(),r.ga3T(),r.ga3V(),r.ga3W(),r.gaa4())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bQl(!1,A.f0(q,D.n,A.hd(!0,o,!0,D.aj,!0,!0),q,q),new B.b7l(r),y.K)}}
B.a9x.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.anS,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.YJ:C.YI
t=A.b([new B.w0(x,r,A.a("Muet"),v.x,u,u),C.nx,new B.w0(C.YS,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nx)
if(r){x=v.w
w=x?C.yf:C.YR
t.push(new B.w0(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nx)
if(r)t.push(new B.w0(C.YQ,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nx)
t.push(new B.w0(C.ya,!1,A.a("Raccrocher"),v.as,D.k1,u))
s.push(A.a_(t,D.o,D.bS,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.w0.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.lc
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.di(u,v,v,D.aj,D.cs,v)
return A.M(A.b([A.aa(A.b4(!1,A.cc(w.c,x,v,26),D.k,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b5,A.c(w.e,v,v,v,v,C.anT,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aMT.prototype={
tO(d,e){return this.b3v(d,e)},
b3v(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.lQ(0),$async$tO)
case 2:x=3
return A.e(v.e.lQ(0),$async$tO)
case 3:u=$.bXA()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aCX().Bq(0,A.a8(["audio",!0,"video",t],s,r)),$async$tO)
case 4:q=v.b=g
o.sa24(0,q)
x=5
return A.e(u.Y9(d,A.C(s,r)),$async$tO)
case 5:p=v.a=g
x=6
return A.e(p.kd(0,q),$async$tO)
case 6:p.e=new B.aMU(v)
p.Q=new B.aMV(v)
p.d=new B.aMW(v)
return A.i(null,w)}})
return A.j($async$tO,w)},
ayS(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa24(0,d)
x=w.r
if(x!=null)x.$0()}},
Fn(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Fn=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Nl(0),$async$Fn)
case 3:t=e
x=4
return A.e(s.BE(0,t),$async$Fn)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Fn,w)},
z9(d){return this.aWz(d)},
aWz(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$z9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BG(0,new B.zH(d.h(0,"sdp"),d.h(0,"type"))),$async$z9)
case 3:x=4
return A.e(s.Nj(0),$async$z9)
case 4:t=f
x=5
return A.e(s.BE(0,t),$async$z9)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$z9,w)},
MR(d){return this.aTR(d)},
aTR(d){var x=0,w=A.k(y.H),v=this,u
var $async$MR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BG(0,new B.zH(d.h(0,"sdp"),d.h(0,"type"))),$async$MR)
case 2:return A.i(null,w)}})
return A.j($async$MR,w)},
MN(d){return this.aTD(d)},
aTD(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$MN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.MD(new B.ED(A.aS(d.h(0,"candidate")),A.aS(d.h(0,"sdpMid")),A.e4(d.h(0,"sdpMLineIndex")))),$async$MN)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MN,w)},
Rl(d){return this.amT(d)},
amT(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Rl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.QS(0)
if(r==null)r=D.dg
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.I)(r),++s)r[s].skh(0,t)
return A.i(null,w)}})
return A.j($async$Rl,w)},
Ie(d){return this.amK(d)},
amK(d){var x=0,w=A.k(y.H)
var $async$Ie=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGf(d),$async$Ie)
case 2:return A.i(null,w)}})
return A.j($async$Ie,w)},
Ri(d){return this.amC(d)},
amC(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ri=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.HZ(0)
if(s==null)s=D.dg
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.I)(s),++t)s[t].skh(0,d)
return A.i(null,w)}})
return A.j($async$Ri,w)},
MU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$MU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.HZ(0)
if(s==null)s=C.a9n
if(s.length===0){x=1
break}x=3
return A.e(B.bI_(D.b.gS(s)),$async$MU)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MU,w)},
wh(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wh=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a7(0)
x=7
return A.e(y.x.b(q)?q:A.dQ(q,y.H),$async$wh)
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
else{o=A.J(q.QS(0),!0,y.G)
D.b.t(o,q.HZ(0))
q=o}if(q==null)q=D.dg
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c_C(r)
if(!m.b(k)){j=new A.aw($.aJ,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$wh)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.I)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.k(),$async$wh)
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
return A.e(s.e.k(),$async$wh)
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
return A.j($async$wh,w)}}
B.a_w.prototype={
N9(d){return this.aV5(d)},
aV5(d){var x=0,w=A.k(y.H),v=this
var $async$N9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.C9(),$async$N9)
case 2:return A.i(null,w)}})
return A.j($async$N9,w)},
C9(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$C9=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c_K(B.bH4(A.cO(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$C9)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aR(s.gaML(),!0,s.gaLU(),new B.aq_(s))
u=2
x=6
break
case 4:u=3
n=t
s.V8()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$C9,w)},
aMM(d){var x,w,v,u
try{x=D.a0.d0(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.p(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bR9(w))}catch(u){}},
V8(){var x,w=this,v=w.c
if(v!=null)v.a2(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=C.a5D[v]
w.f=v+1
v=w.d
if(v!=null)v.a2(0)
w.d=A.de(A.dw(0,0,0,0,x),new B.aq0(w))},
Ft(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Ft=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a2(0)
s=t.c
s=s==null?null:s.a2(0)
x=2
return A.e(y.x.b(s)?s:A.dQ(s,y.H),$async$Ft)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.aV()
r=s.w=new B.ais(s,q)}s=r.a7(0)}x=7
return A.e(y._.b(s)?s:A.dQ(s,y.z),$async$Ft)
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
return A.j($async$Ft,w)}}
B.aIk.prototype={
Y9(d,e){return this.aWr(d,e)},
aWr(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$Y9=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fA(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.c5x(D.d5.glN().bs(new A.eI(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Y9,w)}}
B.mn.prototype={
QS(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dd(w,A.X(w).i("dd<1,aA>"))
J.fZ(w,new B.aDa(x))
return x},
HZ(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dd(w,A.X(w).i("dd<1,aA>"))
J.fZ(w,new B.aDb(x))
return x}}
B.a3d.prototype={
at9(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aD7(x)))
w.addEventListener("mute",A.bV(new B.aD8(x)))
w.addEventListener("unmute",A.bV(new B.aD9(x)))},
skh(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aCX.prototype={
Bq(d,e){return this.alP(0,e)},
alP(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Bq=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cfR())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.iq(e.h(0,"video"),"facingMode")
e.cl(0,"video",new B.aCZ())
e.cl(0,"audio",new B.aD_())}catch(a0){A.n2("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hP(e.h(0,"audio"),i,i).aM(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fZ(s,new B.aD0(r))
J.iq(e.h(0,"audio"),"optional")
J.iU(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bd(a0)
A.n2("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.eG(o.getUserMedia(h.a(n)),h),$async$Bq)
case 10:m=a2
i=m
h=i.id
v=new B.mn(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eG(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Bq)
case 11:l=a2
h=l
g=h.id
v=new B.mn(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.O(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Bq,w)}}
B.a4J.prototype={
ate(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aIn(x)))
w.addEventListener("icecandidate",A.bV(new B.aIo(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIp(x)))
w.onicegatheringstatechange=A.bV(new B.aIq(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIr(x)))
if(!$.bLh())w.addEventListener("connectionstatechange",A.bV(new B.aIs(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aIt(x)))
w.addEventListener("track",A.bV(new B.aIu(x)))},
Nl(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eG(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nl)
case 3:t=f
v=new B.zH(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nl,w)},
Nj(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eG(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nj)
case 3:t=f
v=new B.zH(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nj,w)},
kd(d,e){var x
this.ax.cl(0,e.a,new B.aIm(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cR(null,y.H)},
BE(d,e){return this.amO(0,e)},
amO(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BE=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eG(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BE)
case 2:return A.i(null,w)}})
return A.j($async$BE,w)},
BG(d,e){return this.an2(0,e)},
an2(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BG=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eG(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BG)
case 2:return A.i(null,w)}})
return A.j($async$BG,w)},
MD(d){return this.aTk(d)},
aTk(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$MD=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eG(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$MD)
case 2:return A.i(null,w)}})
return A.j($async$MD,w)},
a7(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a7=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cR(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a7,w)}}
B.bIO.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.NU.prototype={
saix(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.FT()
if(x!=null)x.style.objectFit=e},
acK(){var x=this,w=x.FT(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.afs(u,x.z!=null,0,t))},
sa24(d,e){var x,w,v,u,t=this
t.z=e
if(e.HZ(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ao(y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.QS(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ao(y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aA9()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.FT()
if(u!=null){u.srcObject=t.x
x=t.FT()
x.toString
t.a3J(x)}t.sm(0,t.a.aVr(t.z!=null))},
aA9(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
FT(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.I)(t),++r)t[r].a2(0)
q=u.FT()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.el()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
lQ(d){var x=0,w=A.k(y.H),v=this
var $async$lQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.YY()
$.tk().wB("RTCVideoRenderer-"+v.Q,new B.aIA(v),!0)
return A.i(null,w)}})
return A.j($async$lQ,w)},
a3J(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.NW.prototype={
O(){return new B.NX()}}
B.NX.prototype={
T(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaKc())
x=v.a
w=x.c
w.as=x.e
w.saix(0,x.d===C.JY?"contain":"cover")},
aKd(){if(this.c!=null)this.n(new B.aIB())},
k(){if(this.c!=null)this.a5()},
aU(d){var x,w
this.bb(d)
A.de(A.dw(0,0,10,0,0),new B.aID(this))
x=this.a
w=x.c
w.saix(0,x.d===C.JY?"contain":"cover")},
C(d){return new A.lo(new B.aIC(this),null)}}
B.a1K.prototype={
at0(d,e,f,g){var x=this,w=$.aJ
x.a!==$&&A.bi()
x.a=new B.Tl(d,x,new A.b3(new A.aw(w,y.c),y.r),e,g.i("Tl<0>"))
if(f.a.ghU())f.a=new B.Pi(g.i("@<0>").bP(g).i("Pi<1,2>")).iG(f.a)
w=A.fU(null,new B.awD(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
a9p(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a2(0)
w=this.b
w===$&&A.d()
w.a7(0)}}
B.Tl.prototype={
E(d,e){if(this.e)throw A.n(A.al("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
cY(d,e){if(this.e)throw A.n(A.al("Cannot add event after closing."))
if(this.d)return
this.aCw(d,e)},
kW(d){return this.cY(d,null)},
aCw(d,e){var x=this
if(x.w){x.a.a.cY(d,e)
return}x.c.fg(d,e)
x.a9q()
x.b.a9p()
x.a.a.a7(0).hi(new B.bca())},
a7(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.a9p()
x.c.cO(0,x.a.a.a7(0))}return x.c.a},
a9q(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dL(0)
return},
$idB:1}
B.a6S.prototype={}
B.a6T.prototype={}
B.xe.prototype={
a4T(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Cq(d,e))
x.a7(0)},
a1G(d){var x
if((this.b.b&4)!==0)throw A.n(B.bJo())
x=A.bQ(d)
x.toString
this.a.send(x)},
vq(d,e,f){return this.aUQ(0,e,f)},
aUQ(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vq=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bJo())
u.a7(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vq,w)},
$ibJn:1}
B.rI.prototype={}
B.FL.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.FL&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.C2.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.C2&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fD(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Cq.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Cq&&e.a===this.a&&e.b===this.b},
gH(d){return A.fD([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gc.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Gb.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.alq.prototype={
asS(d){d.ex(new B.alu(this),new B.alv(this),y.a)}}
B.ais.prototype={
a7(d){var x=this.b
x.e=x.d=null
return this.aoD(0)}}
B.a7X.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vi.prototype={
M(){return"RTCSignalingState."+this.b}}
B.NR.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vh.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.my.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a4K.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIj.prototype={}
B.Mu.prototype={}
B.E_.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aCW.prototype={}
B.ED.prototype={}
B.NS.prototype={}
B.aIv.prototype={}
B.zH.prototype={}
B.NT.prototype={}
B.NV.prototype={
afs(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.NV(x,w,v)},
aVr(d){return this.afs(null,d,null,null)},
j(d){var x=this
return A.a2(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","xS(H)","~(Fn)","bn(ED)","bn(NT)","bn(my)","~(@)","mn(@)","mn()","bn(bJn)","~(rI)"])
B.aNt.prototype={
$0(){return J.c_2(this.a.bk())},
$S:1}
B.aNu.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.cY(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.ana.prototype={
$1(d){if(d==null)return null
return A.c5(J.l(d))},
$S:150}
B.b7v.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.C8(!0)},
$S:0}
B.b7w.prototype={
$1(d){return this.a.Mt()},
$S:39}
B.b7s.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bJ()},
$S:0}
B.b7t.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b7p.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7q.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b7r.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7m.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b7n.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b7o.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bOh(x.w,w,u,!1,v)},
$S:z+2}
B.b7u.prototype={
$0(){return this.a.auK()},
$S:0}
B.b76.prototype={
$1(d){this.a.xK("candidat_ice",d,!1)},
$S:374}
B.b77.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b75())},
$S:0}
B.b75.prototype={
$0(){},
$S:0}
B.b78.prototype={
$0(){this.a.ml(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b79.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b7a.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.xK("annule",D.fj,!1)
x.ml(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b7b.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b74(x,w))},
$S:39}
B.b74.prototype={
$0(){return this.a.ax=new A.av(Date.now(),0,!1).eT(this.b)},
$S:0}
B.b7c.prototype={
$1(d){},
$S:157}
B.b7d.prototype={
$1(d){this.a.De()},
$S:39}
B.b7f.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.a9O()
x.a6g("reponse",d)},
$S:375}
B.b7g.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b7h.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a9O()},
$S:33}
B.b7i.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b7j.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6g("offre",d)},
$S:375}
B.b7k.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b7e.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.av(Date.now(),0,!1)
x.ax=D.a3},
$S:0}
B.b73.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b72.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b71.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b7l.prototype={
$2(d,e){if(!d)this.a.DI()},
$S:919}
B.aMU.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aMV.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gS(x):null
if(w!=null)this.a.ayS(w)},
$S:z+5}
B.aMW.prototype={
$1(d){var x
if(d===C.JP){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.aq_.prototype={
$1(d){return this.a.V8()},
$S:26}
B.aq0.prototype={
$0(){var x=this.a
if(!x.e)x.C9()},
$S:0}
B.bEU.prototype={
$1(d){return d.length!==0},
$S:12}
B.aDa.prototype={
$1(d){return this.a.push(B.bIh(d))},
$S:26}
B.aDb.prototype={
$1(d){return this.a.push(B.bIh(d))},
$S:26}
B.aD7.prototype={
$1(d){},
$S:21}
B.aD8.prototype={
$1(d){},
$S:21}
B.aD9.prototype={
$1(d){},
$S:21}
B.aCZ.prototype={
$0(){return!1},
$S:48}
B.aD_.prototype={
$0(){return!1},
$S:48}
B.aD0.prototype={
$1(d){J.fZ(d,new B.aCY(this.a))},
$S:374}
B.aCY.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:47}
B.aIn.prototype={
$1(d){},
$S:21}
B.aIo.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.ED(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:21}
B.aIp.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cfr(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bLh())switch(w.cx.a){case 0:w.cy=C.JU
break
case 1:w.cy=C.JV
break
case 3:w.cy=C.JW
break
case 5:w.cy=C.JS
break
case 6:w.cy=C.JT
break
case 7:w.cy=C.rx
break
default:break}},
$S:44}
B.aIq.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cfs(w.iceGatheringState)},
$S:44}
B.aIr.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cgU(w.signalingState)},
$S:44}
B.aIs.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cgw(w.connectionState)},
$S:44}
B.aIt.prototype={
$1(d){},
$S:44}
B.aIu.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bIh(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aA>"))
w=J.eW(x,new B.aIl(w),y.h)
v.$1(new B.NT(A.J(w,!0,w.$ti.i("aF.E"))))}},
$S:21}
B.aIl.prototype={
$1(d){return new B.mn(d,d.id,this.a.as)},
$S:z+8}
B.aIm.prototype={
$0(){var x=this.b.e
return new B.mn(x,x.id,this.a.as)},
$S:z+9}
B.bF1.prototype={
$1(d){return J.fI(self.window.navigator.userAgent,A.bJ(d,!1,!1))},
$S:12}
B.aIA.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.I)(w),++u)w[u].a2(0)
D.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a3J(t)
v=y.i.c
w.push(A.mQ(t,"canplay",new B.aIw(x),!1,v))
w.push(A.mQ(t,"resize",new B.aIx(x),!1,v))
w.push(A.mQ(t,"error",new B.aIy(t),!1,v))
w.push(A.mQ(t,"ended",new B.aIz(),!1,v))
return t},
$S:376}
B.aIw.prototype={
$1(d){this.a.acK()},
$S:26}
B.aIx.prototype={
$1(d){this.a.acK()},
$S:26}
B.aIy.prototype={
$1(d){var x,w,v=this.a.error
A.n2("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.acJ.h(0,A.aj(v,"code"))
x.toString
w=!J.p(A.aj(v,"message"),"")?A.aj(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.p9(x,C.acI.h(0,A.aj(v,"code")),w,null))},
$S:40}
B.aIz.prototype={
$1(d){},
$S:26}
B.aIB.prototype={
$0(){},
$S:0}
B.aID.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aIC.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.axv("RTCVideoRenderer-"+w.Q)
else w=A.V(x,x,D.k,x,x,x,x,x,x,x,x,x,x,x)
return A.cN(A.V(x,w,D.k,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:921}
B.awD.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eH(w.ghz(w),new B.awC(v),w.gnk())},
$S:0}
B.awC.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.a9q()
x=x.b
x===$&&A.d()
x.a7(0)},
$S:0}
B.bca.prototype={
$1(d){},
$S:19}
B.aoV.prototype={
$1(d){this.a.cO(0,this.b)},
$S:21}
B.aoW.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.Gc("Failed to connect WebSocket"))
else this.b.a4T(1006,"error")},
$S:21}
B.aoX.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cC("data")
if(typeof x==="string")w.b=new B.FL(A.bA(x))
else if(typeof x==="object"&&A.c3E(y.m.a(x),"ArrayBuffer"))w.b=new B.C2(A.a3A(y.o.a(x),0,null))
else throw A.n(A.al("unexpected message type: "+J.az(x).j(0)))
v.E(0,w.bk())},
$S:40}
B.aoY.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cO(0,this.b)
this.b.a4T(d.code,d.reason)},
$S:21}
B.alu.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cQ(new B.alr(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b0L(new B.als(d),new B.alt(w,d))
w.f.dL(0)},
$S:z+10}
B.alr.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.FL
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.C2
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Cq){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a7(0)}}},
$S:z+11}
B.als.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.bJo())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a1G(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a1G(new Uint8Array(A.dC(u)))
break $label1$1}t=A.aK("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gb))throw r}},
$S:18}
B.alt.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vq(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.Gb))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.alv.prototype={
$1(d){var x,w=d instanceof A.Qg?d:new B.a7X(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.kW(w)
v=v.a
v===$&&A.d()
v.a7(0)},
$S:44};(function aliases(){var x=B.CN.prototype
x.aoD=x.a7})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Sw.prototype,"gatS","IW",0)
var v
w(v=B.Sv.prototype,"gaRE","acB",3)
x(v,"gaa4","DI",0)
x(v,"ga3W","Jb",0)
x(v,"ga3V","Ja",0)
x(v,"ga3T","J8",0)
x(v,"ga3U","J9",0)
w(v=B.a_w.prototype,"gaML","aMM",7)
x(v,"gaLU","V8",1)
x(B.NU.prototype,"gdM","k",0)
x(B.NX.prototype,"gaKc","aKd",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a1,[B.CN,B.an9,B.Fn,B.a_M,B.aMT,B.a_w,B.aIj,B.Mu,B.E_,B.aCW,B.NS,B.aIv,B.a6T,B.Tl,B.a6S,B.xe,B.rI,B.Gc,B.a7X,B.ED,B.zH,B.NT,B.NV])
w(B.Pi,A.f9)
x(A.jB,[B.aNt,B.b7v,B.b7s,B.b7t,B.b7p,B.b7q,B.b7r,B.b7m,B.b7n,B.b7u,B.b77,B.b75,B.b78,B.b79,B.b7a,B.b74,B.b7e,B.b73,B.b72,B.b71,B.aq0,B.aCZ,B.aD_,B.aIm,B.aIB,B.aID,B.awD,B.awC,B.alt])
x(A.i9,[B.aNu,B.ana,B.b7w,B.b7o,B.b76,B.b7b,B.b7c,B.b7d,B.b7f,B.b7g,B.b7h,B.b7i,B.b7j,B.b7k,B.aMU,B.aMV,B.aMW,B.aq_,B.bEU,B.aDa,B.aDb,B.aD7,B.aD8,B.aD9,B.aD0,B.aIn,B.aIo,B.aIp,B.aIq,B.aIr,B.aIs,B.aIt,B.aIu,B.aIl,B.bF1,B.aIA,B.aIw,B.aIx,B.aIy,B.aIz,B.bca,B.aoV,B.aoW,B.aoX,B.aoY,B.alu,B.alr,B.als,B.alv])
x(A.N,[B.oG,B.xS,B.NW])
x(A.T,[B.Sw,B.Sv,B.NX])
x(A.at,[B.Rd,B.a9x,B.w0])
x(A.qf,[B.b7l,B.aCY,B.aIC])
w(B.aIk,B.aIj)
w(B.mn,B.Mu)
w(B.a3d,B.E_)
w(B.aCX,B.aCW)
w(B.a4J,B.NS)
w(B.bIO,B.aIv)
w(B.NU,A.d3)
x(B.a6T,[B.a1K,B.alq])
x(B.rI,[B.FL,B.C2,B.Cq])
w(B.Gb,B.Gc)
w(B.ais,B.CN)
x(A.GE,[B.vi,B.NR,B.vh,B.my,B.a4K])})()
A.o7(b.typeUniverse,JSON.parse('{"CN":{"dB":["1"]},"Pi":{"f9":["1","2"],"f9.S":"1","f9.T":"2"},"xS":{"N":[],"m":[]},"oG":{"N":[],"m":[]},"Sw":{"T":["oG"]},"Rd":{"at":[],"m":[]},"Sv":{"T":["xS"]},"a9x":{"at":[],"m":[]},"w0":{"at":[],"m":[]},"mn":{"Mu":[]},"a3d":{"E_":[]},"a4J":{"NS":[]},"NU":{"d3":["NV"],"aX":[]},"NW":{"N":[],"m":[]},"NX":{"T":["NW"]},"Tl":{"dB":["1"]},"xe":{"bJn":[]},"FL":{"rI":[]},"C2":{"rI":[]},"Cq":{"rI":[]},"Gc":{"bM":[]},"Gb":{"bM":[]},"ais":{"dB":["@"]},"a7X":{"bM":[]}}'))
A.bJQ(b.typeUniverse,JSON.parse('{"CN":1,"a6T":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xe"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),v:x("dn<x,o>"),S:x("E<ai<o,L>>"),t:x("E<ai<o,@>>"),Q:x("E<E_>"),d:x("E<ig<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("K<aA>"),F:x("K<ai<o,@>>"),j:x("K<@>"),I:x("K<x>"),P:x("ai<o,@>"),f:x("ai<@,@>"),E:x("Mu"),G:x("E_"),h:x("mn"),o:x("p3"),a:x("bn"),K:x("a1"),J:x("NS"),g:x("zH"),Z:x("a6S<a1?>"),N:x("o"),e:x("pA"),M:x("e3"),D:x("rI"),U:x("Y<o>"),O:x("er<Fn>"),n:x("er<~>"),V:x("b3<xe>"),r:x("b3<@>"),R:x("b3<~>"),i:x("SG<aA>"),C:x("o1<aA>"),k:x("aw<xe>"),c:x("aw<@>"),W:x("aw<~>"),q:x("k9"),y:x("L"),z:x("@"),A:x("aA?"),X:x("a1?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.To=new B.a_M(D.mH)
C.WH=new A.b5(5e6)
C.xq=new A.ap(32,0,32,0)
C.y9=new A.ah(57638,!1)
C.ya=new A.ah(57639,!1)
C.YI=new A.ah(58337,!1)
C.YJ=new A.ah(58341,!1)
C.YQ=new A.ah(58923,!1)
C.yf=new A.ah(59048,!1)
C.YR=new A.ah(59049,!1)
C.YS=new A.ah(59077,!1)
C.a5D=A.b(x([1,2,4,8,16]),A.au("E<x>"))
C.a9n=A.b(x([]),y.Q)
C.acI=new A.dn([1,"The user canceled the fetching of the video.",2,"A network error occurred while fetching the video, despite having previously been available.",3,"An error occurred while trying to decode the video, despite having previously been determined to be usable.",4,"The video has been found to be unsuitable (missing or in a format not supported by your browser)."],y.v)
C.acJ=new A.dn([1,"MEDIA_ERR_ABORTED",2,"MEDIA_ERR_NETWORK",3,"MEDIA_ERR_DECODE",4,"MEDIA_ERR_SRC_NOT_SUPPORTED"],y.v)
C.Th=new A.F(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.r)
C.RI=new A.F(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.r)
C.S5=new A.F(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.r)
C.Sx=new A.F(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.r)
C.RR=new A.F(1,0.4,0.7333333333333333,0.41568627450980394,D.r)
C.RS=new A.F(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Tj=new A.F(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.r)
C.Sp=new A.F(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.r)
C.SB=new A.F(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.r)
C.Rz=new A.F(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.r)
C.adb=new A.dn([50,C.Th,100,C.RI,200,C.S5,300,C.Sx,400,C.RR,500,C.RS,600,C.Tj,700,C.Sp,800,C.SB,900,C.Rz],A.au("dn<x,F>"))
C.adl=new A.yR(C.adb,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Fx=new A.fB("FlutterWebRTC.Method",D.b8,null)
C.agF=new B.my(0,"RTCIceConnectionStateNew")
C.agG=new B.my(1,"RTCIceConnectionStateChecking")
C.agH=new B.my(2,"RTCIceConnectionStateCompleted")
C.agI=new B.my(3,"RTCIceConnectionStateConnected")
C.agJ=new B.my(4,"RTCIceConnectionStateCount")
C.JP=new B.my(5,"RTCIceConnectionStateFailed")
C.agK=new B.my(6,"RTCIceConnectionStateDisconnected")
C.JQ=new B.my(7,"RTCIceConnectionStateClosed")
C.JR=new B.NR(0,"RTCIceGatheringStateNew")
C.agL=new B.NR(1,"RTCIceGatheringStateGathering")
C.agM=new B.NR(2,"RTCIceGatheringStateComplete")
C.rx=new B.vh(0,"RTCPeerConnectionStateClosed")
C.JS=new B.vh(1,"RTCPeerConnectionStateFailed")
C.JT=new B.vh(2,"RTCPeerConnectionStateDisconnected")
C.JU=new B.vh(3,"RTCPeerConnectionStateNew")
C.JV=new B.vh(4,"RTCPeerConnectionStateConnecting")
C.JW=new B.vh(5,"RTCPeerConnectionStateConnected")
C.agN=new B.vi(0,"RTCSignalingStateStable")
C.agO=new B.vi(1,"RTCSignalingStateHaveLocalOffer")
C.agP=new B.vi(2,"RTCSignalingStateHaveRemoteOffer")
C.agQ=new B.vi(3,"RTCSignalingStateHaveLocalPrAnswer")
C.agR=new B.vi(4,"RTCSignalingStateHaveRemotePrAnswer")
C.JX=new B.vi(5,"RTCSignalingStateClosed")
C.agS=new B.NV(0,0,0)
C.JY=new B.a4K(0,"RTCVideoViewObjectFitContain")
C.JZ=new B.a4K(1,"RTCVideoViewObjectFitCover")
C.nx=new A.cf(20,null,null,null)
C.akg=new A.cf(48,null,null,null)
C.Lp=new A.cf(null,64,null,null)
C.an4=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M_=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tB=new A.y(!0,D.aq,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anT=new A.y(!0,D.l,null,null,null,null,12,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anS=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aoG=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M4=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bSc=!1
$.bQC=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ckc","bXA",()=>new B.aIk())
x($,"cik","bLh",()=>D.c.q(A.aj(A.aj(A.aj(A.bKZ(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_12",e:"endPart",h:b})})($__dart_deferred_initializers__,"Atc10/xt9umZMX1kPdHK7MO/XVI=");