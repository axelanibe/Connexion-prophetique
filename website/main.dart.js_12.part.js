((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_12",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={CL:function CL(){},Pg:function Pg(d){this.$ti=d},aNr:function aNr(d){this.a=d},aNs:function aNs(d,e){this.a=d
this.b=e},
Ze(d){var x,w,v,u,t,s=new B.an7(),r=J.P(d),q=r.h(d,"id")
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
return new B.an6(q,x,w,v,u,t)},
bR_(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lY(t,y.N,y.z):D.fj
if(u.h(d,"cree_le")!=null)A.c5(J.l(u.h(d,"cree_le")))
return new B.Fm(s,x,w,v)},
c0G(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.Tl
x=A.b([],y.t)
for(r=J.ao(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lY(s,u,t))}return new B.a_I(x)},
bDS(d){var x=D.h.bb(d.a,1e6)
return D.c.b0(D.h.j(D.h.bb(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aP(x,60)),2,"0")},
bVH(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oc(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.aeP(w,v)},
cdR(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aeS(u,A.ke(w)?w:null,v)},
an6:function an6(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
an7:function an7(){},
Fm:function Fm(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a_I:function a_I(d){this.a=d},
bO8(d,e,f,g,h,i){return new B.oG(e,f,i,h,d,null)},
bO7(d,e,f,g,h){return new B.xR(e,h,f,g,d,null)},
bSa(d,e,f,g,h,i,j,k,l,m,n){return new B.a9u(g,f,e,i,h,d,m,l,k,j,n,null)},
oG:function oG(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Ss:function Ss(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b7p:function b7p(d){this.a=d},
b7q:function b7q(d){this.a=d},
b7m:function b7m(d){this.a=d},
b7n:function b7n(d){this.a=d},
b7j:function b7j(d){this.a=d},
b7k:function b7k(d){this.a=d},
b7l:function b7l(d){this.a=d},
b7g:function b7g(d){this.a=d},
b7h:function b7h(d){this.a=d},
b7i:function b7i(d){this.a=d},
b7o:function b7o(d){this.a=d},
Ra:function Ra(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
xR:function xR(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Sr:function Sr(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b70:function b70(d){this.a=d},
b71:function b71(d){this.a=d},
b7_:function b7_(){},
b72:function b72(d){this.a=d},
b73:function b73(d){this.a=d},
b74:function b74(d){this.a=d},
b75:function b75(d){this.a=d},
b6Z:function b6Z(d,e){this.a=d
this.b=e},
b76:function b76(){},
b77:function b77(d){this.a=d},
b79:function b79(d){this.a=d},
b7a:function b7a(d){this.a=d},
b7b:function b7b(d){this.a=d},
b7c:function b7c(d){this.a=d},
b7d:function b7d(d){this.a=d},
b7e:function b7e(d){this.a=d},
b78:function b78(d){this.a=d},
b6Y:function b6Y(d,e){this.a=d
this.b=e},
b6X:function b6X(d,e){this.a=d
this.b=e},
b6W:function b6W(d,e){this.a=d
this.b=e},
b7f:function b7f(d){this.a=d},
a9u:function a9u(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
w_:function w_(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aMR:function aMR(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aMS:function aMS(d){this.a=d},
aMT:function aMT(d){this.a=d},
aMU:function aMU(d){this.a=d},
a_s:function a_s(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
apX:function apX(d){this.a=d},
apY:function apY(d){this.a=d},
bEL(d){var x=y.U,w=A.I(new A.Y(A.b(d.split(" "),y.s),new B.bEM(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(D.b.gS(w),0).toUpperCase()
return(J.q(D.b.gS(w),0)+J.q(D.b.gaG(w),0)).toUpperCase()},
bEM:function bEM(){},
aIh:function aIh(){},
mn:function mn(d,e,f){this.e=d
this.a=e
this.b=f},
aD7:function aD7(d){this.a=d},
aD8:function aD8(d){this.a=d},
bI9(d){var x=new B.a39(d)
x.at3(d)
return x},
a39:function a39(d){this.d=d},
aD4:function aD4(d){this.a=d},
aD5:function aD5(d){this.a=d},
aD6:function aD6(d){this.a=d},
aCU:function aCU(){},
aCW:function aCW(){},
aCX:function aCX(){},
aCY:function aCY(d){this.a=d},
aCV:function aCV(d){this.a=d},
c5i(d,e){var x=y.N
x=new B.a4F(d,e,A.C(x,y.E),A.C(x,y.z))
x.at8(d,e)
return x},
a4F:function a4F(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIk:function aIk(d){this.a=d},
aIl:function aIl(d){this.a=d},
aIm:function aIm(d){this.a=d},
aIn:function aIn(d){this.a=d},
aIo:function aIo(d){this.a=d},
aIp:function aIp(d){this.a=d},
aIq:function aIq(d){this.a=d},
aIr:function aIr(d){this.a=d},
aIi:function aIi(d){this.a=d},
aIj:function aIj(d,e){this.a=d
this.b=e},
bIG:function bIG(d){this.a=d},
cfD(){return D.b.mL(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bEU())!==-1},
bEU:function bEU(){},
bQr(){var x=A.b([],y.d),w=$.bQs
$.bQs=w+1
return new B.NS(w,x,C.agP,$.af())},
NS:function NS(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aIx:function aIx(d){this.a=d},
aIt:function aIt(d){this.a=d},
aIu:function aIu(d){this.a=d},
aIv:function aIv(d){this.a=d},
aIw:function aIw(){},
bQt(d,e,f){return new B.NU(d,f,e,null)},
NU:function NU(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
NV:function NV(){this.c=this.a=null},
aIy:function aIy(){},
aIA:function aIA(d){this.a=d},
aIz:function aIz(d){this.a=d},
bOF(d,e,f,g){var x,w={}
w.a=d
x=new B.a1G(g.i("a1G<0>"))
x.asV(e,f,w,g)
return x},
a1G:function a1G(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
awA:function awA(d,e){this.a=d
this.b=e},
awz:function awz(d){this.a=d},
Th:function Th(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bc4:function bc4(){},
a6O:function a6O(d){this.b=this.a=$
this.$ti=d},
a6P:function a6P(){},
bGX(d,e){return B.c_Z(d,e)},
c_Z(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bGX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nI("ws")&&!d.nI("wss"))throw A.n(A.ff(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xd(r,A.fU(null,null,null,!1,y.D))
u=new A.av($.aJ,y.k)
p=new A.b3(u,y.V)
if(J.p(r.readyState,1))p.cO(0,q)
else if(J.p(r.readyState,2)||J.p(r.readyState,3))p.hB(new B.Gb("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o1(r,"open",!1,y.C).gS(0).aF(new B.aoS(p,q),y.H)
t=y.C
s=y.H
new A.o1(r,"error",!1,t).gS(0).aF(new B.aoT(p,q),s)
A.mQ(r,"message",new B.aoU(q),!1,y.m)
new A.o1(r,"close",!1,t).gS(0).aF(new B.aoV(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bGX,w)},
xd:function xd(d,e){this.a=d
this.b=e},
aoS:function aoS(d,e){this.a=d
this.b=e},
aoT:function aoT(d,e){this.a=d
this.b=e},
aoU:function aoU(d){this.a=d},
aoV:function aoV(d,e){this.a=d
this.b=e},
bJf(){return new B.Ga("Connection Closed")},
rI:function rI(){},
FK:function FK(d){this.a=d},
C0:function C0(d){this.a=d},
Co:function Co(d,e){this.a=d
this.b=e},
Gb:function Gb(d){this.a=d},
Ga:function Ga(d){this.a=d},
c_v(d){var x=null,w=$.aJ,v=new B.a6O(y.Z),u=y.X,t=A.fU(x,x,x,!0,u),s=A.fU(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bOF(new A.cE(s,r.i("cE<1>")),new A.Bh(t,q.i("Bh<1>")),!0,u)
v.b=B.bOF(new A.cE(t,q.i("cE<1>")),new A.Bh(s,r.i("Bh<1>")),!1,u)
v=new B.aln(new A.b3(new A.av(w,y.W),y.R),v)
v.asM(d)
return v},
aln:function aln(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
alr:function alr(d){this.a=d},
alo:function alo(d){this.a=d},
alp:function alp(d){this.a=d},
alq:function alq(d,e){this.a=d
this.b=e},
als:function als(d){this.a=d},
aip:function aip(d,e){this.b=d
this.a=e},
a7U:function a7U(d){this.a=d},
cfe(d){switch(d){case"new":return C.agC
case"checking":return C.agD
case"connected":return C.agF
case"completed":return C.agE
case"failed":return C.JM
case"disconnected":return C.agH
case"closed":return C.JN
case"count":return C.agG}return C.JN},
cff(d){switch(d){case"new":return C.JO
case"gathering":return C.agI
case"complete":return C.agJ}return C.JO},
cgG(d){switch(d){case"stable":return C.agK
case"have-local-offer":return C.agL
case"have-local-pranswer":return C.agN
case"have-remote-offer":return C.agM
case"have-remote-pranswer":return C.agO
case"closed":return C.JU}return C.JU},
cgi(d){switch(d){case"new":return C.JR
case"connecting":return C.JS
case"connected":return C.JT
case"closed":return C.rv
case"disconnected":return C.JQ
case"failed":return C.JP}return C.rv},
vi:function vi(d,e){this.a=d
this.b=e},
NP:function NP(d,e){this.a=d
this.b=e},
vh:function vh(d,e){this.a=d
this.b=e},
my:function my(d,e){this.a=d
this.b=e},
a4G:function a4G(d,e){this.a=d
this.b=e},
aIg:function aIg(){},
Ms:function Ms(){},
DY:function DY(){},
aCT:function aCT(){},
EC:function EC(d,e,f){this.a=d
this.b=e
this.c=f},
NQ:function NQ(){},
aIs:function aIs(){},
zE:function zE(d,e){this.a=d
this.b=e},
NR:function NR(d){this.b=d},
NT:function NT(d,e,f){this.a=d
this.b=e
this.c=f},
bHS(d){var x=0,w=A.k(y.y)
var $async$bHS=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bHS,w)},
aGc(d){var x=0,w=A.k(y.H),v
var $async$aGc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aR7("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGc)
case 2:return A.i(null,w)}})
return A.j($async$aGc,w)},
aR7(d,e,f,g){return B.c7S(d,e,f,g,f.i("0?"))},
c7S(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aR7=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aR6(),$async$aR7)
case 3:v=C.Fv.cw(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aR7,w)},
aR6(){var x=0,w=A.k(y.H),v,u
var $async$aR6=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bS1?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(C.Fv.cw("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aR6)
case 4:$.bS1=!0
case 3:return A.i(null,w)}})
return A.j($async$aR6,w)}},C,E
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[28]
E=c[20]
B.CL.prototype={
E(d,e){this.a.E(0,e)},
cY(d,e){this.a.cY(d,e)},
a6(d){return this.a.a6(0)},
$idB:1}
B.Pg.prototype={
iG(d){var x=A.cC("subscription"),w=A.fU(new B.aNr(x),null,null,!0,this.$ti.y[1])
x.b=d.eH(new B.aNs(this,w),w.glK(w),w.gnk())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.an6.prototype={}
B.Fm.prototype={}
B.a_I.prototype={}
B.oG.prototype={
O(){return new B.Ss()}}
B.Ss.prototype={
U(){var x=this
x.V()
x.J4()
x.r=A.de(D.bZ,new B.b7p(x))
x.w=A.kN(C.WE,new B.b7q(x))},
k(){var x=this,w=x.r
if(w!=null)w.a2(0)
w=x.w
if(w!=null)w.a2(0)
w=x.x
if(w!=null)w.a2(0)
x.a5()},
Vh(){var x=this.x
if(x!=null)x.a2(0)
this.x=A.de(D.fU,new B.b7m(this))},
Ms(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Ms=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zE(p.c),$async$Ms)
case 7:r=e
q=B.Ze(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b7n(s))
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
return A.j($async$Ms,w)},
J4(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$J4=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zE(o.c),$async$J4)
case 7:r=e
q=B.Ze(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaie()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b7j(s))
s.Vh()
x=1
break}s.n(new B.b7k(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b7l(s))
s.Vh()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$J4,w)},
IV(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$IV=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b7g(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.YV(q.c,"accepte"),$async$IV)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b7h(s))
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
A.ab(q,!1).ww(A.ee(new B.b7i(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IV,w)},
C8(d){return this.aMR(d)},
auE(){return this.C8(!1)},
aMR(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
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
r=A.oy(D.u,s,A.c(B.bEL(r.d),s,s,s,s,C.M1,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.LX,D.a2,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.az,new A.a0(C.xo,x,s),D.j,A.c(q,s,s,s,s,C.tz,s,s,s),C.Lm],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b7o(t)
v=A.a("Accepter")
u=t.f?s:t.gatM()
q.push(A.a_(A.b([new B.Ra(C.y8,D.k1,r,x,s),C.akd,new B.Ra(C.y7,C.adi,v,u,s)],w),D.o,D.bS,D.i,s))}if(t.d)q.push(E.vH)
return A.f0(s,D.n,A.hd(!0,A.cN(A.M(q,D.o,D.e,D.U),s,s),!0,D.aj,!0,!0),s,s)}}
B.Ra.prototype={
C(d){var x=this,w=null,v=A.di(x.d,w,w,D.aj,D.cs,w)
return A.M(A.b([A.aa(A.b4(!1,A.cc(x.c,D.l,w,32),D.k,w,D.q,w,w,w,w,x.f,w,v),72,72),D.j,A.c(x.e,w,w,w,w,D.eL,w,w,w)],y.p),D.o,D.e,D.U)}}
B.xR.prototype={
O(){return new B.Sr(A.b_(y.N),D.a3)}}
B.Sr.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bQr()
w=B.bQr()
v.d!==$&&A.bi()
v.d=new B.aMR(x,w)
v.a.toString
x=new B.a_s(new A.er(u,u,y.O),new A.er(u,u,y.n))
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
q=B.Ze(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.ml(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.NZ(),$async$uB)
case 8:p=e
o=B.c0G(p)
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
case 10:m.f=new B.b70(s)
m.r=new B.b71(s)
m.w=new B.b72(s)
if(s.c==null){x=1
break}s.n(new B.b73(s))
s.ch=A.de(D.bZ,new B.b74(s))
s.CW=A.kN(D.cS,new B.b75(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cK(k,A.u(k).i("cK<1>")).cQ(s.gaRx())
k=m.w
s.cy=new A.cK(k,A.u(k).i("cK<1>")).cQ(new B.b76())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.N8(D.c.Q7("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f3(D.c9,n,D.ai,!0))}s.ay=A.kN(D.fU,new B.b77(s))
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
s.acx(B.bR_(q))}u=2
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
acx(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bVH(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.z9(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aF(new B.b79(s),y.a).hi(new B.b7a(s))
break
case"reponse":if(!s.a.f)return
u=B.bVH(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.MQ(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aF(new B.b7b(s),y.a).hi(new B.b7c(s))
break
case"candidat_ice":t=B.cdR(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.MM(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.Fn().aF(new B.b7d(s),y.a).hi(new B.b7e(s))
break
case"refuse":s.ml(A.a("Appel refus\xe9"))
break
case"annule":s.ml(A.a("Appel annul\xe9"))
break
case"termine":s.ml(A.a("Appel termin\xe9"))
break}},
a9L(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.a2(0)
w.n(new B.b78(w))},
xK(d,e,f){return this.aAd(d,e,f)},
a6f(d,e){return this.xK(d,e,!0)},
aAd(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$xK=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.agi(s.c,e,d),$async$xK)
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
Ja(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ja=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Rl(u),$async$Ja)
case 2:if(v.c!=null)v.n(new B.b6Y(v,u))
return A.i(null,w)}})
return A.j($async$Ja,w)},
J9(){var x=0,w=A.k(y.H),v=this,u,t
var $async$J9=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Id(u),$async$J9)
case 2:if(v.c!=null)v.n(new B.b6X(v,u))
return A.i(null,w)}})
return A.j($async$J9,w)},
J7(){var x=0,w=A.k(y.H),v=this,u,t
var $async$J7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ri(u),$async$J7)
case 2:if(v.c!=null)v.n(new B.b6W(v,u))
return A.i(null,w)}})
return A.j($async$J7,w)},
J8(){var x=0,w=A.k(y.H),v=this,u
var $async$J8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.MT(),$async$J8)
case 2:return A.i(null,w)}})
return A.j($async$J8,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bQt(o.e,!1,C.JW)
else{x=A.oy(D.u,q,A.c(B.bEL(w.e),q,q,q,q,C.aoD,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.an1,q,q,q)
x=A.cN(A.M(A.b([x,D.p,w,D.j,A.c(r.w?B.bDS(r.ax):A.a(p),q,q,q,q,C.tz,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.NA(0,x)
o=A.ly(q,A.fo(A.Q(12),B.bQt(o.d,!0,C.JW),D.as),160,q,q,16,16,110)
w=r.w
v=B.bDS(r.ax)
u=r.z
t=r.Q
u=A.fR(D.bp,A.b([x,o,A.ly(24,B.bSa(r.as,v,w,!0,t,u,r.ga3T(),r.ga3S(),r.ga3U(),r.ga3V(),r.gaa1()),q,q,0,0,q,q)],y.p),D.f,D.bz,q)
o=u}else{o=A.oy(D.u,q,A.c(B.bEL(w.e),q,q,q,q,C.M1,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.LX,D.a2,q,q)
if(r.w)w=B.bDS(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tz,q,q,q)
v=r.w
u=B.bDS(r.ax)
t=r.z
s=r.Q
t=A.cN(A.M(A.b([o,D.az,new A.a0(C.xo,x,q),D.j,w,C.Lm,B.bSa(r.as,u,v,!1,s,t,r.ga3T(),r.ga3S(),r.ga3U(),r.ga3V(),r.gaa1())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bQb(!1,A.f0(q,D.n,A.hd(!0,o,!0,D.aj,!0,!0),q,q),new B.b7f(r),y.K)}}
B.a9u.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.anP,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.YG:C.YF
t=A.b([new B.w_(x,r,A.a("Muet"),v.x,u,u),C.nv,new B.w_(C.YP,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nv)
if(r){x=v.w
w=x?C.yd:C.YO
t.push(new B.w_(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nv)
if(r)t.push(new B.w_(C.YN,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nv)
t.push(new B.w_(C.y8,!1,A.a("Raccrocher"),v.as,D.k1,u))
s.push(A.a_(t,D.o,D.bS,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.w_.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.lc
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.di(u,v,v,D.aj,D.cs,v)
return A.M(A.b([A.aa(A.b4(!1,A.cc(w.c,x,v,26),D.k,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b5,A.c(w.e,v,v,v,v,C.anQ,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aMR.prototype={
tO(d,e){return this.b3n(d,e)},
b3n(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.lQ(0),$async$tO)
case 2:x=3
return A.e(v.e.lQ(0),$async$tO)
case 3:u=$.bXl()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aCU().Bq(0,A.a8(["audio",!0,"video",t],s,r)),$async$tO)
case 4:q=v.b=g
o.sa23(0,q)
x=5
return A.e(u.Y9(d,A.C(s,r)),$async$tO)
case 5:p=v.a=g
x=6
return A.e(p.kd(0,q),$async$tO)
case 6:p.e=new B.aMS(v)
p.Q=new B.aMT(v)
p.d=new B.aMU(v)
return A.i(null,w)}})
return A.j($async$tO,w)},
ayK(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa23(0,d)
x=w.r
if(x!=null)x.$0()}},
Fn(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Fn=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Nk(0),$async$Fn)
case 3:t=e
x=4
return A.e(s.BE(0,t),$async$Fn)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Fn,w)},
z9(d){return this.aWs(d)},
aWs(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$z9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BG(0,new B.zE(d.h(0,"sdp"),d.h(0,"type"))),$async$z9)
case 3:x=4
return A.e(s.Ni(0),$async$z9)
case 4:t=f
x=5
return A.e(s.BE(0,t),$async$z9)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$z9,w)},
MQ(d){return this.aTK(d)},
aTK(d){var x=0,w=A.k(y.H),v=this,u
var $async$MQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BG(0,new B.zE(d.h(0,"sdp"),d.h(0,"type"))),$async$MQ)
case 2:return A.i(null,w)}})
return A.j($async$MQ,w)},
MM(d){return this.aTw(d)},
aTw(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$MM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.MC(new B.EC(A.aS(d.h(0,"candidate")),A.aS(d.h(0,"sdpMid")),A.e4(d.h(0,"sdpMLineIndex")))),$async$MM)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MM,w)},
Rl(d){return this.amN(d)},
amN(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Rl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.QS(0)
if(r==null)r=D.dg
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.J)(r),++s)r[s].skh(0,t)
return A.i(null,w)}})
return A.j($async$Rl,w)},
Id(d){return this.amE(d)},
amE(d){var x=0,w=A.k(y.H)
var $async$Id=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGc(d),$async$Id)
case 2:return A.i(null,w)}})
return A.j($async$Id,w)},
Ri(d){return this.amw(d)},
amw(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ri=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.HY(0)
if(s==null)s=D.dg
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.J)(s),++t)s[t].skh(0,d)
return A.i(null,w)}})
return A.j($async$Ri,w)},
MT(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$MT=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.HY(0)
if(s==null)s=C.a9k
if(s.length===0){x=1
break}x=3
return A.e(B.bHS(D.b.gS(s)),$async$MT)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MT,w)},
wh(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wh=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a6(0)
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
else{o=A.I(q.QS(0),!0,y.G)
D.b.t(o,q.HY(0))
q=o}if(q==null)q=D.dg
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c_n(r)
if(!m.b(k)){j=new A.av($.aJ,n)
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
case 14:case 9:q.length===o||(0,A.J)(q),++l
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
B.a_s.prototype={
N8(d){return this.aUZ(d)},
aUZ(d){var x=0,w=A.k(y.H),v=this
var $async$N8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.C9(),$async$N8)
case 2:return A.i(null,w)}})
return A.j($async$N8,w)},
C9(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$C9=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c_v(B.bGX(A.cO(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$C9)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aR(s.gaMF(),!0,s.gaLO(),new B.apX(s))
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
aMG(d){var x,w,v,u
try{x=D.a0.d0(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.p(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bR_(w))}catch(u){}},
V8(){var x,w=this,v=w.c
if(v!=null)v.a2(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=C.a5A[v]
w.f=v+1
v=w.d
if(v!=null)v.a2(0)
w.d=A.de(A.dw(0,0,0,0,x),new B.apY(w))},
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
r=s.w=new B.aip(s,q)}s=r.a6(0)}x=7
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
B.aIh.prototype={
Y9(d,e){return this.aWk(d,e)},
aWk(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
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
v=B.c5i(D.d5.glN().bs(new A.eI(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Y9,w)}}
B.mn.prototype={
QS(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dd(w,A.X(w).i("dd<1,aB>"))
J.fZ(w,new B.aD7(x))
return x},
HY(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dd(w,A.X(w).i("dd<1,aB>"))
J.fZ(w,new B.aD8(x))
return x}}
B.a39.prototype={
at3(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aD4(x)))
w.addEventListener("mute",A.bV(new B.aD5(x)))
w.addEventListener("unmute",A.bV(new B.aD6(x)))},
skh(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aCU.prototype={
Bq(d,e){return this.alJ(0,e)},
alJ(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Bq=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cfD())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.ir(e.h(0,"video"),"facingMode")
e.cl(0,"video",new B.aCW())
e.cl(0,"audio",new B.aCX())}catch(a0){A.n2("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).aO(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fZ(s,new B.aCY(r))
J.ir(e.h(0,"audio"),"optional")
J.iT(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
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
B.a4F.prototype={
at8(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aIk(x)))
w.addEventListener("icecandidate",A.bV(new B.aIl(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIm(x)))
w.onicegatheringstatechange=A.bV(new B.aIn(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIo(x)))
if(!$.bL7())w.addEventListener("connectionstatechange",A.bV(new B.aIp(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aIq(x)))
w.addEventListener("track",A.bV(new B.aIr(x)))},
Nk(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eG(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nk)
case 3:t=f
v=new B.zE(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nk,w)},
Ni(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Ni=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eG(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Ni)
case 3:t=f
v=new B.zE(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ni,w)},
kd(d,e){var x
this.ax.cl(0,e.a,new B.aIj(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cR(null,y.H)},
BE(d,e){return this.amI(0,e)},
amI(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BE=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eG(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BE)
case 2:return A.i(null,w)}})
return A.j($async$BE,w)},
BG(d,e){return this.amX(0,e)},
amX(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BG=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eG(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BG)
case 2:return A.i(null,w)}})
return A.j($async$BG,w)},
MC(d){return this.aTd(d)},
aTd(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$MC=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eG(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$MC)
case 2:return A.i(null,w)}})
return A.j($async$MC,w)},
a6(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cR(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6,w)}}
B.bIG.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.NS.prototype={
sais(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.FT()
if(x!=null)x.style.objectFit=e},
acG(){var x=this,w=x.FT(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.afo(u,x.z!=null,0,t))},
sa23(d,e){var x,w,v,u,t=this
t.z=e
if(e.HY(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ao(y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aB>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.QS(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ao(y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aB>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aA1()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.FT()
if(u!=null){u.srcObject=t.x
x=t.FT()
x.toString
t.a3I(x)}t.sm(0,t.a.aVk(t.z!=null))},
aA1(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
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
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.J)(t),++r)t[r].a2(0)
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
while(true)switch(x){case 0:$.YU()
$.tk().wB("RTCVideoRenderer-"+v.Q,new B.aIx(v),!0)
return A.i(null,w)}})
return A.j($async$lQ,w)},
a3I(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.NU.prototype={
O(){return new B.NV()}}
B.NV.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a8(0,v.gaK5())
x=v.a
w=x.c
w.as=x.e
w.sais(0,x.d===C.JV?"contain":"cover")},
aK6(){if(this.c!=null)this.n(new B.aIy())},
k(){if(this.c!=null)this.a5()},
aU(d){var x,w
this.ba(d)
A.de(A.dw(0,0,10,0,0),new B.aIA(this))
x=this.a
w=x.c
w.sais(0,x.d===C.JV?"contain":"cover")},
C(d){return new A.ln(new B.aIz(this),null)}}
B.a1G.prototype={
asV(d,e,f,g){var x=this,w=$.aJ
x.a!==$&&A.bi()
x.a=new B.Th(d,x,new A.b3(new A.av(w,y.c),y.r),e,g.i("Th<0>"))
if(f.a.ghU())f.a=new B.Pg(g.i("@<0>").bP(g).i("Pg<1,2>")).iG(f.a)
w=A.fU(null,new B.awA(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
a9n(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a2(0)
w=this.b
w===$&&A.d()
w.a6(0)}}
B.Th.prototype={
E(d,e){if(this.e)throw A.n(A.al("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
cY(d,e){if(this.e)throw A.n(A.al("Cannot add event after closing."))
if(this.d)return
this.aCo(d,e)},
kW(d){return this.cY(d,null)},
aCo(d,e){var x=this
if(x.w){x.a.a.cY(d,e)
return}x.c.fg(d,e)
x.a9o()
x.b.a9n()
x.a.a.a6(0).hi(new B.bc4())},
a6(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.a9n()
x.c.cO(0,x.a.a.a6(0))}return x.c.a},
a9o(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dL(0)
return},
$idB:1}
B.a6O.prototype={}
B.a6P.prototype={}
B.xd.prototype={
a4S(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Co(d,e))
x.a6(0)},
a1F(d){var x
if((this.b.b&4)!==0)throw A.n(B.bJf())
x=A.bQ(d)
x.toString
this.a.send(x)},
vq(d,e,f){return this.aUJ(0,e,f)},
aUJ(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vq=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bJf())
u.a6(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vq,w)},
$ibJe:1}
B.rI.prototype={}
B.FK.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.FK&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.C0.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.C0&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fD(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Co.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Co&&e.a===this.a&&e.b===this.b},
gH(d){return A.fD([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gb.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Ga.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.aln.prototype={
asM(d){d.ex(new B.alr(this),new B.als(this),y.a)}}
B.aip.prototype={
a6(d){var x=this.b
x.e=x.d=null
return this.aox(0)}}
B.a7U.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vi.prototype={
M(){return"RTCSignalingState."+this.b}}
B.NP.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vh.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.my.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a4G.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIg.prototype={}
B.Ms.prototype={}
B.DY.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aCT.prototype={}
B.EC.prototype={}
B.NQ.prototype={}
B.aIs.prototype={}
B.zE.prototype={}
B.NR.prototype={}
B.NT.prototype={
afo(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.NT(x,w,v)},
aVk(d){return this.afo(null,d,null,null)},
j(d){var x=this
return A.a2(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","xR(H)","~(Fm)","bp(EC)","bp(NR)","bp(my)","~(@)","mn(@)","mn()","bp(bJe)","~(rI)"])
B.aNr.prototype={
$0(){return J.bZO(this.a.bk())},
$S:1}
B.aNs.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.cY(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.an7.prototype={
$1(d){if(d==null)return null
return A.c5(J.l(d))},
$S:135}
B.b7p.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.C8(!0)},
$S:0}
B.b7q.prototype={
$1(d){return this.a.Ms()},
$S:38}
B.b7m.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bJ()},
$S:0}
B.b7n.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b7j.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7k.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b7l.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7g.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b7h.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b7i.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bO7(x.w,w,u,!1,v)},
$S:z+2}
B.b7o.prototype={
$0(){return this.a.auE()},
$S:0}
B.b70.prototype={
$1(d){this.a.xK("candidat_ice",d,!1)},
$S:375}
B.b71.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b7_())},
$S:0}
B.b7_.prototype={
$0(){},
$S:0}
B.b72.prototype={
$0(){this.a.ml(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b73.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b74.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.xK("annule",D.fj,!1)
x.ml(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b75.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b6Z(x,w))},
$S:38}
B.b6Z.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eT(this.b)},
$S:0}
B.b76.prototype={
$1(d){},
$S:157}
B.b77.prototype={
$1(d){this.a.De()},
$S:38}
B.b79.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.a9L()
x.a6f("reponse",d)},
$S:376}
B.b7a.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b7b.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a9L()},
$S:31}
B.b7c.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b7d.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6f("offre",d)},
$S:376}
B.b7e.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b78.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=D.a3},
$S:0}
B.b6Y.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b6X.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b6W.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b7f.prototype={
$2(d,e){if(!d)this.a.DI()},
$S:916}
B.aMS.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aMT.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gS(x):null
if(w!=null)this.a.ayK(w)},
$S:z+5}
B.aMU.prototype={
$1(d){var x
if(d===C.JM){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.apX.prototype={
$1(d){return this.a.V8()},
$S:26}
B.apY.prototype={
$0(){var x=this.a
if(!x.e)x.C9()},
$S:0}
B.bEM.prototype={
$1(d){return d.length!==0},
$S:12}
B.aD7.prototype={
$1(d){return this.a.push(B.bI9(d))},
$S:26}
B.aD8.prototype={
$1(d){return this.a.push(B.bI9(d))},
$S:26}
B.aD4.prototype={
$1(d){},
$S:21}
B.aD5.prototype={
$1(d){},
$S:21}
B.aD6.prototype={
$1(d){},
$S:21}
B.aCW.prototype={
$0(){return!1},
$S:50}
B.aCX.prototype={
$0(){return!1},
$S:50}
B.aCY.prototype={
$1(d){J.fZ(d,new B.aCV(this.a))},
$S:375}
B.aCV.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:46}
B.aIk.prototype={
$1(d){},
$S:21}
B.aIl.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EC(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:21}
B.aIm.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cfe(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bL7())switch(w.cx.a){case 0:w.cy=C.JR
break
case 1:w.cy=C.JS
break
case 3:w.cy=C.JT
break
case 5:w.cy=C.JP
break
case 6:w.cy=C.JQ
break
case 7:w.cy=C.rv
break
default:break}},
$S:42}
B.aIn.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cff(w.iceGatheringState)},
$S:42}
B.aIo.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cgG(w.signalingState)},
$S:42}
B.aIp.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cgi(w.connectionState)},
$S:42}
B.aIq.prototype={
$1(d){},
$S:42}
B.aIr.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bI9(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aB>"))
w=J.eW(x,new B.aIi(w),y.h)
v.$1(new B.NR(A.I(w,!0,w.$ti.i("aF.E"))))}},
$S:21}
B.aIi.prototype={
$1(d){return new B.mn(d,d.id,this.a.as)},
$S:z+8}
B.aIj.prototype={
$0(){var x=this.b.e
return new B.mn(x,x.id,this.a.as)},
$S:z+9}
B.bEU.prototype={
$1(d){return J.fI(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aIx.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.J)(w),++u)w[u].a2(0)
D.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a3I(t)
v=y.i.c
w.push(A.mQ(t,"canplay",new B.aIt(x),!1,v))
w.push(A.mQ(t,"resize",new B.aIu(x),!1,v))
w.push(A.mQ(t,"error",new B.aIv(t),!1,v))
w.push(A.mQ(t,"ended",new B.aIw(),!1,v))
return t},
$S:377}
B.aIt.prototype={
$1(d){this.a.acG()},
$S:26}
B.aIu.prototype={
$1(d){this.a.acG()},
$S:26}
B.aIv.prototype={
$1(d){var x,w,v=this.a.error
A.n2("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.acG.h(0,A.aj(v,"code"))
x.toString
w=!J.p(A.aj(v,"message"),"")?A.aj(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.p9(x,C.acF.h(0,A.aj(v,"code")),w,null))},
$S:43}
B.aIw.prototype={
$1(d){},
$S:26}
B.aIy.prototype={
$0(){},
$S:0}
B.aIA.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aIz.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.axs("RTCVideoRenderer-"+w.Q)
else w=A.V(x,x,D.k,x,x,x,x,x,x,x,x,x,x,x)
return A.cN(A.V(x,w,D.k,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:918}
B.awA.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eH(w.ghz(w),new B.awz(v),w.gnk())},
$S:0}
B.awz.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.a9o()
x=x.b
x===$&&A.d()
x.a6(0)},
$S:0}
B.bc4.prototype={
$1(d){},
$S:19}
B.aoS.prototype={
$1(d){this.a.cO(0,this.b)},
$S:21}
B.aoT.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.Gb("Failed to connect WebSocket"))
else this.b.a4S(1006,"error")},
$S:21}
B.aoU.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cC("data")
if(typeof x==="string")w.b=new B.FK(A.bA(x))
else if(typeof x==="object"&&A.c3p(y.m.a(x),"ArrayBuffer"))w.b=new B.C0(A.a3w(y.o.a(x),0,null))
else throw A.n(A.al("unexpected message type: "+J.az(x).j(0)))
v.E(0,w.bk())},
$S:43}
B.aoV.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cO(0,this.b)
this.b.a4S(d.code,d.reason)},
$S:21}
B.alr.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cQ(new B.alo(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b0E(new B.alp(d),new B.alq(w,d))
w.f.dL(0)},
$S:z+10}
B.alo.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.FK
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.C0
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Co){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a6(0)}}},
$S:z+11}
B.alp.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.bJf())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a1F(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a1F(new Uint8Array(A.dC(u)))
break $label1$1}t=A.aK("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Ga))throw r}},
$S:17}
B.alq.prototype={
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
if(!(A.O(q) instanceof B.Ga))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.als.prototype={
$1(d){var x,w=d instanceof A.Qe?d:new B.a7U(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.kW(w)
v=v.a
v===$&&A.d()
v.a6(0)},
$S:42};(function aliases(){var x=B.CL.prototype
x.aox=x.a6})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ss.prototype,"gatM","IV",0)
var v
w(v=B.Sr.prototype,"gaRx","acx",3)
x(v,"gaa1","DI",0)
x(v,"ga3V","Ja",0)
x(v,"ga3U","J9",0)
x(v,"ga3S","J7",0)
x(v,"ga3T","J8",0)
w(v=B.a_s.prototype,"gaMF","aMG",7)
x(v,"gaLO","V8",1)
x(B.NS.prototype,"gdM","k",0)
x(B.NV.prototype,"gaK5","aK6",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a1,[B.CL,B.an6,B.Fm,B.a_I,B.aMR,B.a_s,B.aIg,B.Ms,B.DY,B.aCT,B.NQ,B.aIs,B.a6P,B.Th,B.a6O,B.xd,B.rI,B.Gb,B.a7U,B.EC,B.zE,B.NR,B.NT])
w(B.Pg,A.f9)
x(A.jA,[B.aNr,B.b7p,B.b7m,B.b7n,B.b7j,B.b7k,B.b7l,B.b7g,B.b7h,B.b7o,B.b71,B.b7_,B.b72,B.b73,B.b74,B.b6Z,B.b78,B.b6Y,B.b6X,B.b6W,B.apY,B.aCW,B.aCX,B.aIj,B.aIy,B.aIA,B.awA,B.awz,B.alq])
x(A.ia,[B.aNs,B.an7,B.b7q,B.b7i,B.b70,B.b75,B.b76,B.b77,B.b79,B.b7a,B.b7b,B.b7c,B.b7d,B.b7e,B.aMS,B.aMT,B.aMU,B.apX,B.bEM,B.aD7,B.aD8,B.aD4,B.aD5,B.aD6,B.aCY,B.aIk,B.aIl,B.aIm,B.aIn,B.aIo,B.aIp,B.aIq,B.aIr,B.aIi,B.bEU,B.aIx,B.aIt,B.aIu,B.aIv,B.aIw,B.bc4,B.aoS,B.aoT,B.aoU,B.aoV,B.alr,B.alo,B.alp,B.als])
x(A.N,[B.oG,B.xR,B.NU])
x(A.T,[B.Ss,B.Sr,B.NV])
x(A.at,[B.Ra,B.a9u,B.w_])
x(A.qf,[B.b7f,B.aCV,B.aIz])
w(B.aIh,B.aIg)
w(B.mn,B.Ms)
w(B.a39,B.DY)
w(B.aCU,B.aCT)
w(B.a4F,B.NQ)
w(B.bIG,B.aIs)
w(B.NS,A.d3)
x(B.a6P,[B.a1G,B.aln])
x(B.rI,[B.FK,B.C0,B.Co])
w(B.Ga,B.Gb)
w(B.aip,B.CL)
x(A.GD,[B.vi,B.NP,B.vh,B.my,B.a4G])})()
A.o7(b.typeUniverse,JSON.parse('{"CL":{"dB":["1"]},"Pg":{"f9":["1","2"],"f9.S":"1","f9.T":"2"},"xR":{"N":[],"m":[]},"oG":{"N":[],"m":[]},"Ss":{"T":["oG"]},"Ra":{"at":[],"m":[]},"Sr":{"T":["xR"]},"a9u":{"at":[],"m":[]},"w_":{"at":[],"m":[]},"mn":{"Ms":[]},"a39":{"DY":[]},"a4F":{"NQ":[]},"NS":{"d3":["NT"],"aX":[]},"NU":{"N":[],"m":[]},"NV":{"T":["NU"]},"Th":{"dB":["1"]},"xd":{"bJe":[]},"FK":{"rI":[]},"C0":{"rI":[]},"Co":{"rI":[]},"Gb":{"bM":[]},"Ga":{"bM":[]},"aip":{"dB":["@"]},"a7U":{"bM":[]}}'))
A.bJH(b.typeUniverse,JSON.parse('{"CL":1,"a6P":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xd"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),v:x("dn<x,o>"),S:x("E<ai<o,L>>"),t:x("E<ai<o,@>>"),Q:x("E<DY>"),d:x("E<ih<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aB"),l:x("K<aB>"),F:x("K<ai<o,@>>"),j:x("K<@>"),I:x("K<x>"),P:x("ai<o,@>"),f:x("ai<@,@>"),E:x("Ms"),G:x("DY"),h:x("mn"),o:x("p3"),a:x("bp"),K:x("a1"),J:x("NQ"),g:x("zE"),Z:x("a6O<a1?>"),N:x("o"),e:x("pA"),M:x("e3"),D:x("rI"),U:x("Y<o>"),O:x("er<Fm>"),n:x("er<~>"),V:x("b3<xd>"),r:x("b3<@>"),R:x("b3<~>"),i:x("SC<aB>"),C:x("o1<aB>"),k:x("av<xd>"),c:x("av<@>"),W:x("av<~>"),q:x("k9"),y:x("L"),z:x("@"),A:x("aB?"),X:x("a1?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.Tl=new B.a_I(D.mH)
C.WE=new A.b5(5e6)
C.xo=new A.ap(32,0,32,0)
C.y7=new A.ah(57638,!1)
C.y8=new A.ah(57639,!1)
C.YF=new A.ah(58337,!1)
C.YG=new A.ah(58341,!1)
C.YN=new A.ah(58923,!1)
C.yd=new A.ah(59048,!1)
C.YO=new A.ah(59049,!1)
C.YP=new A.ah(59077,!1)
C.a5A=A.b(x([1,2,4,8,16]),A.au("E<x>"))
C.a9k=A.b(x([]),y.Q)
C.acF=new A.dn([1,"The user canceled the fetching of the video.",2,"A network error occurred while fetching the video, despite having previously been available.",3,"An error occurred while trying to decode the video, despite having previously been determined to be usable.",4,"The video has been found to be unsuitable (missing or in a format not supported by your browser)."],y.v)
C.acG=new A.dn([1,"MEDIA_ERR_ABORTED",2,"MEDIA_ERR_NETWORK",3,"MEDIA_ERR_DECODE",4,"MEDIA_ERR_SRC_NOT_SUPPORTED"],y.v)
C.Te=new A.F(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.r)
C.RF=new A.F(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.r)
C.S2=new A.F(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.r)
C.Su=new A.F(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.r)
C.RO=new A.F(1,0.4,0.7333333333333333,0.41568627450980394,D.r)
C.RP=new A.F(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Tg=new A.F(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.r)
C.Sm=new A.F(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.r)
C.Sy=new A.F(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.r)
C.Rw=new A.F(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.r)
C.ad8=new A.dn([50,C.Te,100,C.RF,200,C.S2,300,C.Su,400,C.RO,500,C.RP,600,C.Tg,700,C.Sm,800,C.Sy,900,C.Rw],A.au("dn<x,F>"))
C.adi=new A.yQ(C.ad8,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Fv=new A.fB("FlutterWebRTC.Method",D.b8,null)
C.agC=new B.my(0,"RTCIceConnectionStateNew")
C.agD=new B.my(1,"RTCIceConnectionStateChecking")
C.agE=new B.my(2,"RTCIceConnectionStateCompleted")
C.agF=new B.my(3,"RTCIceConnectionStateConnected")
C.agG=new B.my(4,"RTCIceConnectionStateCount")
C.JM=new B.my(5,"RTCIceConnectionStateFailed")
C.agH=new B.my(6,"RTCIceConnectionStateDisconnected")
C.JN=new B.my(7,"RTCIceConnectionStateClosed")
C.JO=new B.NP(0,"RTCIceGatheringStateNew")
C.agI=new B.NP(1,"RTCIceGatheringStateGathering")
C.agJ=new B.NP(2,"RTCIceGatheringStateComplete")
C.rv=new B.vh(0,"RTCPeerConnectionStateClosed")
C.JP=new B.vh(1,"RTCPeerConnectionStateFailed")
C.JQ=new B.vh(2,"RTCPeerConnectionStateDisconnected")
C.JR=new B.vh(3,"RTCPeerConnectionStateNew")
C.JS=new B.vh(4,"RTCPeerConnectionStateConnecting")
C.JT=new B.vh(5,"RTCPeerConnectionStateConnected")
C.agK=new B.vi(0,"RTCSignalingStateStable")
C.agL=new B.vi(1,"RTCSignalingStateHaveLocalOffer")
C.agM=new B.vi(2,"RTCSignalingStateHaveRemoteOffer")
C.agN=new B.vi(3,"RTCSignalingStateHaveLocalPrAnswer")
C.agO=new B.vi(4,"RTCSignalingStateHaveRemotePrAnswer")
C.JU=new B.vi(5,"RTCSignalingStateClosed")
C.agP=new B.NT(0,0,0)
C.JV=new B.a4G(0,"RTCVideoViewObjectFitContain")
C.JW=new B.a4G(1,"RTCVideoViewObjectFitCover")
C.nv=new A.cf(20,null,null,null)
C.akd=new A.cf(48,null,null,null)
C.Lm=new A.cf(null,64,null,null)
C.an1=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.LX=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tz=new A.y(!0,D.aq,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anQ=new A.y(!0,D.l,null,null,null,null,12,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anP=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aoD=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M1=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bS1=!1
$.bQs=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cjZ","bXl",()=>new B.aIh())
x($,"ci6","bL7",()=>D.c.q(A.aj(A.aj(A.aj(A.bKP(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_12",e:"endPart",h:b})})($__dart_deferred_initializers__,"SsjzY9rlRpXr5UFBI39sXCqdYeQ=");