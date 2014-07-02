#encoding: utf-8

#
# 1'st Diagram
#

diagram = <<-END
{
    "width": 800,
    "height": 600,
    "components": [{
        "type": "Delo.Text",
        "attrs": {
            "x": 21,
            "y": 21,
            "fontSize": 40,
            "fontFamily": "Arial black",
            "fill": "black",
            "stroke": "",
            "text": "esticker",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 274,
            "y": 19,
            "fontSize": 50,
            "fontFamily": "Arial ",
            "fill": "black",
            "stroke": "",
            "text": "DOX",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 471,
            "y": 17,
            "fontSize": 20,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "Piece :",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 538,
            "y": 41,
            "fontSize": 30,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "1/2",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 24,
            "y": 97,
            "fontSize": 25,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "2100 MANILA, PHILIPPINES",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 82.5,
            "y": 136,
            "fontSize": 40,
            "fontFamily": "Arial",
            "fill": "#fff",
            "stroke": "",
            "text": "DG-ND-SB-CD",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Box",
        "attrs": {
            "x": 11,
            "y": 130,
            "width": 418,
            "height": 52,
            "stroke": "",
            "fill": "#333",
            "strokeWidth": 0,
            "rotationDeg": 0
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 14,
            "y": 197,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "Shipment No. : 874193123",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 14,
            "y": 221,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "Sender's reference : Braun25017",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 14,
            "y": 245,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "AIRWAYBILL : ",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Barcode",
        "attrs": {
            "x": 14,
            "y": 271,
            "symbol": "code39",
            "text": "1234567890",
            "alttext": "8741493123493123",
            "scale_h": 1,
            "scale_w": 2,
            "rotation": "N",
            "includetext": true,
            "includecheckintext": true,
            "includecheck": true,
            "parsefnc": true,
            "segments": 4,
            "showborder": true,
            "version": "iata",
            "barcolor": "#FF0000",
            "rows": 45,
            "columns": 15,
            "height": 111,
            "backgroundcolor": "DD000011",
            "format": "full",
            "ccversion": "b",
            "cccolumns": 7,
            "numeric": true,
            "guardwhitespace": true,
            "width": 434
        }
    }, {
        "type": "Barcode",
        "attrs": {
            "x": 17,
            "y": 398,
            "symbol": "code39",
            "text": "1234567890",
            "alttext": "ISBN 0 - 8120 - 4824 - 5",
            "scale_h": 1,
            "scale_w": 3,
            "rotation": "N",
            "includetext": true,
            "includecheckintext": true,
            "includecheck": true,
            "parsefnc": true,
            "segments": 2,
            "showborder": true,
            "version": "iata",
            "barcolor": "#FF0000",
            "rows": 25,
            "columns": 8,
            "height": 1.5,
            "backgroundcolor": "DD000011",
            "format": "full",
            "ccversion": "b",
            "cccolumns": 3,
            "numeric": true,
            "guardwhitespace": true,
            "width": 64
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 530,
            "y": 208,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "ORIGIN : BRU",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Line",
        "attrs": {
            "x": 9,
            "y": 80,
            "width": 647,
            "height": -1,
            "stroke": "black",
            "strokeWidth": 3
        }
    }, {
        "type": "Delo.Line",
        "attrs": {
            "x": 11,
            "y": 380,
            "width": 647,
            "height": -1,
            "stroke": "black",
            "strokeWidth": 3
        }
    }, {
        "type": "Delo.Line",
        "attrs": {
            "x": 236,
            "y": 17,
            "width": 0,
            "height": 62,
            "stroke": "black",
            "strokeWidth": 2
        }
    }, {
        "type": "Delo.Line",
        "attrs": {
            "x": 456,
            "y": 17,
            "width": 0,
            "height": 62,
            "stroke": "black",
            "strokeWidth": 2
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 613,
            "y": 225,
            "fontSize": 45,
            "fontFamily": "Arial black",
            "fill": "black",
            "stroke": "",
            "text": "A",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 530,
            "y": 279,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "SORT : AA135",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 508,
            "y": 301,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "Lot Code : PA370",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 531,
            "y": 324,
            "fontSize": 18,
            "fontFamily": "Arial",
            "fill": "black",
            "stroke": "",
            "text": "Net Wt : 9.5 kg",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Image",
        "attrs": {
            "x": 530,
            "y": 97,
            "width": 123,
            "height": 51,
            "stroke": "black",
            "strokeWidth": 3,
            "rotationDeg": 0,
            "url": "/uploads/attachment/path/1/site_brand.png"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 535,
            "y": 148,
            "fontSize": 28,
            "fontFamily": "Arial",
            "fill": "#003366",
            "stroke": "",
            "text": "Vzion",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 607,
            "y": 148,
            "fontSize": 28,
            "fontFamily": "Arial",
            "fill": "#333",
            "stroke": "",
            "text": "sys",
            "rotationDeg": 0,
            "width": "auto",
            "height": "auto"
        }
    }]
}
END

print_command = <<-END
END

infog01 = Infographic.create!(
  name: 'Shipping Mark',
  description: 'Shipping Mark',
  infographic_type: 'type1',
  printer_type: 'zebra',
  diagram: diagram,
  print_command: print_command
)

#
# 2'nd Diagram
#

diagram = <<-END
{
    "width": 800,
    "height": 600,
    "components": [{
        "type": "Delo.Box",
        "attrs": {
            "x": 10,
            "y": 10,
            "width": 780,
            "height": 100,
            "stroke": "black",
            "fill": "white",
            "strokeWidth": 1,
            "rotationDeg" : 0
        }
    }, {
        "type": "Delo.Box",
        "attrs": {
            "x": 10,
            "y": 110,
            "width": 390,
            "height": 100,
            "stroke": "black",
            "fill": "white",
            "strokeWidth": 1,
            "rotationDeg" : 0
        }
    }, {
        "type": "Delo.Box",
        "attrs": {
            "x": 10,
            "y": 210,
            "width": 390,
            "height": 100,
            "stroke": "black",
            "fill": "white",
            "strokeWidth": 1,
            "rotationDeg" : 0
        }
    }, {
        "type": "Delo.Box",
        "attrs": {
            "x": 400,
            "y": 210,
            "width": 390,
            "height": 100,
            "stroke": "black",
            "fill": "white",
            "strokeWidth": 1,
            "rotationDeg" : 0
        }
    }, {
        "type": "Delo.Image",
        "attrs": {
            "x": 10,
            "y": 10,
            "width": 200,
            "height": 100,
            "stroke": "black",
            "strokeWidth": 0,
            "url": "#{Attachment.first.path}",
            "rotationDeg" : 0
        }
    }, {
        "type": "Barcode",
        "attrs": {
            "x": 223,
            "y": 16,
            "symbol": "code128",
            "text": "${System Title}",
            "alttext": "${System Title}",
            "scale_h": 1,
            "scale_w": 2,
            "rotation": "N",
            "includetext": true,
            "includecheckintext": true,
            "includecheck": true,
            "parsefnc": true,
            "segments": 4,
            "showborder": true,
            "version": "iata",
            "barcolor": "#FF0000",
            "rows": 32,
            "columns": 8,
            "height": 0.5,
            "backgroundcolor": "DD000011",
            "format": "full",
            "ccversion": "b",
            "cccolumns": 4,
            "numeric": true,
            "guardwhitespace": true
        }
    }, {
        "type": "Delo.Box",
        "attrs": {
            "x": 400,
            "y": 110,
            "width": 390,
            "height": 100,
            "stroke": "black",
            "fill": "white",
            "strokeWidth": 1,
            "rotationDeg" : 0
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 50,
            "y": 132,
            "fontSize": 50,
            "fontFamily": "Calibri",
            "fill": "black",
            "stroke": "black",
            "text": "PRODUCT ID",
            "rotationDeg" : 0
        }
    }, {
        "type": "Barcode",
        "attrs": {
            "x": 412,
            "y": 114,
            "symbol": "code128",
            "text": "${Product ID}",
            "alttext": "${Product ID}",
            "scale_h": 1,
            "scale_w": 2,
            "rotation": "N",
            "includetext": true,
            "includecheckintext": true,
            "includecheck": true,
            "parsefnc": true,
            "segments": 4,
            "showborder": true,
            "version": "iata",
            "barcolor": "#FF0000",
            "rows": 32,
            "columns": 8,
            "height": 0.5,
            "backgroundcolor": "DD000011",
            "format": "full",
            "ccversion": "b",
            "cccolumns": 4,
            "numeric": true,
            "guardwhitespace": true
        }
    }, {
        "type": "Delo.Text",
        "attrs": {
            "x": 50,
            "y": 230,
            "fontSize": 50,
            "fontFamily": "Calibri",
            "fill": "black",
            "stroke": "black",
            "text": "WORK ORDER",
            "rotationDeg" : 0
        }
    }, {
        "type": "Barcode",
        "attrs": {
            "x": 413,
            "y": 215,
            "symbol": "code128",
            "text": "${WorkOrder}",
            "alttext": "${WorkOrder}",
            "scale_h": 1,
            "scale_w": 2,
            "rotation": "N",
            "includetext": true,
            "includecheckintext": true,
            "includecheck": true,
            "parsefnc": true,
            "segments": 4,
            "showborder": true,
            "version": "iata",
            "barcolor": "#FF0000",
            "rows": 32,
            "columns": 8,
            "height": 0.5,
            "backgroundcolor": "DD000011",
            "format": "full",
            "ccversion": "b",
            "cccolumns": 4,
            "numeric": true,
            "guardwhitespace": true
        }
    }]
}
END

print_command = <<-END
END

infog02 = Infographic.create!(
  name: 'Product',
  description: 'Sample Infographic for Product',
  infographic_type: 'type1',
  printer_type: 'zebra',
  diagram: diagram,
  print_command: print_command
)

#
# 3'st Diagram
#

diagram = <<-END
{
  "width" : 1000,
  "height" : 1000,
  "components": [{
      "type": "Barcode",
      "attrs": {
          "x": 39,
          "y": 133,
          "symbol": "code128",
          "text": "${System Title}",
          "alttext": "${System Title}",
          "textinclude": true,
          "scale_h": 2,
          "scale_w": 2,
          "rotation": "N",
          "includetext": true,
          "includecheckintext": true,
          "includecheck": true,
          "parsefnc": true,
          "segments": 4,
          "showborder": true,
          "version": "iata",
          "barcolor": "#FF0000",
          "rows": 32,
          "columns": 8,
          "height": 0.5,
          "backgroundcolor": "DD000011",
          "format": "full",
          "ccversion": "b",
          "cccolumns": 4,
          "numeric": true,
          "guardwhitespace": true
      }
  }, {
      "type": "Barcode",
      "attrs": {
          "x": 40,
          "y": 311,
          "symbol": "qrcode",
          "text": "http://m.daum.net",
          "alttext": "http://m.daum.net",
          "scale_h": 2,
          "scale_w": 2,
          "rotation": "N",
          "includetext": true,
          "includecheckintext": true,
          "includecheck": true,
          "parsefnc": true,
          "segments": 4,
          "showborder": true,
          "version": "iata",
          "barcolor": "#FF0000",
          "rows": 32,
          "columns": 8,
          "height": 0.5,
          "backgroundcolor": "DD000011",
          "format": "full",
          "ccversion": "b",
          "cccolumns": 4,
          "numeric": true,
          "guardwhitespace": true
      }
  }, {
      "type": "Delo.Ellipse",
      "attrs": {
          "x": 497,
          "y": 332,
          "width": 100,
          "height": 200,
          "fill": "blue",
          "h": 1,
          "stroke": "black",
          "strokeWidth": 3,
          "rotationDeg" : 0
      }
  }, {
      "type": "Delo.Line",
      "attrs": {
          "fill": "green",
          "stroke": "black",
          "strokeWidth": 10,
          "x": 205,
          "y": 103,
          "width": 100,
          "height": -40
      }
  }, {
      "type": "Delo.Image",
      "attrs": {
          "x": 319,
          "y": 24,
          "width": 100,
          "height": 100,
          "stroke": "black",
          "strokeWidth": 3,
          "url": "#{Attachment.first.path}",
          "rotationDeg" : 0
      }
  }, {
      "type": "Delo.Text",
      "attrs": {
          "x": 40,
          "y": 40,
          "text": "${Today}",
          "fontSize": 30,
          "fontFamily": "Calibri",
          "fill": "black",
          "stroke": "black",
          "rotationDeg" : 0
      }
  }, {
      "type": "Delo.Box",
      "attrs": {
          "x": 452,
          "y": 26,
          "width": 100,
          "height": 100,
          "stroke": "black",
          "fill": "red",
          "strokeWidth": 3,
          "rotationDeg" : 0
      }
  }, {
      "type": "Barcode",
      "attrs": {
          "x": 234,
          "y": 317,
          "symbol": "code128",
          "text": "ABCDEFG",
          "alttext": "ABCDEFG",
          "scale_h": 2,
          "scale_w": 2,
          "rotation": "N",
          "includetext": true,
          "includecheckintext": true,
          "includecheck": true,
          "parsefnc": true,
          "segments": 4,
          "showborder": true,
          "version": "iata",
          "barcolor": "#FF0000",
          "rows": 32,
          "columns": 8,
          "height": 0.5,
          "backgroundcolor": "DD000011",
          "format": "full",
          "ccversion": "b",
          "cccolumns": 4,
          "numeric": true,
          "guardwhitespace": true
      }
  }, {
      "type": "Delo.Text",
      "attrs": {
          "x": 474,
          "y": 171,
          "fontSize": 30,
          "fontFamily": "Calibri",
          "fill": "black",
          "stroke": "black",
          "text": "中国",
          "rotationDeg" : 0
      }
  }]
}
END

print_command = <<-END
END

infog03 = Infographic.create!(
  name: 'Sample',
  description: 'Sample Infographic Diagram',
  infographic_type: 'type1',
  printer_type: 'zebra',
  diagram: diagram,
  print_command: print_command
)



# Mapping Infographics to Entity

Entity.all.each do |entity|
  entity.update(list_infographic: infog01);
  entity.update(item_infographic: infog02);
end