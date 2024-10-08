USE [TiendaArticulos]
GO
/****** Object:  Table [dbo].[Articulo]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Articulo](
	[ArticuloID] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [nvarchar](20) NOT NULL,
	[Descripcion] [nvarchar](100) NOT NULL,
	[Precio] [decimal](10, 2) NOT NULL,
	[Imagen] [nvarchar](max) NULL,
	[Stock] [int] NOT NULL,
	[TiendaID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ArticuloID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ArticuloTienda]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticuloTienda](
	[ArticuloTiendaID] [int] IDENTITY(1,1) NOT NULL,
	[ArticuloID] [int] NOT NULL,
	[TiendaID] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ArticuloTiendaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Carrito]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Carrito](
	[CarritoID] [int] IDENTITY(1,1) NOT NULL,
	[ClienteID] [int] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CarritoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarritoArticulo]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarritoArticulo](
	[CarritoArticuloID] [int] IDENTITY(1,1) NOT NULL,
	[CarritoID] [int] NOT NULL,
	[ArticuloID] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CarritoArticuloID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[ClienteID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Apellidos] [nvarchar](50) NOT NULL,
	[Direccion] [nvarchar](100) NOT NULL,
	[Email] [varchar](50) NULL,
	[Password] [nvarchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClienteArticulo]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClienteArticulo](
	[ClienteArticuloID] [int] IDENTITY(1,1) NOT NULL,
	[ClienteID] [int] NOT NULL,
	[ArticuloID] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ClienteArticuloID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tienda]    Script Date: 03/09/2024 02:49:46 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tienda](
	[TiendaID] [int] IDENTITY(1,1) NOT NULL,
	[Sucursal] [nvarchar](50) NOT NULL,
	[Direccion] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TiendaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Articulo] ON 

INSERT [dbo].[Articulo] ([ArticuloID], [Codigo], [Descripcion], [Precio], [Imagen], [Stock], [TiendaID]) VALUES (9, N'cvsdf', N'svsfdv', CAST(55.00 AS Decimal(10, 2)), N'cvsdf_20240902_97.jpg', 5, 12)
INSERT [dbo].[Articulo] ([ArticuloID], [Codigo], [Descripcion], [Precio], [Imagen], [Stock], [TiendaID]) VALUES (1003, N'fvf', N'fvfvf', CAST(5.00 AS Decimal(10, 2)), N'fvf_20240902_57.jpg', 888, 11)
INSERT [dbo].[Articulo] ([ArticuloID], [Codigo], [Descripcion], [Precio], [Imagen], [Stock], [TiendaID]) VALUES (1004, N'erfger', N'erg', CAST(5.00 AS Decimal(10, 2)), N'erfger_20240902_88.jpg', 5, 10)
INSERT [dbo].[Articulo] ([ArticuloID], [Codigo], [Descripcion], [Precio], [Imagen], [Stock], [TiendaID]) VALUES (1005, N'rgrg', N'rgrrgrg', CAST(8.00 AS Decimal(10, 2)), N'rgrg_20240902_64.jpg', 55, 11)
SET IDENTITY_INSERT [dbo].[Articulo] OFF
GO
SET IDENTITY_INSERT [dbo].[Carrito] ON 

INSERT [dbo].[Carrito] ([CarritoID], [ClienteID], [FechaCreacion]) VALUES (3, 3, CAST(N'2024-09-03T18:10:19.230' AS DateTime))
SET IDENTITY_INSERT [dbo].[Carrito] OFF
GO
SET IDENTITY_INSERT [dbo].[CarritoArticulo] ON 

INSERT [dbo].[CarritoArticulo] ([CarritoArticuloID], [CarritoID], [ArticuloID], [Cantidad]) VALUES (5, 3, 1003, 1)
INSERT [dbo].[CarritoArticulo] ([CarritoArticuloID], [CarritoID], [ArticuloID], [Cantidad]) VALUES (6, 3, 1004, 5)
SET IDENTITY_INSERT [dbo].[CarritoArticulo] OFF
GO
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (3, N'jose', N'pastor', N'constitucion', N'admint@dec.com', N'$2a$11$3C6.U5MF1oxgn.koiVfxm.9yKeqhhOMIgkxeAnqRW3msU/lhA/2SC')
INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (4, N'josefvfvf', N'pastor', N'constitucion', N'tet@dec.com', N'$2a$11$tFwTq2/d/apdF7AzsMn1b.eyKAQ/EHlmDpBrhzL5PWArmJ4BScvmC')
INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (5, N'josefvfvf', N'pastorssfs', N'constitucion', N'tesffft@dec.com', N'$2a$11$6uJd01rQ/c69d1ypprWFmO2t4djE4FawHi/2/pizMefbNMtkC58d6')
INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (6, N'josefvfvfsfsf', N'pastorssfs', N'constitucion', N'trrrest@dec.com', N'$2a$11$bvizQXlxBcNG1T71cUsP4OzOlUupbqEhuFAkPw9stAdmo1nMV.cVS')
INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (7, N'josefvfvfsfsfcxc', N'pastorssfsxcvcx', N'constitucionxcv', N'tczxxcrrrest@dec.com', N'$2a$11$UUAEUBD3aaRke.zwDTVKHe5E0XNcRXVHNOka.p33k9wM7OLrjGt.6')
INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (8, N'admin', N'admin', N'admin', N'admin@gmail.com', N'$2a$11$yaKaBZKkymxrC7YR..sfKuZf/T8qC9TVN/tmFX019939xHpTiAcMK')
INSERT [dbo].[Cliente] ([ClienteID], [Nombre], [Apellidos], [Direccion], [Email], [Password]) VALUES (9, N'eduardo', N'eduardo', N'eduardo', N'eduardo@gmail.com', N'$2a$11$EjFzf5Y88yJ2x8GntT3jUeZvrxQOjHT2spNSbnlLbFDLFICAKjwaW')
SET IDENTITY_INSERT [dbo].[Cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[Tienda] ON 

INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (10, N'scxsx', N'sxsx')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (11, N'sxsx', N'sxsx')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (12, N'sxs', N'sxsx')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (13, N'sxs', N'sxs')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (14, N'sv', N'dsdc')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (15, N'dcds', N'sdcsd')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (16, N'sdcsd', N'sdcsd')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (17, N'sdcsd', N'sdcsdc')
INSERT [dbo].[Tienda] ([TiendaID], [Sucursal], [Direccion]) VALUES (25, N'qwe', N'wewewe')
SET IDENTITY_INSERT [dbo].[Tienda] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Articulo__06370DAC5F4F8198]    Script Date: 03/09/2024 02:49:46 p. m. ******/
ALTER TABLE [dbo].[Articulo] ADD UNIQUE NONCLUSTERED 
(
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Articulo]  WITH CHECK ADD  CONSTRAINT [FK_Articulo_Tienda] FOREIGN KEY([TiendaID])
REFERENCES [dbo].[Tienda] ([TiendaID])
GO
ALTER TABLE [dbo].[Articulo] CHECK CONSTRAINT [FK_Articulo_Tienda]
GO
ALTER TABLE [dbo].[ArticuloTienda]  WITH CHECK ADD FOREIGN KEY([ArticuloID])
REFERENCES [dbo].[Articulo] ([ArticuloID])
GO
ALTER TABLE [dbo].[ArticuloTienda]  WITH CHECK ADD FOREIGN KEY([TiendaID])
REFERENCES [dbo].[Tienda] ([TiendaID])
GO
ALTER TABLE [dbo].[Carrito]  WITH CHECK ADD FOREIGN KEY([ClienteID])
REFERENCES [dbo].[Cliente] ([ClienteID])
GO
ALTER TABLE [dbo].[CarritoArticulo]  WITH CHECK ADD FOREIGN KEY([ArticuloID])
REFERENCES [dbo].[Articulo] ([ArticuloID])
GO
ALTER TABLE [dbo].[CarritoArticulo]  WITH CHECK ADD FOREIGN KEY([CarritoID])
REFERENCES [dbo].[Carrito] ([CarritoID])
GO
ALTER TABLE [dbo].[ClienteArticulo]  WITH CHECK ADD FOREIGN KEY([ArticuloID])
REFERENCES [dbo].[Articulo] ([ArticuloID])
GO
ALTER TABLE [dbo].[ClienteArticulo]  WITH CHECK ADD FOREIGN KEY([ClienteID])
REFERENCES [dbo].[Cliente] ([ClienteID])
GO
