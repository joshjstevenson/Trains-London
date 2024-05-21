/**
 * Using the follow js to convert the TFL stations.csv file into an Array of Objects.
 * Stations.csv contains the relevant information on London train stations to utilise the TFL APIs.
 * Sourced from TFL, link below:
 * https://api-portal.tfl.gov.uk/api-details#api=stationdata&operation=detailed
 */

// Copy and pasted .csv file.
const csvFile = `
UniqueId,Name,FareZones,HubNaptanCode,Wifi,OutsideStationUniqueId,BlueBadgeCarParking,BlueBadgeCarParkSpaces,TaxiRanksOutsideStation,MainBusInterchange,PierInterchange,NationalRailInterchange,AirportInterchange,EmiratesAirLineInterchange
HUBABW,Abbey Wood,4,HUBABW,FALSE,HUBABW-Outside,False,,False,,,,,
910GACTNCTL,Acton Central,3,,TRUE,910GACTNCTL-Outside,False,,False,,,,,
910GACTONML,Acton Main Line,3,,FALSE,910GACTONML-Outside,False,,False,,,,,
910GANERLEY,Anerley,4,,TRUE,910GANERLEY-Outside,False,,False,,,,,
910GBCKNHMH,Beckenham Hill,4,,FALSE,910GBCKNHMH-Outside,False,,False,,,,,
910GBELNGHM,Bellingham,3,,FALSE,910GBELNGHM-Outside,False,,False,,,,,
910GBHILLPK,Bush Hill Park,5,,TRUE,910GBHILLPK-Outside,TRUE,2,False,,,,,
910GBICKLEY,Bickley,5,,FALSE,910GBICKLEY-Outside,False,,False,,,,,
910GBNHAM,Burnham,Outside,,FALSE,910GBNHAM-Outside,False,,False,,,,,
910GBRBY,Brondesbury,2,,TRUE,910GBRBY-Outside,False,,False,,,,,
910GBRBYPK,Brondesbury Park,2,,FALSE,910GBRBYPK-Outside,False,,False,,,,,
910GBRENTX,Brent Cross West Station,3,,FALSE,910GBRENTX-Outside,False,,False,,,,,
910GBROCKLY,Brockley,2,,TRUE,910GBROCKLY-Outside,False,,False,,,,,
910GBROMLYS,Bromley South,5,,FALSE,910GBROMLYS-Outside,False,,False,,,,,
910GBRTWOOD,Brentwood,9,,TRUE,910GBRTWOOD-Outside,TRUE,17,False,,,,,
910GBRUCGRV,Bruce Grove,3,,TRUE,910GBRUCGRV-Outside,False,,False,,,,,
910GBTHNLGR,Bethnal Green,2,,TRUE,910GBTHNLGR-Outside,False,,False,,,,,
910GCAMHTH,Cambridge Heath,2,,FALSE,910GCAMHTH-Outside,False,,False,,,,,
910GCATFORD,Catford,3,,FALSE,910GCATFORD-Outside,False,,False,,,,,
910GCFPK,Crofton Park,3,,FALSE,910GCFPK-Outside,False,,False,,,,,
910GCHDWLHT,Chadwell Heath,5,,FALSE,910GCHDWLHT-Outside,False,,False,,,,,
910GCHESHNT,Cheshunt,8,,TRUE,910GCHESHNT-Outside,TRUE,5,False,,,Partial,,
910GCHINGFD,Chingford,5,,TRUE,910GCHINGFD-Outside,TRUE,3,False,,,,,
910GCLAPTON,Clapton,2|3,,TRUE,910GCLAPTON-Outside,False,,False,,,,,
910GCLDNNRB,Caledonian Road & Barnsbury,2,,FALSE,910GCLDNNRB-Outside,False,,False,,,,,
910GCLPHHS,Clapham High Street,2,,FALSE,910GCLPHHS-Outside,False,,False,,,,,
910GCMDNRD,Camden Road,2,,TRUE,910GCMDNRD-Outside,False,,False,,,,,
910GCNNB,Canonbury,2,,FALSE,910GCNNB-Outside,False,,False,,,,,
910GCOLSDNS,Coulsdon South,6,,TRUE,910GCOLSDNS-Outside,False,,False,,,,,
910GCRKLWD,Cricklewood,3,,TRUE,910GCRKLWD-Outside,False,,False,,,,,
910GCRLN,Charlton,3,,FALSE,910GCRLN-Outside,False,,False,,,,,
910GCROUCHH,Crouch Hill,3,,FALSE,910GCROUCHH-Outside,False,,False,,,,,
910GCRPNDPK,Carpenders Park,7,,TRUE,910GCRPNDPK-Outside,False,,False,,,,,
910GCRSHLTN,Carshalton,5,,TRUE,910GCRSHLTN-Outside,False,,False,,,,,
910GCTMSLNK,City Thameslink,1,,TRUE,910GCTMSLNK-Outside,False,,False,,,,,
910GDALS,Dalston Junction,2,,FALSE,910GDALS-Outside,False,,False,,,,,
910GDALSKLD,Dalston Kingsland,2,,FALSE,910GDALSKLD-Outside,False,,False,,,,,
910GDARTFD,Dartford,8,,FALSE,910GDARTFD-Outside,False,,False,,,,,
910GDENMRKH,Denmark Hill,2,,TRUE,910GDENMRKH-Outside,False,,False,,,Partial,,
910GDEPTFD,Deptford,2,,FALSE,910GDEPTFD-Outside,False,,False,,,,,
910GEDMNGRN,Edmonton Green,4,,TRUE,910GEDMNGRN-Outside,False,,False,,,,,
910GELTR,Elstree & Borehamwood,6,,TRUE,910GELTR-Outside,False,,False,,,,,
910GEMRSPKH,Emerson Park,6,,FALSE,910GEMRSPKH-Outside,False,,False,,,,,
910GENFLDTN,Enfield Town,5,,TRUE,910GENFLDTN-Outside,False,,False,,,,,
910GESTFLDS,Mitcham Eastfields,3,,FALSE,910GESTFLDS-Outside,False,,False,,,,,
910GFNCHLYR,Finchley Road & Frognal,2,,TRUE,910GFNCHLYR-Outside,False,,False,,,,,
910GFORESTH,Forest Hill,3,,FALSE,910GFORESTH-Outside,TRUE,1,False,,,Partial,,
910GFRSTGT,Forest Gate,3,,FALSE,910GFRSTGT-Outside,False,,False,,,,,
910GGIDEAPK,Gidea Park,6,,TRUE,910GGIDEAPK-Outside,False,,False,,,,,
910GGODMAYS,Goodmayes,4,,TRUE,910GGODMAYS-Outside,False,,False,,,,,
910GGOSPLOK,Gospel Oak,2,,TRUE,910GGOSPLOK-Outside,False,,False,,,,,
910GHACKNYC,Hackney Central,2,,TRUE,910GHACKNYC-Outside,False,,False,,,,,
910GHACKNYW,Hackney Wick,2,,FALSE,910GHACKNYW-Outside,False,,False,,,,,
910GHAGGERS,Haggerston,2,,FALSE,910GHAGGERS-Outside,False,,False,,,,,
910GHAKNYNM,Hackney Downs,2,,TRUE,910GHAKNYNM-Outside,False,,False,,,,,
910GHANWELL,Hanwell,4,,FALSE,910GHANWELL-Outside,False,,False,,,,,
910GHAYESAH,Hayes & Harlington,5,,FALSE,910GHAYESAH-Outside,False,,False,,,,,
910GHDON,Hendon,3|4,,TRUE,910GHDON-Outside,False,,False,,,,,
910GHEDSTNL,Headstone Lane,5,,TRUE,910GHEDSTNL-Outside,False,,False,,,,,
910GHERNEH,Herne Hill,2|3,,FALSE,910GHERNEH-Outside,False,,False,,,,,
910GHGHMSPK,Highams Park,4,,TRUE,910GHGHMSPK-Outside,TRUE,2,False,,,,,
910GHKBG,Hackbridge,4,,FALSE,910GHKBG-Outside,False,,False,,,,,
910GHMPSTDH,Hampstead Heath,2,,TRUE,910GHMPSTDH-Outside,False,,False,,,,,
910GHOMRTON,Homerton,2,,TRUE,910GHOMRTON-Outside,False,,False,,,,,
910GHONROPK,Honor Oak Park,3,,TRUE,910GHONROPK-Outside,False,,False,,,,,
910GHOXTON,Hoxton,1|2,,FALSE,910GHOXTON-Outside,False,,False,,,,,
910GHRGYGL,Harringay Green Lanes,3,,FALSE,910GHRGYGL-Outside,False,,False,,,,,
910GHRLDWOD,Harold Wood,6,,FALSE,910GHRLDWOD-Outside,TRUE,2,False,,,,,
910GHTCHEND,Hatch End,6,,FALSE,910GHTCHEND-Outside,TRUE,2,False,,,,,
910GHYDNSRD,Haydons Road,3,,FALSE,910GHYDNSRD-Outside,False,,False,,,,,
910GILFORD,Ilford,4,,FALSE,910GILFORD-Outside,False,,False,,,,,
910GIVER,Iver,Outside,,FALSE,910GIVER-Outside,False,,False,,,,,
910GKENR,Kensal Rise,2,,TRUE,910GKENR-Outside,False,,False,,,,,
910GKLBRNHR,Kilburn High Road,2,,TRUE,910GKLBRNHR-Outside,False,,False,,,,,
910GKNTSHTW,Kentish Town West,2,,FALSE,910GKNTSHTW-Outside,False,,False,,,,,
910GLANGLEY,Langley,Outside,,FALSE,910GLANGLEY-Outside,False,,False,,,,,
910GLBGHJN,Loughborough Junction,2,,TRUE,910GLBGHJN-Outside,False,,False,,,,,
910GLEYTNMR,Leyton Midland Road,3,,TRUE,910GLEYTNMR-Outside,False,,False,,,,,
910GLONFLDS,London Fields,2,,TRUE,910GLONFLDS-Outside,False,,False,,,,,
910GLYTNSHR,Leytonstone High Road,3,,FALSE,910GLYTNSHR-Outside,False,,False,,,,,
910GMANRPK,Manor Park,3|4,,TRUE,910GMANRPK-Outside,False,,False,,,,,
910GMAZEH,Maze Hill,3,,FALSE,910GMAZEH-Outside,False,,False,,,,,
910GMDNHEAD,Maidenhead,Outside,,TRUE,910GMDNHEAD-Outside,False,,False,,,,,
910GMLHB,Mill Hill Broadway,4,,TRUE,910GMLHB-Outside,False,,False,,,,,
910GMORDENS,Morden South,4,,FALSE,910GMORDENS-Outside,False,,False,,,,,
910GMRYLAND,Maryland,3,,TRUE,910GMRYLAND-Outside,False,,False,,,,,
910GNBARNET,New Barnet,5,,TRUE,910GNBARNET-Outside,False,,False,,,,,
910GNEWSGAT,New Southgate,4,,FALSE,910GNEWSGAT-Outside,False,,False,,,,,
910GNUNHEAD,Nunhead,2,,FALSE,910GNUNHEAD-Outside,False,,False,,,,,
910GOKLGHPK,Oakleigh Park,4,,TRUE,910GOKLGHPK-Outside,False,,False,,,,,
910GORPNGTN,Orpington,6,,FALSE,910GORPNGTN-Outside,False,,False,,,,,
910GPCKHMQD,Queens Road Peckham,2,,TRUE,910GPCKHMQD-Outside,False,,False,,,Partial,,
910GPCKHMRY,Peckham Rye,2,,FALSE,910GPCKHMRY-Outside,False,,False,,,,,
910GPENEW,Penge West,4,,TRUE,910GPENEW-Outside,TRUE,2,False,,,,,
910GPETSWD,Petts Wood,5,,FALSE,910GPETSWD-Outside,False,,False,,,,,
910GPLMS,Plumstead,4,,FALSE,910GPLMS-Outside,False,,False,,,,,
910GPURLEY,Purley,6,,TRUE,910GPURLEY-Outside,False,,False,,,,,
910GRBRN,Ravensbourne,4,,FALSE,910GRBRN-Outside,False,,False,,,,,
910GRCTRYRD,Rectory Road,2,,TRUE,910GRCTRYRD-Outside,False,,False,,,,,
910GRDNGSTN,Reading,Outside,,FALSE,910GRDNGSTN-Outside,False,,False,,,,,
910GROMFORD,Romford,6,,TRUE,910GROMFORD-Outside,False,,False,,,Partial,,
910GRTHERHI,Rotherhithe,2,,FALSE,910GRTHERHI-Outside,False,,False,,,,,
910GSACTON,South Acton,3,,TRUE,910GSACTON-Outside,False,,False,,,,,
910GSBURY,Southbury,5,,TRUE,910GSBURY-Outside,False,,False,,,,,
910GSCROYDN,South Croydon,5,,TRUE,910GSCROYDN-Outside,False,,False,,,,,
910GSHENFLD,Shenfield,Outside,,TRUE,910GSHENFLD-Outside,False,,False,,,Partial,,
910GSHLIER,St Helier (London),4,,FALSE,910GSHLIER-Outside,False,,False,,,,,
910GSHMPSTD,South Hampstead,2,,FALSE,910GSHMPSTD-Outside,False,,False,,,,,
910GSHRDHST,Shoreditch High Street,1,,FALSE,910GSHRDHST-Outside,False,,False,,,,,
910GSHRTLND,Shortlands,4,,FALSE,910GSHRTLND-Outside,False,,False,,,,,
910GSIVRST,Silver Street,4,,TRUE,910GSIVRST-Outside,False,,False,,,,,
910GSLADEGN,Slade Green,6,,FALSE,910GSLADEGN-Outside,False,,False,,,,,
910GSLOUGH,Slough,Outside,,TRUE,910GSLOUGH-Outside,False,,False,,,,,
910GSMERTON,South Merton,4,,FALSE,910GSMERTON-Outside,False,,False,,,,,
910GSTHALL,Southall,4,,FALSE,910GSTHALL-Outside,False,,False,,,,,
910GSTJMSST,St James Street,3,,TRUE,910GSTJMSST-Outside,False,,False,,,,,
910GSTKNWNG,Stoke Newington,2,,TRUE,910GSTKNWNG-Outside,False,,False,,,,,
910GSTMFDHL,Stamford Hill,3,,TRUE,910GSTMFDHL-Outside,False,,False,,,,,
910GSTMRYC,St Mary Cray,6,,FALSE,910GSTMRYC-Outside,False,,False,,,,,
910GSTOTNHM,South Tottenham,3,,FALSE,910GSTOTNHM-Outside,False,,False,,,,,
910GSTRETHM,Streatham,3,,TRUE,910GSTRETHM-Outside,False,,False,,,,,
910GSURREYQ,Surrey Quays,2,,FALSE,910GSURREYQ-Outside,False,,False,,,,,
910GSUTTON,Sutton,5,,TRUE,910GSUTTON-Outside,False,,False,,,,,
910GSUTTONC,Sutton Common,4,,FALSE,910GSUTTONC-Outside,False,,False,,,,,
910GSVNKNGS,Seven Kings,4,,TRUE,910GSVNKNGS-Outside,False,,False,,,,,
910GSWLY,Swanley,8,,FALSE,910GSWLY-Outside,False,,False,,,,,
910GTAPLOW,Taplow,Outside,,FALSE,910GTAPLOW-Outside,False,,False,,,,,
910GTHBLDSG,Theobalds Grove,7,,TRUE,910GTHBLDSG-Outside,False,,False,,,,,
910GTOOTING,Tooting,3,,TRUE,910GTOOTING-Outside,False,,False,,,,,
910GTULSEH,Tulse Hill,3,,TRUE,910GTULSEH-Outside,False,,False,,,,,
910GTURKYST,Turkey Street,6,,TRUE,910GTURKYST-Outside,False,,False,,,,,
910GTWYFORD,Twyford,Outside,,TRUE,910GTWYFORD-Outside,False,,False,,,,,
910GUPRHLWY,Upper Holloway,2,,FALSE,910GUPRHLWY-Outside,False,,False,,,,,
910GWAPPING,Wapping,2,,FALSE,910GWAPPING-Outside,False,,False,,,,,
910GWATFDHS,Watford High Street,8,,TRUE,910GWATFDHS-Outside,False,,False,,,,,
910GWCOMBEP,Westcombe Park,3,,FALSE,910GWCOMBEP-Outside,False,,False,,,,,
910GWDGRNPK,Woodgrange Park,3|4,,TRUE,910GWDGRNPK-Outside,False,,False,,,,,
910GWDRYTON,West Drayton,6,,FALSE,910GWDRYTON-Outside,False,,False,,,,,
910GWDST,Wood Street,4,,TRUE,910GWDST-Outside,False,,False,,,,,
910GWEALING,West Ealing,3,,FALSE,910GWEALING-Outside,False,,False,,,,,
910GWHHRTLA,White Hart Lane,3,,TRUE,910GWHHRTLA-Outside,False,,False,,,,,
910GWHMDSTD,West Hampstead,2,HUBWHD,TRUE,910GWHMDSTD-Outside,False,,False,,,,,
910GWHMPSTM,West Hampstead Thameslink,2,HUBWHD,TRUE,910GWHMPSTM-Outside,False,,False,,,,,
910GWIMLCHS,Wimbledon Chase,3,,FALSE,910GWIMLCHS-Outside,False,,False,,,,,
910GWLTHQRD,Walthamstow Queen's Road,3,,FALSE,910GWLTHQRD-Outside,False,,False,,,,,
910GWNDSWRD,Wandsworth Road,2,,FALSE,910GWNDSWRD-Outside,False,,False,,,,,
910GWNSTDPK,Wanstead Park,3,,FALSE,910GWNSTDPK-Outside,False,,False,,,,,
910GWSUTTON,West Sutton,5,,FALSE,910GWSUTTON-Outside,False,,False,,,,,
940GZZALGWP,IFS Cloud Greenwich Peninsula,Outside,HUBNGW,FALSE,940GZZALGWP-Outside,False,,False,,Full,,,
940GZZALRDK,IFS Cloud Royal Docks,Outside,HUBRVC,FALSE,940GZZALRDK-Outside,False,,False,,,,,
940GZZCRADD,Addiscombe,Trams fare zone,,FALSE,940GZZCRADD-Outside,False,,False,,,,,
940GZZCRADV,Addington Village,Trams fare zone,,FALSE,940GZZCRADV-Outside,False,,False,,,,,
940GZZCRAMP,Ampere Way,Trams fare zone,,FALSE,940GZZCRAMP-Outside,False,,False,,,,,
940GZZCRARA,Arena,Trams fare zone,,FALSE,940GZZCRARA-Outside,False,,False,,,,,
940GZZCRAVE,Avenue Road,Trams fare zone,,FALSE,940GZZCRAVE-Outside,False,,False,,,,,
940GZZCRBED,Beddington Lane,Trams fare zone,,FALSE,940GZZCRBED-Outside,False,,False,,,,,
940GZZCRBGV,Belgrave Walk,Trams fare zone,,FALSE,940GZZCRBGV-Outside,False,,False,,,,,
940GZZCRBLA,Blackhorse Lane,Trams fare zone,,FALSE,940GZZCRBLA-Outside,False,,False,,,,,
940GZZCRBRD,Beckenham Road,Trams fare zone,,FALSE,940GZZCRBRD-Outside,False,,False,,,,,
940GZZCRCEN,George Street,Trams fare zone,,FALSE,940GZZCRCEN-Outside,False,,False,,,,,
940GZZCRCHR,Church Street,Trams fare zone,,FALSE,940GZZCRCHR-Outside,False,,False,,,,,
940GZZCRCOO,Coombe Lane,Trams fare zone,,FALSE,940GZZCRCOO-Outside,False,,False,,,,,
940GZZCRCTR,Centrale,Trams fare zone,,FALSE,940GZZCRCTR-Outside,False,,False,,,,,
940GZZCRDDR,Dundonald Road,Trams fare zone,,FALSE,940GZZCRDDR-Outside,False,,False,,,,,
940GZZCRFLD,Fieldway,Trams fare zone,,FALSE,940GZZCRFLD-Outside,False,,False,,,,,
940GZZCRGRA,Gravel Hill,Trams fare zone,,FALSE,940GZZCRGRA-Outside,False,,False,,,,,
940GZZCRHAR,Harrington Road,Trams fare zone,,FALSE,940GZZCRHAR-Outside,False,,False,,,,,
940GZZCRKGH,King Henry's Drive,Trams fare zone,,FALSE,940GZZCRKGH-Outside,False,,False,,,,,
940GZZCRLEB,Lebanon Road,Trams fare zone,,FALSE,940GZZCRLEB-Outside,False,,False,,,,,
940GZZCRLOY,Lloyd Park,Trams fare zone,,FALSE,940GZZCRLOY-Outside,False,,False,,,,,
940GZZCRMCH,Mitcham,Trams fare zone,,FALSE,940GZZCRMCH-Outside,False,,False,,,,,
940GZZCRMDN,Morden Road,Trams fare zone,,FALSE,940GZZCRMDN-Outside,False,,False,,,,,
940GZZCRMTP,Merton Park,Trams fare zone,,FALSE,940GZZCRMTP-Outside,False,,False,,,,,
940GZZCRNWA,New Addington,Trams fare zone,,FALSE,940GZZCRNWA-Outside,False,,False,,,,,
940GZZCRPHI,Phipps Bridge,Trams fare zone,,FALSE,940GZZCRPHI-Outside,False,,False,,,,,
940GZZCRRVC,Reeves Corner,Trams fare zone,,FALSE,940GZZCRRVC-Outside,False,,False,,,,,
940GZZCRSAN,Sandilands,Trams fare zone,,FALSE,940GZZCRSAN-Outside,False,,False,,,,,
940GZZCRTPA,Therapia Lane,Trams fare zone,,FALSE,940GZZCRTPA-Outside,False,,False,,,,,
940GZZCRWAD,Waddon Marsh,Trams fare zone,,FALSE,940GZZCRWAD-Outside,False,,False,,,,,
940GZZCRWAN,Wandle Park,Trams fare zone,,FALSE,940GZZCRWAN-Outside,False,,False,,,,,
940GZZCRWEL,Wellesley Road,Trams fare zone,,FALSE,940GZZCRWEL-Outside,False,,False,,,,,
940GZZCRWOD,Woodside,Trams fare zone,,FALSE,940GZZCRWOD-Outside,False,,False,,,,,
940GZZDLABR,Abbey Road,2|3,,FALSE,940GZZDLABR-Outside,False,,False,Full,,,,
940GZZDLALL,All Saints,2,,FALSE,940GZZDLALL-Outside,False,,False,,,,,
940GZZDLBEC,Beckton,3,,FALSE,940GZZDLBEC-Outside,False,,False,,,,,
940GZZDLBLA,Blackwall,2,,FALSE,940GZZDLBLA-Outside,False,,False,,,,,
940GZZDLBOW,Bow Church,2,,FALSE,940GZZDLBOW-Outside,False,,False,,,,,
940GZZDLBPK,Beckton Park,3,,FALSE,940GZZDLBPK-Outside,False,,False,,,,,
940GZZDLCLA,Crossharbour,2,,FALSE,940GZZDLCLA-Outside,False,,False,,,,,
HUBCUS,Custom House for ExCel,3,HUBCUS,FALSE,HUBCUS-Outside,False,,False,,,,,
940GZZDLCYP,Cyprus,3,,FALSE,940GZZDLCYP-Outside,False,,False,,,,,
940GZZDLDEP,Deptford Bridge,2|3,,FALSE,940GZZDLDEP-Outside,False,,False,,,,,
940GZZDLDEV,Devons Road,2,,FALSE,940GZZDLDEV-Outside,False,,False,,,,,
940GZZDLEIN,East India,2|3,,FALSE,940GZZDLEIN-Outside,False,,False,,,,,
940GZZDLELV,Elverson Road,2|3,,FALSE,940GZZDLELV-Outside,False,,False,,,,,
940GZZDLGAL,Gallions Reach,3,,FALSE,940GZZDLGAL-Outside,False,,False,,,,,
940GZZDLHEQ,Heron Quays,2,,FALSE,940GZZDLHEQ-Outside,False,,False,,,,,
940GZZDLISL,Island Gardens,2,,FALSE,940GZZDLISL-Outside,False,,False,,,,,
940GZZDLKGV,King George V,3,,FALSE,940GZZDLKGV-Outside,False,,False,,,,,
940GZZDLLDP,Langdon Park,2,,FALSE,940GZZDLLDP-Outside,False,,False,,,,,
940GZZDLMUD,Mudchute,2,,FALSE,940GZZDLMUD-Outside,False,,False,,,,,
940GZZDLPDK,Pontoon Dock,3,,FALSE,940GZZDLPDK-Outside,False,,False,,,,,
940GZZDLPOP,Poplar,2,,FALSE,940GZZDLPOP-Outside,False,,False,,,,,
940GZZDLPRE,Prince Regent,3,,FALSE,940GZZDLPRE-Outside,False,,False,,,,,
940GZZDLPUD,Pudding Mill Lane,2|3,,FALSE,940GZZDLPUD-Outside,False,,False,,,,,
940GZZDLRAL,Royal Albert,3,,FALSE,940GZZDLRAL-Outside,False,,False,,,,,
940GZZDLRVC,Royal Victoria,3,HUBRVC,FALSE,940GZZDLRVC-Outside,False,,False,,,,,Full
940GZZDLSHS,Stratford High Street,2|3,,FALSE,940GZZDLSHS-Outside,False,,False,Full,,,,
940GZZDLSIT,Stratford International,2|3,,FALSE,940GZZDLSIT-Outside,False,,False,Full,,Partial,,
940GZZDLSOQ,South Quay,2,,FALSE,940GZZDLSOQ-Outside,False,,False,,,,,
940GZZDLSTL,Star Lane,2|3,,FALSE,940GZZDLSTL-Outside,False,,False,Full,,Partial,,
940GZZDLWFE,Westferry,2,,FALSE,940GZZDLWFE-Outside,False,,False,,Full,,,
940GZZDLWIQ,West India Quay,2,,FALSE,940GZZDLWIQ-Outside,False,,False,,,,,
940GZZDLWSV,West Silvertown,3,,FALSE,940GZZDLWSV-Outside,False,,False,,,,,
940GZZLUACT,Acton Town,3,,TRUE,940GZZLUACT-Outside,False,,False,,,,,
940GZZLUACY,Archway,2|3,,TRUE,940GZZLUACY-Outside,False,,False,,,,,
940GZZLUADE,Aldgate East,1,,TRUE,940GZZLUADE-Outside,False,,False,,,,,
940GZZLUAGL,Angel,1,,TRUE,940GZZLUAGL-Outside,False,,False,,,,,
940GZZLUALD,Aldgate,1,,TRUE,940GZZLUALD-Outside,False,,False,,,,,
940GZZLUALP,Alperton,4,,TRUE,940GZZLUALP-Outside,False,,False,,,,,
940GZZLUASG,Arnos Grove,4,,TRUE,940GZZLUASG-Outside,False,,False,,,,,
940GZZLUASL,Arsenal,2,,TRUE,940GZZLUASL-Outside,False,,False,,,,,
940GZZLUBBB,Bromley-by-Bow,2|3,,TRUE,940GZZLUBBB-Outside,False,,False,,,,,
940GZZLUBBN,Barbican,1,,TRUE,940GZZLUBBN-Outside,False,,False,,,,,
940GZZLUBDS,Bounds Green,3|4,,TRUE,940GZZLUBDS-Outside,False,,False,,,,,
940GZZLUBEC,Becontree,5,,TRUE,940GZZLUBEC-Outside,False,,False,,,,,
940GZZLUBKE,Barkingside,4,,TRUE,940GZZLUBKE-Outside,TRUE,2,False,,,,,
940GZZLUBKH,Buckhurst Hill,5,,TRUE,940GZZLUBKH-Outside,TRUE,,False,,,,,
940GZZLUBLG,Bethnal Green,2,,TRUE,940GZZLUBLG-Outside,False,,False,,,,,
940GZZLUBMY,Bermondsey,2,,TRUE,940GZZLUBMY-Outside,False,,False,,,,,
HUBBDS,Bond Street,1,HUBBDS,FALSE,HUBBDS-Outside,False,,False,,,,,
940GZZLUBOR,Borough,1,,TRUE,940GZZLUBOR-Outside,False,,False,,,,,
940GZZLUBOS,Boston Manor,4,,TRUE,940GZZLUBOS-Outside,False,,False,,,,,
940GZZLUBSC,Barons Court,2,,TRUE,940GZZLUBSC-Outside,False,,False,,,,,
940GZZLUBST,Baker Street,1,,TRUE,940GZZLUBST-Outside,False,,False,,,,,
940GZZLUBTK,Burnt Oak,4,,TRUE,940GZZLUBTK-Outside,False,,False,,,,,
940GZZLUBTX,Brent Cross,3,,TRUE,940GZZLUBTX-Outside,False,,False,,,,,
940GZZLUBWR,Bow Road,2,,FALSE,940GZZLUBWR-Outside,False,,False,,,,,
940GZZLUBWT,Bayswater,1,,TRUE,940GZZLUBWT-Outside,False,,False,,,,,
940GZZLUBZP,Belsize Park,2,,TRUE,940GZZLUBZP-Outside,False,,False,,,,,
940GZZLUCAR,Caledonian Road,2,,TRUE,940GZZLUCAR-Outside,False,,False,,,,,
940GZZLUCFM,Chalk Farm,2,,TRUE,940GZZLUCFM-Outside,False,,False,,,,,
940GZZLUCGN,Covent Garden,1,,TRUE,940GZZLUCGN-Outside,False,,False,,,,,
940GZZLUCHL,Chancery Lane,1,,TRUE,940GZZLUCHL-Outside,False,,False,,,,,
940GZZLUCKS,Cockfosters,5,,TRUE,940GZZLUCKS-Outside,False,,False,,,,,
940GZZLUCND,Colindale,4,,TRUE,940GZZLUCND-Outside,False,,False,,,,,
940GZZLUCPC,Clapham Common,2,,TRUE,940GZZLUCPC-Outside,False,,False,,,,,
940GZZLUCPK,Canons Park,5,,TRUE,940GZZLUCPK-Outside,False,,False,,,,,
940GZZLUCPN,Clapham North,2,,TRUE,940GZZLUCPN-Outside,False,,False,,,,,
940GZZLUCPS,Clapham South,2|3,,TRUE,940GZZLUCPS-Outside,False,,False,,,,,
940GZZLUCSD,Colliers Wood,3,,TRUE,940GZZLUCSD-Outside,False,,False,,,,,
940GZZLUCSM,Chesham,9,,TRUE,940GZZLUCSM-Outside,TRUE,4,False,,,,,
940GZZLUCTN,Camden Town,2,,TRUE,940GZZLUCTN-Outside,False,,False,,,,,
940GZZLUCWL,Chigwell,4,,TRUE,940GZZLUCWL-Outside,False,,False,,,,,
940GZZLUCWP,Chiswick Park,3,,TRUE,940GZZLUCWP-Outside,False,,False,,,,,
940GZZLUCXY,Croxley,7,,TRUE,940GZZLUCXY-Outside,False,,False,,,,,
940GZZLUDBN,Debden,6,,TRUE,940GZZLUDBN-Outside,TRUE,3,TRUE,,,,,
940GZZLUDGE,Dagenham East,5,,TRUE,940GZZLUDGE-Outside,False,,False,,,,,
940GZZLUDGY,Dagenham Heathway,5,,TRUE,940GZZLUDGY-Outside,False,,False,,,,,
940GZZLUDOH,Dollis Hill,3,,FALSE,940GZZLUDOH-Outside,False,,False,,,,,
940GZZLUEAE,Eastcote,5,,FALSE,940GZZLUEAE-Outside,False,,False,,,,,
940GZZLUEAN,East Acton,2,,TRUE,940GZZLUEAN-Outside,False,,False,,,,,
940GZZLUECM,Ealing Common,3,,TRUE,940GZZLUECM-Outside,False,,False,,,,,
940GZZLUECT,Earl's Court,1|2,,TRUE,940GZZLUECT-Outside,False,,False,,,,,
940GZZLUEFY,East Finchley,3,,TRUE,940GZZLUEFY-Outside,False,,False,,,,,
940GZZLUEGW,Edgware,5,,TRUE,940GZZLUEGW-Outside,False,,TRUE,,,,,
940GZZLUEHM,East Ham,3|4,,TRUE,940GZZLUEHM-Outside,False,,False,,,,,
940GZZLUEMB,Embankment,1,,TRUE,940GZZLUEMB-Outside,False,,False,,,,,
940GZZLUEPG,Epping,6,,TRUE,940GZZLUEPG-Outside,TRUE,6,False,,,,,
940GZZLUEPK,Elm Park,6,,TRUE,940GZZLUEPK-Outside,False,,TRUE,,,,,
940GZZLUEPY,East Putney,2|3,,TRUE,940GZZLUEPY-Outside,False,,False,,,,,
940GZZLUERB,Edgware Road,1,,TRUE,940GZZLUERB-Outside,False,,False,,,,,
940GZZLUERC,Edgware Road,1,,TRUE,940GZZLUERC-Outside,False,,False,,,,,
940GZZLUESQ,Euston Square,1,,TRUE,940GZZLUESQ-Outside,False,,False,,,,,
940GZZLUFBY,Fulham Broadway,2,,TRUE,940GZZLUFBY-Outside,False,,False,,,,,
940GZZLUFLP,Fairlop,4,,TRUE,940GZZLUFLP-Outside,False,,False,,,,,
940GZZLUFYC,Finchley Central,4,,TRUE,940GZZLUFYC-Outside,TRUE,6,False,,,,,
940GZZLUFYR,Finchley Road,2,,FALSE,940GZZLUFYR-Outside,False,,False,,,,,
940GZZLUGDG,Goodge Street,1,,TRUE,940GZZLUGDG-Outside,False,,False,,,,,
940GZZLUGGH,Grange Hill,4,,TRUE,940GZZLUGGH-Outside,False,,False,,,,,
940GZZLUGGN,Golders Green,3,,TRUE,940GZZLUGGN-Outside,False,,False,,,,,
940GZZLUGHK,Goldhawk Road,2,,TRUE,940GZZLUGHK-Outside,False,,False,,,,,
940GZZLUGPK,Green Park,1,,TRUE,940GZZLUGPK-Outside,False,,False,,,,,
940GZZLUGPS,Great Portland Street,1,,TRUE,940GZZLUGPS-Outside,False,,False,,,,,
940GZZLUGTH,Gants Hill,4,,TRUE,940GZZLUGTH-Outside,False,,False,,,,,
940GZZLUGTR,Gloucester Road,1,,TRUE,940GZZLUGTR-Outside,False,,False,,,,,
940GZZLUHBN,Holborn,1,,TRUE,940GZZLUHBN-Outside,False,,False,,,,,
940GZZLUHBT,High Barnet,5,,TRUE,940GZZLUHBT-Outside,TRUE,5,False,,,,,
940GZZLUHCH,Hornchurch,6,,TRUE,940GZZLUHCH-Outside,False,,False,,,,,
940GZZLUHCL,Hendon Central,3|4,,TRUE,940GZZLUHCL-Outside,False,,False,,,,,
940GZZLUHGD,Hillingdon,6,,TRUE,940GZZLUHGD-Outside,TRUE,6,False,,,,,
940GZZLUHGR,Hanger Lane,3,,FALSE,940GZZLUHGR-Outside,False,,False,,,,,
940GZZLUHGT,Highgate,3,,TRUE,940GZZLUHGT-Outside,False,,False,,,,,
940GZZLUHLT,Hainault,4,,TRUE,940GZZLUHLT-Outside,TRUE,4,False,,,,,
940GZZLUHNX,Hatton Cross,5|6,,TRUE,940GZZLUHNX-Outside,False,,False,,,,,
940GZZLUHPC,Hyde Park Corner,1,,TRUE,940GZZLUHPC-Outside,False,,False,,,,,
940GZZLUHPK,Holland Park,2,,TRUE,940GZZLUHPK-Outside,False,,False,,,,,
940GZZLUHSK,High Street Kensington,1,,TRUE,940GZZLUHSK-Outside,False,,False,,,,,
940GZZLUHTD,Hampstead,2|3,,TRUE,940GZZLUHTD-Outside,False,,False,,,,,
940GZZLUHWC,Hounslow Central,4,,TRUE,940GZZLUHWC-Outside,False,,False,,,,,
940GZZLUHWE,Hounslow East,4,,TRUE,940GZZLUHWE-Outside,TRUE,2,False,,,,,
940GZZLUHWT,Hounslow West,5,,TRUE,940GZZLUHWT-Outside,TRUE,10,False,,,,,
940GZZLUHWY,Holloway Road,2,,TRUE,940GZZLUHWY-Outside,False,,False,,,,,
940GZZLUICK,Ickenham,6,,TRUE,940GZZLUICK-Outside,False,,False,,,,,
940GZZLUKBN,Kilburn,2,,TRUE,940GZZLUKBN-Outside,False,,False,,,,,
940GZZLUKBY,Kingsbury,4,,TRUE,940GZZLUKBY-Outside,False,,False,,,,,
940GZZLUKNB,Knightsbridge,1,,TRUE,940GZZLUKNB-Outside,False,,False,,,,,
940GZZLUKNG,Kennington,1|2,,TRUE,940GZZLUKNG-Outside,False,,False,,,,,
940GZZLUKPK,Kilburn Park,2,,TRUE,940GZZLUKPK-Outside,False,,False,,,,,
940GZZLULAD,Ladbroke Grove,2,,TRUE,940GZZLULAD-Outside,False,,False,,,,,
940GZZLULBN,Lambeth North,1,,TRUE,940GZZLULBN-Outside,False,,False,,,,,
940GZZLULGN,Loughton,6,,TRUE,940GZZLULGN-Outside,False,,False,,,,,
940GZZLULGT,Lancaster Gate,1,,TRUE,940GZZLULGT-Outside,False,,False,,,,,
940GZZLULRD,Latimer Road,2,,TRUE,940GZZLULRD-Outside,False,,False,,,,,
940GZZLULSQ,Leicester Square,1,,TRUE,940GZZLULSQ-Outside,False,,False,,,,,
940GZZLULYN,Leyton,3,,TRUE,940GZZLULYN-Outside,False,,False,,,,,
940GZZLULYS,Leytonstone,3|4,,TRUE,940GZZLULYS-Outside,False,,False,,,,,
940GZZLUMBA,Marble Arch,1,,TRUE,940GZZLUMBA-Outside,False,,False,,,,,
940GZZLUMDN,Morden,4,,TRUE,940GZZLUMDN-Outside,False,,False,,,,,
940GZZLUMED,Mile End,2,,TRUE,940GZZLUMED-Outside,False,,False,,,,,
940GZZLUMHL,Mill Hill East,4,,TRUE,940GZZLUMHL-Outside,False,,False,,,,,
940GZZLUMMT,Monument,1,,TRUE,940GZZLUMMT-Outside,False,,False,,,,,
940GZZLUMPK,Moor Park,6|7,,TRUE,940GZZLUMPK-Outside,False,,False,,,,,
940GZZLUMRH,Manor House,2|3,,TRUE,940GZZLUMRH-Outside,False,,False,,,,,
940GZZLUMSH,Mansion House,1,,TRUE,940GZZLUMSH-Outside,False,,False,,,,,
940GZZLUMTC,Mornington Crescent,2,,TRUE,940GZZLUMTC-Outside,False,,False,,,,,
940GZZLUMVL,Maida Vale,2,,TRUE,940GZZLUMVL-Outside,False,,False,,,,,
940GZZLUNAN,North Acton,2|3,,TRUE,940GZZLUNAN-Outside,False,,False,,,,,
940GZZLUNBP,Newbury Park,4,,TRUE,940GZZLUNBP-Outside,TRUE,6,TRUE,,,,,
940GZZLUNDN,Neasden,3,,TRUE,940GZZLUNDN-Outside,False,,False,,,,,
940GZZLUNEN,North Ealing,3,,TRUE,940GZZLUNEN-Outside,False,,False,,,,,
940GZZLUNFD,Northfields,3,,TRUE,940GZZLUNFD-Outside,False,,False,,,,,
940GZZLUNGW,North Greenwich,2|3,HUBNGW,TRUE,940GZZLUNGW-Outside,TRUE,19,TRUE,Full,Full,,,Full
940GZZLUNHA,North Harrow,5,,TRUE,940GZZLUNHA-Outside,False,,False,,,,,
940GZZLUNHG,Notting Hill Gate,1|2,,TRUE,940GZZLUNHG-Outside,False,,False,,,,,
940GZZLUNHT,Northolt,5,,TRUE,940GZZLUNHT-Outside,False,,False,,,,,
940GZZLUNKP,Northwick Park,4,,TRUE,940GZZLUNKP-Outside,False,,False,,,,,
940GZZLUNOW,Northwood,6,,TRUE,940GZZLUNOW-Outside,False,,False,,,,,
940GZZLUNWH,Northwood Hills,6,,TRUE,940GZZLUNWH-Outside,False,,False,,,,,
940GZZLUOAK,Oakwood,5,,TRUE,940GZZLUOAK-Outside,TRUE,6,False,,,,,
940GZZLUOSY,Osterley,4,,TRUE,940GZZLUOSY-Outside,False,,False,,,,,
940GZZLUOVL,Oval,2,,TRUE,940GZZLUOVL-Outside,False,,False,,,,,
940GZZLUOXC,Oxford Circus,1,,TRUE,940GZZLUOXC-Outside,False,,False,,,,,
940GZZLUPCC,Piccadilly Circus,1,,TRUE,940GZZLUPCC-Outside,False,,False,,,,,
940GZZLUPCO,Pimlico,1,,TRUE,940GZZLUPCO-Outside,False,,False,,,,,
940GZZLUPKR,Park Royal,3,,TRUE,940GZZLUPKR-Outside,False,,False,,,,,
940GZZLUPLW,Plaistow,3,,TRUE,940GZZLUPLW-Outside,False,,False,,,,,
940GZZLUPNR,Pinner,5,,TRUE,940GZZLUPNR-Outside,False,,False,,,,,
940GZZLUPRD,Preston Road,4,,TRUE,940GZZLUPRD-Outside,False,,False,,,,,
940GZZLUPSG,Parsons Green,2,,TRUE,940GZZLUPSG-Outside,False,,False,,,,,
940GZZLUPVL,Perivale,4,,TRUE,940GZZLUPVL-Outside,False,,False,,,,,
940GZZLUPYB,Putney Bridge,2,,FALSE,940GZZLUPYB-Outside,False,,False,,,,,
940GZZLUQBY,Queensbury,4,,TRUE,940GZZLUQBY-Outside,False,,False,,,,,
940GZZLUQWY,Queensway,1,,TRUE,940GZZLUQWY-Outside,False,,False,,,,,
940GZZLURBG,Redbridge,4,,TRUE,940GZZLURBG-Outside,False,,False,,,,,
940GZZLURGP,Regent's Park,1,,TRUE,940GZZLURGP-Outside,False,,False,,,,,
940GZZLURSG,Ruislip Gardens,5,,FALSE,940GZZLURSG-Outside,False,,False,,,,,
940GZZLURSM,Ruislip Manor,6,,TRUE,940GZZLURSM-Outside,False,,False,,,,,
940GZZLURSP,Ruislip,6,,TRUE,940GZZLURSP-Outside,TRUE,4,False,,,,,
940GZZLURSQ,Russell Square,1,,TRUE,940GZZLURSQ-Outside,False,,False,,,,,
940GZZLURVP,Ravenscourt Park,2,,TRUE,940GZZLURVP-Outside,False,,False,,,,,
940GZZLURVY,Roding Valley,4,,TRUE,940GZZLURVY-Outside,False,,False,,,,,
940GZZLURYL,Rayners Lane,5,,TRUE,940GZZLURYL-Outside,TRUE,6,False,,,,,
940GZZLURYO,Royal Oak,2,,TRUE,940GZZLURYO-Outside,False,,False,,,,,
940GZZLUSBM,Shepherd's Bush Market,2,,TRUE,940GZZLUSBM-Outside,False,,False,,,,,
940GZZLUSEA,South Ealing,3,,TRUE,940GZZLUSEA-Outside,False,,False,,,,,
940GZZLUSFB,Stamford Brook,2,,TRUE,940GZZLUSFB-Outside,False,,False,,,,,
940GZZLUSFS,Southfields,3,,TRUE,940GZZLUSFS-Outside,False,,TRUE,,,,,
940GZZLUSGN,Stepney Green,2,,TRUE,940GZZLUSGN-Outside,False,,False,,,,,
940GZZLUSGT,Southgate,4,,TRUE,940GZZLUSGT-Outside,False,,False,,,,,
940GZZLUSHH,South Harrow,5,,TRUE,940GZZLUSHH-Outside,False,,False,,,,,
940GZZLUSJP,St James's Park,1,,TRUE,940GZZLUSJP-Outside,False,,False,,,,,
940GZZLUSJW,St John's Wood,2,,TRUE,940GZZLUSJW-Outside,False,,False,,,,,
940GZZLUSKS,South Kensington,1,,TRUE,940GZZLUSKS-Outside,False,,False,,,,,
940GZZLUSKW,Stockwell,2,,TRUE,940GZZLUSKW-Outside,False,,False,,,,,
940GZZLUSNB,Snaresbrook,4,,TRUE,940GZZLUSNB-Outside,False,,False,,,,,
940GZZLUSPU,St Paul's,1,,TRUE,940GZZLUSPU-Outside,False,,False,,,,,
940GZZLUSSQ,Sloane Square,1,,TRUE,940GZZLUSSQ-Outside,False,,False,,,,,
940GZZLUSTM,Stanmore,5,,TRUE,940GZZLUSTM-Outside,TRUE,6,False,,,,,
940GZZLUSUH,Sudbury Hill,4,,TRUE,940GZZLUSUH-Outside,False,,False,,,,,
940GZZLUSUT,Sudbury Town,4,,TRUE,940GZZLUSUT-Outside,TRUE,3,False,,,,,
940GZZLUSWC,Swiss Cottage,2,,TRUE,940GZZLUSWC-Outside,False,,False,,,,,
940GZZLUSWF,South Woodford,4,,TRUE,940GZZLUSWF-Outside,TRUE,4,TRUE,,,,,
940GZZLUSWK,Southwark,1,,TRUE,940GZZLUSWK-Outside,False,,False,,,,,
940GZZLUSWN,South Wimbledon,3|4,,TRUE,940GZZLUSWN-Outside,False,,False,,,,,
940GZZLUTAW,Totteridge & Whetstone,4,,TRUE,940GZZLUTAW-Outside,False,,False,,,,,
940GZZLUTBC,Tooting Bec,3,,TRUE,940GZZLUTBC-Outside,False,,False,,,,,
940GZZLUTBY,Tooting Broadway,3,,TRUE,940GZZLUTBY-Outside,False,,False,,,,,
940GZZLUTFP,Tufnell Park,2,,TRUE,940GZZLUTFP-Outside,False,,False,,,,,
940GZZLUTHB,Theydon Bois,6,,TRUE,940GZZLUTHB-Outside,TRUE,3,False,,,,,
940GZZLUTMP,Temple,1,,TRUE,940GZZLUTMP-Outside,False,,False,,,,,
940GZZLUTNG,Turnham Green,2|3,,TRUE,940GZZLUTNG-Outside,False,,False,,,,,
940GZZLUTPN,Turnpike Lane,3,,TRUE,940GZZLUTPN-Outside,False,,False,,,,,
940GZZLUTWH,Tower Hill,1,,TRUE,940GZZLUTWH-Outside,False,,False,,Full,,,
940GZZLUUPB,Upminster Bridge,6,,TRUE,940GZZLUUPB-Outside,False,,False,,,,,
940GZZLUUPK,Upton Park,3,,TRUE,940GZZLUUPK-Outside,False,,False,,,,,
940GZZLUUPY,Upney,4,,TRUE,940GZZLUUPY-Outside,False,,False,,,,,
940GZZLUUXB,Uxbridge,6,,TRUE,940GZZLUUXB-Outside,False,,False,,,,,
940GZZLUWAF,Watford,7,,FALSE,940GZZLUWAF-Outside,False,,False,,,,,
940GZZLUWCY,White City,2,,TRUE,940GZZLUWCY-Outside,False,,False,,,,,
940GZZLUWFN,West Finchley,4,,TRUE,940GZZLUWFN-Outside,False,,False,,,,,
940GZZLUWHP,West Hampstead,2,HUBWHD,TRUE,940GZZLUWHP-Outside,False,,False,,,,,
940GZZLUWHW,West Harrow,5,,TRUE,940GZZLUWHW-Outside,False,,False,,,,,
940GZZLUWIG,Willesden Green,2|3,,TRUE,940GZZLUWIG-Outside,False,,False,,,,,
940GZZLUWIP,Wimbledon Park,3,,TRUE,940GZZLUWIP-Outside,False,,False,,,,,
940GZZLUWKA,Warwick Avenue,2,,TRUE,940GZZLUWKA-Outside,False,,False,,,,,
940GZZLUWKN,West Kensington,2,,TRUE,940GZZLUWKN-Outside,False,,False,,,,,
940GZZLUWLA,Wood Lane,2,,TRUE,940GZZLUWLA-Outside,False,,False,,,,,
940GZZLUWOF,Woodford,4,,TRUE,940GZZLUWOF-Outside,TRUE,10,False,,,,,
940GZZLUWOG,Wood Green,3,,TRUE,940GZZLUWOG-Outside,False,,False,,,,,
940GZZLUWOP,Woodside Park,4,,TRUE,940GZZLUWOP-Outside,TRUE,5,False,,,,,
940GZZLUWRR,Warren Street,1,,TRUE,940GZZLUWRR-Outside,False,,False,,,,,
940GZZLUWSD,Wanstead,4,,TRUE,940GZZLUWSD-Outside,False,,False,,,,,
940GZZLUWSP,Westbourne Park,2,,TRUE,940GZZLUWSP-Outside,False,,False,,,,,
940GZZLUWTA,West Acton,3,,TRUE,940GZZLUWTA-Outside,False,,False,,,,,
940GZZLUWYP,Wembley Park,4,,TRUE,940GZZLUWYP-Outside,TRUE,6,False,,,,,
HUBAMR,Amersham,9,HUBAMR,TRUE,HUBAMR-Outside,TRUE,,False,,,Partial,,
HUBBAL,Balham,3,HUBBAL,TRUE,HUBBAL-Outside,False,,False,,,,,
HUBBAN,Bank,1,HUBBAN,TRUE,HUBBAN-Outside,False,,False,,,Partial,,
HUBBEK,Beckenham Junction,4|Trams fare zone,HUBBEK,FALSE,HUBBEK-Outside,TRUE,88,False,,,Partial,,
HUBBFR,Blackfriars,1,HUBBFR,TRUE,HUBBFR-Outside,False,,TRUE,,Partial,,,
HUBBHO,Blackhorse Road,3,HUBBHO,TRUE,HUBBHO-Outside,False,,False,,,,,
HUBBIR,Birkbeck,4|Trams fare zone,HUBBIR,FALSE,HUBBIR-Outside,False,,False,,,Partial,,
HUBBKG,Barking,4,HUBBKG,TRUE,HUBBKG-Outside,False,,TRUE,Full,,Partial,,
HUBBRX,Brixton,2,HUBBRX,TRUE,HUBBRX-Outside,False,,False,Full,,,,
HUBBSH,Bushey,8,HUBBSH,FALSE,HUBBSH-Outside,False,,False,,,,,
HUBCAN,Canning Town,2|3,HUBCAN,TRUE,HUBCAN-Outside,False,,False,Full,,,,
HUBCAW,Canary Wharf,2,HUBCAW,TRUE,HUBCAW-Outside,False,,False,,Full,,,
HUBCFO,Chalfont & Latimer,8,HUBCFO,TRUE,HUBCFO-Outside,TRUE,5,False,,,Partial,,
HUBCHX,Charing Cross,1,HUBCHX,TRUE,HUBCHX-Outside,False,,False,,,,,
HUBCLJ,Clapham Junction,2,HUBCLJ,FALSE,HUBCLJ-Outside,False,,False,,,Partial,,
HUBCLW,Chorleywood,7,HUBCLW,TRUE,HUBCLW-Outside,TRUE,6,False,,,Partial,,
HUBCST,Cannon Street,1,HUBCST,TRUE,HUBCST-Outside,False,,False,,,,,
HUBCUT,Cutty Sark for Maritime Greenwich,2|3,HUBCUT,FALSE,HUBCUT-Outside,False,,TRUE,,Full,,,
HUBCYP,Crystal Palace,3|4,HUBCYP,FALSE,HUBCYP-Outside,TRUE,2,False,,,Partial,,
HUBEAL,Ealing Broadway,3,HUBEAL,TRUE,HUBEAL-Outside,False,,False,,,Partial,,
HUBECY,East Croydon,5|Trams fare zone,HUBECY,FALSE,HUBECY-Outside,False,,False,,,Partial,,
HUBELM,Elmers End,4|Trams fare zone,HUBELM,FALSE,HUBELM-Outside,TRUE,108,False,,,Partial,,
HUBEPH,Elephant & Castle,1|2,HUBEPH,TRUE,HUBEPH-Outside,False,,False,,,,,
HUBEUS,Euston,1,HUBEUS,TRUE,HUBEUS-Outside,False,,TRUE,,,Partial,,
HUBFPK,Finsbury Park,2,HUBFPK,TRUE,HUBFPK-Outside,False,,TRUE,,,Partial,,
HUBGFD,Greenford,4,HUBGFD,TRUE,HUBGFD-Outside,False,,False,,,Partial,,
HUBGNW,Greenwich,2|3,HUBGNW,FALSE,HUBGNW-Outside,TRUE,1,False,,,Partial,,
HUBGUN,Gunnersbury,3,HUBGUN,FALSE,HUBGUN-Outside,False,,False,,,,,
HUBH13,Heathrow Terminals 2 & 3,6,HUBH13,TRUE,HUBH13-Outside,False,,TRUE,Full,,,Full,
HUBHDN,Harlesden,3,HUBHDN,TRUE,HUBHDN-Outside,False,,False,,,,,
HUBHHY,Highbury & Islington,2,HUBHHY,TRUE,HUBHHY-Outside,False,,False,,,Partial,,
HUBHMS,Hammersmith,2,HUBHMS,TRUE,HUBHMS-Outside,False,,False,Full,,,,
HUBHOH,Harrow-on-the-Hill,5,HUBHOH,TRUE,HUBHOH-Outside,False,,False,,,Partial,,
HUBHRW,Harrow & Wealdstone,5,HUBHRW,TRUE,HUBHRW-Outside,TRUE,5,False,,,Partial,,
HUBHX4,Heathrow Terminal 4,6,HUBHX4,TRUE,HUBHX4-Outside,False,,TRUE,,,,Full,
HUBHX5,Heathrow Terminal 5,6,HUBHX5,FALSE,HUBHX5-Outside,False,,TRUE,,,,Full,
HUBIMP,Imperial Wharf,2,HUBIMP,FALSE,HUBIMP-Outside,False,,False,,,,,
HUBKGX,King's Cross St Pancras,1,HUBKGX,TRUE,HUBKGX-Outside,False,,TRUE,,,Partial,,
HUBKNL,Kensal Green,2,HUBKNL,FALSE,HUBKNL-Outside,False,,False,,,,,
HUBKNT,Kenton,4,HUBKNT,TRUE,HUBKNT-Outside,False,,False,,,,,
HUBKPA,Kensington (Olympia),2,HUBKPA,TRUE,HUBKPA-Outside,False,,False,,,Partial,,
HUBKTN,Kentish Town,2,HUBKTN,TRUE,HUBKTN-Outside,False,,False,,,,,
HUBKWG,Kew Gardens,3|4,HUBKWG,TRUE,HUBKWG-Outside,False,,False,,,,,
HUBLBG,London Bridge,1,HUBLBG,TRUE,HUBLBG-Outside,False,,TRUE,Full,,Partial,,
HUBLCY,London City Airport,3,HUBLCY,FALSE,HUBLCY-Outside,False,,False,,,,Full,
HUBLEW,Lewisham,2|3,HUBLEW,FALSE,HUBLEW-Outside,False,,False,Full,,Partial,,
HUBLHS,Limehouse,2,HUBLHS,FALSE,HUBLHS-Outside,False,,False,,,Partial,,
HUBLST,Liverpool Street,1,HUBLST,TRUE,HUBLST-Outside,False,,TRUE,Full,,Partial,,
HUBMJT,Mitcham Junction,4|Trams fare zone,HUBMJT,FALSE,HUBMJT-Outside,TRUE,18,False,,,Partial,,
HUBMYB,Marylebone,1,HUBMYB,TRUE,HUBMYB-Outside,False,,False,,,,,
HUBNWB,North Wembley,4,HUBNWB,FALSE,HUBNWB-Outside,False,,False,,,,,
HUBNWD,Norwood Junction,4,HUBNWD,FALSE,HUBNWD-Outside,TRUE,3,False,,,Partial,,
HUBNWX,New Cross,2,HUBNWX,FALSE,HUBNWX-Outside,False,,False,,,Partial,,
HUBNXG,New Cross Gate,2,HUBNXG,FALSE,HUBNXG-Outside,False,,False,,,Partial,,
HUBOLD,Old Street,1,HUBOLD,TRUE,HUBOLD-Outside,False,,False,,,,,
HUBPAD,Paddington,1,HUBPAD,TRUE,HUBPAD-Outside,False,,TRUE,,,,,
HUBQPW,Queen's Park,2,HUBQPW,TRUE,HUBQPW-Outside,False,,False,,,,,
HUBRIC,Rickmansworth,7,HUBRIC,TRUE,HUBRIC-Outside,TRUE,12,False,,,Partial,,
HUBRMD,Richmond,4,HUBRMD,TRUE,HUBRMD-Outside,TRUE,1,TRUE,Full,,Partial,,
HUBSBP,Stonebridge Park,3,HUBSBP,TRUE,HUBSBP-Outside,False,,False,,,,,
HUBSDE,Shadwell,2,HUBSDE,TRUE,HUBSDE-Outside,False,,False,,,,,
HUBSOK,South Kenton,4,HUBSOK,TRUE,HUBSOK-Outside,False,,False,,,,,
HUBSPB,Shepherd's Bush,2,HUBSPB,TRUE,HUBSPB-Outside,False,,False,,,Partial,,
HUBSRA,Stratford,2|3,HUBSRA,TRUE,HUBSRA-Outside,False,,TRUE,Full,,Partial,,
HUBSRU,South Ruislip,5,HUBSRU,TRUE,HUBSRU-Outside,False,,False,,,,,
HUBSVS,Seven Sisters,3,HUBSVS,TRUE,HUBSVS-Outside,False,,False,,,,,
HUBSYD,Sydenham,3,HUBSYD,FALSE,HUBSYD-Outside,False,,False,,,Partial,,
HUBTCR,Tottenham Court Road,1,HUBTCR,FALSE,HUBTCR-Outside,False,,False,,,,,
HUBTOG,Tower Gateway,1,HUBTOG,FALSE,HUBTOG-Outside,False,,False,,,,,
HUBTOM,Tottenham Hale,3,HUBTOM,TRUE,HUBTOM-Outside,False,,TRUE,,,Partial,,
HUBUPM,Upminster,6,HUBUPM,TRUE,HUBUPM-Outside,TRUE,9,TRUE,,,Partial,,
HUBVIC,Victoria,1,HUBVIC,TRUE,HUBVIC-Outside,False,,TRUE,Full,,Partial,,
HUBVXH,Vauxhall,1|2,HUBVXH,TRUE,HUBVXH-Outside,False,,TRUE,Full,,Partial,,
HUBWAT,Waterloo,1,HUBWAT,TRUE,HUBWAT-Outside,False,,TRUE,Full,Full,Partial,,
HUBWBP,West Brompton,2,HUBWBP,TRUE,HUBWBP-Outside,False,,False,,,Partial,,
HUBWCY,West Croydon,5|Trams fare zone,HUBWCY,FALSE,HUBWCY-Outside,False,,False,,,Partial,,
HUBWEH,West Ham,2|3,HUBWEH,TRUE,HUBWEH-Outside,False,,False,,,Partial,,
HUBWFJ,Watford Junction,Outside,HUBWFJ,FALSE,HUBWFJ-Outside,TRUE,10,False,,,Partial,,
HUBWHC,Walthamstow Central,3,HUBWHC,TRUE,HUBWHC-Outside,TRUE,8,False,,,,,
HUBWIJ,Willesden Junction,2|3,HUBWIJ,TRUE,HUBWIJ-Outside,False,,False,,,,,
HUBWIM,Wimbledon,3|Trams fare zone,HUBWIM,TRUE,HUBWIM-Outside,TRUE,2,TRUE,Full,,Partial,,
HUBWMB,Wembley Central,4,HUBWMB,TRUE,HUBWMB-Outside,False,,False,,,Partial,,
HUBWRU,West Ruislip,6,HUBWRU,TRUE,HUBWRU-Outside,False,,False,,,,,
HUBWSM,Westminster,1,HUBWSM,TRUE,HUBWSM-Outside,False,,False,,Full,,,
HUBWWA,Woolwich Arsenal,4,HUBWWA,FALSE,HUBWWA-Outside,False,,False,Full,Full,Partial,,
HUBZCW,Canada Water,2,HUBZCW,TRUE,HUBZCW-Outside,False,,False,Full,,,,
HUBZFD,Farringdon,1,HUBZFD,FALSE,HUBZFD-Outside,False,,False,,,Partial,,
HUBZMG,Moorgate,1,HUBZMG,FALSE,HUBZMG-Outside,False,,False,,,,,
HUBZWL,Whitechapel,2,HUBZWL,FALSE,HUBZWL-Outside,False,,False,,,,,
940GZZNEUGST,Nine Elms,1,,TRUE,940GZZNEUGST-Outside,False,,False,,,,,
940GZZBPSUST,Battersea Power Station,1,,TRUE,940GZZBPSUST-Outside,False,,False,,,,,
910GWOLWXR,Woolwich,4,910GWOLWXR,TRUE,910GWOLWXR-Outside,False,,False,,,,,
910GBKRVS,Barking Riverside,4,910GBKRVS,TRUE,910GBKRVS-Outside,False,,False,,Full,,,
`
// function to format csv string into an Array of Objects.
    function csvToArr(csvString) {
        const [keys, ...rest] = csvString
          .trim()
          .split("\n")
          .map((item) => item.split(','));
      
        const formedArr = rest.map((item) => {
          const object = {};
          keys.forEach((key, index) => (object[key] = item.at(index)));
          return object;
        });
      
        return formedArr;
      }

