const es = {
  nav: {
    services: 'Servicios',
    howItWorks: 'Cómo Funciona',
    portfolio: 'Portafolio',
    contact: 'Contacto',
    cta: 'Evaluación Gratuita',
  },

  hero: {
    title: 'Software a Medida.',
    titleAccent: 'Soporte Real.',
    subtitle:
      'Reemplazamos su costoso conjunto de herramientas SaaS con un solo sistema hecho para su negocio. Deje de manejar múltiples suscripciones.',
    ctaPrimary: 'Obtenga una Evaluación Gratuita',
    ctaSecondary: 'Vea Cómo Funciona',
    before: 'Antes',
    after: 'Después',
    beforeTools: [
      { name: 'Software CRM', price: '$100/mo' },
      { name: 'Inventario y POS', price: '$350/mo' },
      { name: 'Sitio Web + Hosting', price: '$250/mo' },
      { name: 'Herramientas de Agenda', price: '$50/mo' },
      { name: 'Gestión de Redes Sociales', price: '$450/mo' },
    ],
    beforeTotal: '$1,200/month',
    beforeSummary: '5 accesos \u2022 5 facturas \u2022 5 líneas de soporte',
    afterBrand: 'Vurso',
    afterLabel: 'Un Solo Sistema Personalizado',
    afterPrice: '~$900/mo',
    afterSupport: '+ Soporte Humano Real',
    afterSavings: 'Ahorre ~$300/mes',
    afterSummary: '1 acceso \u2022 1 factura \u2022 1 llamada de soporte',
  },

  trustBar: {
    tagline: 'La confianza de negocios locales en diversas industrias',
    industries: {
      localRetail: 'Comercio Local',
      professionalServices: 'Servicios Profesionales',
      manufacturing: 'Manufactura',
      eCommerce: 'Comercio Electrónico',
      smallBusiness: 'Pequeñas Empresas',
    },
  },

  services: {
    heading: 'Lo Que Hacemos',
    subtitle:
      'Desde software personalizado hasta reparación de hardware, nos encargamos de toda la tecnología para que usted pueda enfocarse en su negocio.',
    swipe: 'Deslice para navegar',
    items: {
      customSoftware: {
        title: 'Desarrollo de Software Personalizado',
        description:
          'Aplicaciones a la medida de sus procesos de negocio. Reemplace costosas suscripciones SaaS con software que usted posee.',
      },
      webDesign: {
        title: 'Diseño y Desarrollo Web',
        description:
          'Sitios web rápidos y modernos que convierten visitantes en clientes. Construidos para rendimiento y optimizados para motores de búsqueda.',
      },
      socialMedia: {
        title: 'Gestión de Redes Sociales',
        description:
          'Presencia estratégica en redes sociales que fortalece su marca. Creación de contenido, programación y gestión de interacciones.',
      },
      inventory: {
        title: 'Sistemas de Inventario y Tienda',
        description:
          'Gestión de inventario completa con punto de venta integrado. Controle existencias, administre pedidos y procese pagos sin complicaciones.',
      },
      pcRepair: {
        title: 'Reparación de PC y Equipos a Medida',
        description:
          'Desde diagnóstico y reparaciones hasta construcción de estaciones de trabajo personalizadas. Mantenemos su hardware funcionando y configuramos equipos a su medida.',
      },
      security: {
        title: 'Seguridad y Configuración de Redes',
        description:
          'Proteja su negocio con sistemas de seguridad adecuados e infraestructura de red confiable. Cámaras, control de acceso y redes seguras.',
      },
      cloud: {
        title: 'Servicios en la Nube y Migración',
        description:
          'Lleve su negocio a la nube u optimice su configuración actual. Seguro, escalable y accesible desde cualquier lugar.',
      },
      backup: {
        title: 'Respaldo y Recuperación de Datos',
        description:
          'Nunca pierda datos críticos de su negocio. Respaldos automatizados, planificación de recuperación ante desastres y tranquilidad garantizada.',
      },
      itSupport: {
        title: 'Soporte y Mantenimiento de TI',
        description:
          'Soporte técnico continuo cuando lo necesite. Mantenemos todo funcionando sin problemas para que usted se enfoque en su negocio.',
      },
    },
  },

  demo: {
    heading: 'Véalo en Acción',
    subtitle:
      'Interactúe con una demo en vivo\u2014agregue productos, active ofertas y vea los cambios reflejarse en cada vista',
    screenshotComingSoon: 'Captura de pantalla próximamente',
    liveStoreLink: 'Visite la tienda en vivo',
    liveStoreDescription:
      'Ember & Wick Candle Co. \u2014 Una tienda real, construida con Vurso',
    swipe: 'Deslice para navegar',
    examples: {
      retail: 'Tienda Minorista',
      salon: 'Salón',
      comingSoon: 'Próximamente',
    },
    tabs: {
      inventory: {
        label: 'Inventario',
        title: 'Un Inventario, En Todas Partes',
        subtitle: 'En línea y en tienda, unificado',
        description:
          'Administre un solo inventario que se sincroniza perfectamente entre su sitio web, POS en tienda y todos los canales de venta. Agregue productos, ajuste precios y active ofertas\u2014cada cambio se actualiza al instante en todas partes.',
        features: [
          'Stock unificado en línea y en tienda',
          'Soporte de POS integrado',
          'Activar ofertas y precios',
          'Sincronización en tiempo real en todos los canales',
        ],
        placeholder: 'Captura del Panel de Inventario',
      },
      storefront: {
        label: 'Tienda',
        title: 'Vista Previa de Su Tienda',
        subtitle: 'Vista previa del propietario',
        description:
          'Vea exactamente cómo aparecerá su tienda antes de que los cambios se publiquen. Esta es su vista previa privada\u2014solo los productos activos aparecen aquí, con insignias de oferta y niveles de stock que se actualizan en tiempo real.',
        features: [
          'Vista previa en vivo de cambios',
          'Vista previa de ofertas y precios',
          'Indicadores de nivel de stock',
          'Solo muestra productos activos',
        ],
        placeholder: 'Captura de la Tienda',
      },
      customerOrder: {
        label: 'Vista del Cliente',
        title: 'La Experiencia de Compra',
        subtitle: 'La experiencia del cliente',
        description:
          'Explore productos como lo haría un cliente, agregue artículos al carrito y complete una compra. Vea el inventario actualizarse en tiempo real después del pago.',
        features: [
          'Agregar al carrito',
          'Stock en tiempo real',
          'Simulación de compra instantánea',
          'Inventario se sincroniza tras la compra',
        ],
        placeholder: 'Captura del Proceso de Compra',
      },
      sellerOrder: {
        label: 'Panel del Vendedor',
        title: 'Su Centro de Control',
        subtitle: 'Negocio de un vistazo',
        description:
          'Monitoree cada aspecto de su negocio desde un solo panel. Rastree ventas de su sitio web y POS en un solo lugar, con KPIs de inventario, márgenes de ganancia y alertas de stock bajo\u2014todo en tiempo real.',
        features: [
          'Ventas combinadas en línea y en tienda',
          'KPIs de retail y márgenes',
          'Alertas de stock bajo',
          'Registro de actividad en vivo',
        ],
        placeholder: 'Captura del Panel del Vendedor',
      },
    },
    interactive: {
      addProduct: 'Agregar Producto',
      editProduct: 'Editar Producto',
      search: 'Buscar productos...',
      name: 'Nombre',
      sku: 'SKU',
      price: 'Precio',
      cost: 'Costo',
      quantity: 'Cant.',
      status: 'Estado',
      actions: 'Acciones',
      active: 'Activo',
      inactive: 'Inactivo',
      sale: 'OFERTA',
      onSale: 'En Oferta',
      salePrice: 'Precio de Oferta',
      category: 'Categoría',
      save: 'Guardar',
      cancel: 'Cancelar',
      outOfStock: 'Agotado',
      lowStock: 'Stock Bajo',
      inStock: 'En Stock',
      addToCart: 'Agregar al Carrito',
      cart: 'Carrito',
      checkout: 'Pagar',
      orderConfirmed: '¡Pedido Confirmado!',
      total: 'Total',
      remove: 'Eliminar',
      emptyCart: 'Su carrito está vacío',
      totalProducts: 'Productos',
      inventoryValue: 'Valor Inv.',
      retailValue: 'Valor Venta',
      lowStockCount: 'Stock Bajo',
      recentActivity: 'Actividad Reciente',
      noActivity: 'Haga cambios en otras pestañas para ver actividad aquí',
      lowStockItems: 'Artículos con Stock Bajo',
      yourStore: 'Vista Previa',
      previewBadge: 'Vista del Propietario',
      shop: 'Tienda',
      dashboard: 'Panel del Vendedor',
      resetDemo: 'Reiniciar',
      salesReports: 'Reportes de Ventas',
      todaySales: 'Ventas de Hoy',
      orders: 'Pedidos',
      avgOrder: 'Pedido Prom.',
      returnRate: 'Tasa de Devolución',
      kpis: 'KPIs de Retail',
      grossMargin: 'Margen Bruto',
      sellThrough: 'Venta Directa',
      turnoverRate: 'Rotación',
      conversionRate: 'Conversión',
      noSalesYet: 'Complete una compra para ver datos de ventas',
      added: '¡Agregado!',
      maxQty: 'Máx. cant.',
      each: 'c/u',
      off: 'DESC.',
      noProducts: 'No se encontraron productos',
      noActiveProducts: '¡No hay productos activos. Agregue algunos en la pestaña de Inventario!',
      noAvailableProducts: 'No hay productos disponibles en este momento.',
      allStocked: '¡Todo abastecido!',
      left: 'restante(s)',
      productCount: 'productos',
      productCountSingular: 'producto',
      activeCount: 'activo(s)',
      clickToUnlist: 'Clic para desactivar',
      clickToList: 'Clic para activar',
      endSale: 'Terminar oferta',
      putOnSale: 'Poner en oferta',
      edit: 'Editar',
      delete: 'Eliminar',
      productName: 'Nombre del producto',
      justNow: 'ahora',
      timeAgoSec: 's atrás',
      timeAgoMin: 'm atrás',
      timeAgoHour: 'h atrás',
      categories: {
        tops: 'Parte Superior',
        bottoms: 'Pantalones',
        footwear: 'Calzado',
        outerwear: 'Abrigos',
        dresses: 'Vestidos',
      },
    },
  },

  howItWorks: {
    heading: 'Cómo Funciona',
    subtitle:
      'Un proceso simple de tres pasos para transformar la tecnología de su negocio',
    steps: [
      {
        title: 'Analizamos',
        description:
          'Comenzamos con una consulta gratuita para entender su negocio. Revisamos su conjunto actual de software, identificamos puntos de dolor y encontramos oportunidades para consolidar herramientas y reducir costos.',
        bullets: [
          'Auditoría de software gratuita',
          'Identificar suscripciones redundantes',
          'Mapear sus necesidades de flujo de trabajo',
        ],
      },
      {
        title: 'Construimos',
        description:
          'Nuestro equipo diseña y desarrolla una solución personalizada adaptada a sus necesidades exactas. Sin plantillas genéricas\u2014todo se construye específicamente para como opera su negocio.',
        bullets: [
          'Hecho a la medida para usted',
          'Se integra con herramientas existentes',
          'Construido para crecer con usted',
        ],
      },
      {
        title: 'Apoyamos',
        description:
          'Después del lanzamiento, no desaparecemos. Usted recibe soporte continuo de personas reales que conocen su sistema a fondo. Llame o escriba en cualquier momento\u2014nosotros sí respondemos.',
        bullets: [
          'Soporte humano real',
          'Resolución de problemas en el mismo día',
          'Mejoras continuas',
        ],
      },
    ],
  },

  support: {
    heading: 'Cuando Usted Llama,',
    headingAccent: 'Una Persona Real Responde',
    description:
      'A diferencia de las grandes empresas de tecnología que se esconden detrás de chatbots y formularios de correo, nosotros contestamos el teléfono. Su negocio no se detiene por tickets de soporte, y nosotros tampoco.',
    testimonial:
      '\u201CLlamé a las 8 PM un viernes porque nuestro sistema de cobro se cayó. Lo arreglaron en 20 minutos. Intente obtener eso de Shopify.\u201D',
    testimonialAuthor: '\u2014 Propietario de Negocio Local',
    stats: {
      responseTime: { value: '< 1 Hora', label: 'Tiempo Promedio de Respuesta' },
      availability: { value: '24/7', label: 'Disponibilidad de Emergencia' },
      humanSupport: { value: '100%', label: 'Soporte Humano' },
      resolution: { value: 'Mismo Día', label: 'Resolución de Problemas' },
    },
  },

  caseStudy: {
    heading: 'Resultados Reales',
    subtitle:
      'Vea cómo ayudamos a negocios de todo tipo a ahorrar dinero, ahorrar tiempo y trabajar de forma más inteligente',
    before: 'Antes',
    after: 'Después',
    swipe: 'Deslice para navegar',
    studies: [
      {
        title: 'Tienda Minorista Local',
        before: '$1,200/mo en 5 herramientas',
        after: '~$900/mo con Vurso',
        savings: 'Ahorro de ~$3,600/año',
        description:
          'Reemplazó CRM, Inventario y POS, Sitio Web y Hosting, Agenda y Gestión de Redes Sociales con un solo sistema personalizado. Un acceso, una factura, una llamada de soporte.',
      },
      {
        title: 'Empresa de Plomería',
        before: 'Agenda manual y facturas en papel',
        after: 'Flujo de trabajo completamente automatizado',
        savings: '20 horas/semana ahorradas',
        description:
          'Sistema de reservas personalizado con recordatorios automáticos, facturación digital y procesamiento de pagos. Los técnicos reciben trabajos en su teléfono, los clientes reciben mensajes.',
      },
      {
        title: 'Tienda de Comercio Electrónico',
        before: '48 horas de espera en soporte',
        after: 'Resolución en el mismo día',
        savings: 'Cero tiempo de inactividad',
        description:
          'Migración de Shopify a plataforma personalizada con soporte dedicado. Sin más esperas en línea\u2014una llamada y los problemas se resuelven.',
      },
      {
        title: 'Restaurante Familiar',
        before: 'Reservaciones en papel y lápiz',
        after: 'Reservas en línea + lista de espera',
        savings: '30% más comensales',
        description:
          'Sistema de reservaciones personalizado con reservas en línea, confirmaciones automáticas y gestión inteligente de mesas. Integrado con su POS para operaciones sin interrupciones.',
      },
      {
        title: 'Taller Mecánico',
        before: 'Registros de clientes dispersos',
        after: 'Historial de servicio completo',
        savings: '40% más clientes recurrentes',
        description:
          'CRM personalizado que rastrea cada vehículo, historial de servicio y mantenimiento próximo. Los recordatorios automáticos hacen que los clientes regresen.',
      },
      {
        title: 'Agencia Inmobiliaria',
        before: 'Manejando 4 herramientas diferentes',
        after: 'Una plataforma unificada',
        savings: '$6,000/año de ahorro',
        description:
          'Combinó CRM, gestión de listados, firma de documentos y portal de clientes en un solo sistema. Los agentes trabajan más rápido, los clientes se mantienen informados.',
      },
      {
        title: 'Estudio de Fitness',
        before: 'App de reservas anticuada',
        after: 'Portal de miembros personalizado',
        savings: '25% de crecimiento en membresías',
        description:
          'App personalizada para programación de clases, gestión de membresías y seguimiento de progreso. A los miembros les encanta la experiencia, las referencias aumentaron.',
      },
      {
        title: 'Consultorio Dental',
        before: 'Sistema de citas obsoleto',
        after: 'Experiencia moderna para pacientes',
        savings: '50% menos inasistencias',
        description:
          'Nuevo sistema de citas con recordatorios automáticos por mensaje de texto y correo electrónico. Los pacientes pueden reprogramar en línea, el personal dedica menos tiempo al teléfono.',
      },
      {
        title: 'Empresa de Construcción',
        before: 'Seguimiento de proyectos en hojas de cálculo',
        after: 'Gestión de obras en tiempo real',
        savings: 'Proyectos a tiempo y dentro del presupuesto',
        description:
          'Sistema de gestión de proyectos personalizado con programación de cuadrillas, seguimiento de materiales y actualizaciones para clientes. Todos se mantienen en la misma página.',
      },
      {
        title: 'Salón de Belleza',
        before: 'Citas solo por teléfono',
        after: 'Reservas en línea 24/7',
        savings: '35% más citas',
        description:
          'Los clientes reservan en cualquier momento desde su teléfono. Los estilistas administran sus propios horarios. Los recordatorios automáticos reducen las inasistencias a la mitad.',
      },
    ],
  },

  contact: {
    heading: 'Programe una',
    headingAccent: 'Auditoría de Software Gratuita',
    description:
      'Permítanos analizar su conjunto actual de software y mostrarle cuánto podría ahorrar con una solución personalizada. Sin compromisos, solo consejos honestos.',
    callLabel: 'Llámenos directamente',
    emailLabel: 'Escríbanos por correo',
    basedIn: 'Ubicados en',
    form: {
      nameLabel: 'Su Nombre *',
      namePlaceholder: 'Juan Pérez',
      businessLabel: 'Nombre del Negocio',
      businessPlaceholder: 'Su Empresa LLC',
      emailLabel: 'Correo Electrónico *',
      emailPlaceholder: 'john@business.com',
      phoneLabel: 'Número de Teléfono *',
      phonePlaceholder: '(555) 123-4567',
      advancedToggleShow:
        '¿Tiene unos minutos más? Agregue detalles para ayudarnos a preparar nuestra conversación',
      advancedToggleHide: 'Ocultar detalles adicionales',
      softwareSpendLabel: 'Gasto Mensual en Software',
      softwareSpendDefault: 'Seleccione un rango',
      softwareSpendOptions: [
        'Menos de $100/mes',
        '$100 - $300/mes',
        '$300 - $500/mes',
        '$500 - $1,000/mes',
        'Más de $1,000/mes',
        'No estoy seguro',
      ],
      employeeCountLabel: 'Número de Empleados',
      employeeCountDefault: 'Seleccione un rango',
      employeeCountOptions: ['Solo yo', '2-5', '6-15', '16-50', '50+'],
      currentToolsLabel: '¿Qué software o herramientas utiliza actualmente?',
      currentToolsPlaceholder:
        'ej., QuickBooks, Square, Shopify, hojas de cálculo...',
      painPointsLabel:
        '¿Cuál es su mayor frustración con su configuración actual?',
      painPointsPlaceholder:
        'ej., Demasiadas herramientas que no se comunican entre sí, suscripciones costosas...',
      submitButton: 'Enviar Mensaje',
      submitting: 'Enviando...',
      successTitle: '¡Mensaje Enviado!',
      successMessage: 'Le responderemos dentro de las próximas 24 horas.',
    },
  },

  footer: {
    description:
      'Soluciones de software personalizadas con soporte humano real. Ayudamos a negocios locales a competir con tecnología empresarial.',
    servicesHeading: 'Servicios',
    services: {
      customSoftware: 'Software Personalizado',
      webDevelopment: 'Desarrollo Web',
      socialMedia: 'Redes Sociales',
      inventorySystems: 'Sistemas de Inventario',
    },
    companyHeading: 'Empresa',
    company: {
      howItWorks: 'Cómo Funciona',
      portfolio: 'Portafolio',
      contact: 'Contacto',
    },
    contactHeading: 'Contáctenos',
    copyright: 'Vurso. Todos los derechos reservados.',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
  },
}

export default es