// Storing our station objects.
const stationObjects = csvToArr(csvFile, ',');
// console.log(stationObjects);



//------------------------------------------------------------------------



/**
 * Use the input string from the HTML form to search the stations object array for
 * a match on station name. Then use the corresponding values of that match to append 
 * an API request; station ID and line. If no match is found, throw an error.
 */

// Station name; user searched for.
// Station UniqueId; based on user search.
let userInput = '';
let stationId = '';

// function to format user input, ensuring2 the strings match the format of the object values.
function formatInput() {
    const inputElement = document.getElementById('station');
    const inputValue = inputElement.value;

    // Convert the first letter of each word to uppercase and the rest to lowercase
    const formattedValue = inputValue.replace(/\b\w/g, char => char.toUpperCase());

    // Update the input field value with the formatted value.
    userInput = inputElement.value;
  }

// Search stationObjects array with userInput for the corresponding station's UniqueId.
function findUserInput() {
    const result = stationObjects.find(obj => obj.Name === userInput);
    if (result) {
        stationId = result.UniqueId;
        console.log(stationId);
    } else {
        console.log('Error: No matching object found');
    }
}
  

// Use functions 'formatInput()' and 'findUserInput()' in connection with the HTML form and button.
// Append API request with stationID.
function submitSearch() {
    // Update variables: userInput & stationId.
    formatInput();
    findUserInput();

    const response = fetch(`https://api.tfl.gov.uk/Line/${??????}/Arrivals/${stationId}?direction=all&app_id={{app_id}}&app_key=fe96f0290c804e9b93203a34f4e3fb2c`, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',}
        })
        .then(response => {
            console.log(response.status);
            console.log(response.text());
        })
        .catch(err => console.error(err));

    return response;




}






//button onclick
//function to update userInput using formatInput()
//use updated input string in searchStationByName()













    function getTimes(stationID, line) {


        const response = fetch(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${stationID}?direction=all&app_id={{app_id}}&app_key=fe96f0290c804e9b93203a34f4e3fb2c`, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',}
        })
        .then(response => {
            console.log(response.status);
            console.log(response.text());
        })
        .catch(err => console.error(err));

    return response;
}