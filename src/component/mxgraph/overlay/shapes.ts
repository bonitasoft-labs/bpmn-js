/**
 * Copyright 2021 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { mxgraph } from '../initializer';
import { mxRectangle } from 'mxgraph';
import { MxGraphCustomOverlayStyle } from './custom-overlay';

export class OverlayBadgeShape extends mxgraph.mxText {
  // TODO to remove when typed-mxgraph@1.0.1 mxText definitions won't declare these fields as protected (prevent assign OverlayBadgeShape instances as mxShape)
  spacing: number;
  bounds: mxRectangle;
  // end of typed-mxgraph issue

  // TODO remove the bounds parameter
  // should always be set in the constructor
  constructor(value: string, bounds: mxRectangle, style: MxGraphCustomOverlayStyle) {
    super(
      value,
      bounds,
      undefined,
      undefined,
      style.font.color,
      undefined,
      style.font.size,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      style.fill.color,
      style.stroke.color,
    );
    this.fillOpacity = style.fill.opacity;
    this.strokewidth = style.stroke.width;

    this.opacity = 40;

    // const old = this.spacing;
    //this.spacing = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING, this.spacing));
    this.spacingTop = 12; //(this.spacingTop - old)) + this.spacing;
    // this.spacingRight = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_RIGHT, this.spacingRight - old)) + this.spacing;
    // this.spacingBottom = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_BOTTOM, this.spacingBottom - old)) + this.spacing;
    // this.spacingLeft = parseInt(mxUtils.getValue(this.style, mxConstants.STYLE_SPACING_LEFT, this.spacingLeft - old)) + this.spacing;
  }

  // apply(state: mxCellState): void {
  //   super.apply(state);
  //
  //   this.opacity = 30;
  // }

  // paint(c: mxAbstractCanvas2D): void {
  //   // // Scale is passed-through to canvas
  //   // var s = this.scale;
  //   // var x = this.bounds.x / s;
  //   // var y = this.bounds.y / s;
  //   // var w = this.bounds.width / s;
  //   // var h = this.bounds.height / s;
  //   //
  //   // this.updateTransform(c, x, y, w, h);
  //   // this.configureCanvas(c, x, y, w, h);
  //   //
  //   // if (update)
  //   // {
  //   //   c.updateText(x, y, w, h, this.align, this.valign, this.wrap, this.overflow,
  //   //     this.clipped, this.getTextRotation(), this.node);
  //   // }
  //   // else
  //   // {
  //   //   // Checks if text contains HTML markup
  //   //   var realHtml = mxUtils.isNode(this.value) || this.dialect == mxConstants.DIALECT_STRICTHTML;
  //   //
  //   //   // Always renders labels as HTML in VML
  //   //   var fmt = (realHtml || c instanceof mxVmlCanvas2D) ? 'html' : '';
  //   //   var val = this.value;
  //   //
  //   //   if (!realHtml && fmt == 'html')
  //   //   {
  //   //     val = mxUtils.htmlEntities(val, false);
  //   //   }
  //   //
  //   //   if (fmt == 'html' && !mxUtils.isNode(this.value))
  //   //   {
  //   //     val = mxUtils.replaceTrailingNewlines(val, '<div><br></div>');
  //   //   }
  //   //
  //   //   // Handles trailing newlines to make sure they are visible in rendering output
  //   //   val = (!mxUtils.isNode(this.value) && this.replaceLinefeeds && fmt == 'html') ?
  //   //     val.replace(/\n/g, '<br/>') : val;
  //   //
  //   //   var dir = this.textDirection;
  //   //
  //   //   if (dir == mxConstants.TEXT_DIRECTION_AUTO && !realHtml)
  //   //   {
  //   //     dir = this.getAutoDirection();
  //   //   }
  //   //
  //   //   if (dir != mxConstants.TEXT_DIRECTION_LTR && dir != mxConstants.TEXT_DIRECTION_RTL)
  //   //   {
  //   //     dir = null;
  //   //   }
  //   //
  //   //   c.text(x, y, w, h, val, this.align, this.valign, this.wrap, fmt,
  //   //     this.overflow, this.clipped, this.getTextRotation(), dir);
  //   // }
  //
  //   // TODO disable stroke, fill (set to transparent) after having paint the background
  //   super.paint(c, false);
  //   console.info('@@@this.boundingBox after super paint', this.boundingBox);
  //
  //   // Scale is passed-through to canvas
  //   const s = this.scale;
  //   const x = this.bounds.x / s;
  //   const y = this.bounds.y / s;
  //   const w = this.bounds.width / s;
  //   const h = this.bounds.height / s;
  //
  //   console.info('this.value', this.value);
  //   const textBbox = this.computeTextBbox(this.value, x, y);
  //   console.info('@@@computeTextBbox', textBbox);
  //
  //   c.ellipse(x + 10, y + 10, 30, 30);
  //   c.fillAndStroke();
  //   // c.stroke();
  //   console.info('@@@@after ellipse');
  // }

  // TODO can we computeTextBbox()?
  // from mxSvgCanvas2D.prototype.addTextBackground
  private computeTextBbox(str: string, x: number, y: number): mxRectangle {
    // var s = this.state;
    //
    // if (s.fontBackgroundColor != null || s.fontBorderColor != null)
    // {
    //   var bbox = null;
    //
    //   if (overflow == 'fill' || overflow == 'width')
    //   {
    //     if (align == mxConstants.ALIGN_CENTER)
    //     {
    //       x -= w / 2;
    //     }
    //     else if (align == mxConstants.ALIGN_RIGHT)
    //     {
    //       x -= w;
    //     }
    //
    //     if (valign == mxConstants.ALIGN_MIDDLE)
    //     {
    //       y -= h / 2;
    //     }
    //     else if (valign == mxConstants.ALIGN_BOTTOM)
    //     {
    //       y -= h;
    //     }
    //
    //     bbox = new mxRectangle((x + 1) * s.scale, y * s.scale, (w - 2) * s.scale, (h + 2) * s.scale);
    //   }
    //   else if (node.getBBox != null && this.root.ownerDocument == document)
    //   {
    //     // Uses getBBox only if inside document for correct size
    //     try
    //     {
    //       bbox = node.getBBox();
    //       var ie = mxClient.IS_IE && mxClient.IS_SVG;
    //       bbox = new mxRectangle(bbox.x, bbox.y + ((ie) ? 0 : 1), bbox.width, bbox.height + ((ie) ? 1 : 0));
    //     }
    //     catch (e)
    //     {
    //       // Ignores NS_ERROR_FAILURE in FF if container display is none.
    //     }
    //   }

    // if (bbox == null || bbox.width == 0 || bbox.height == 0)
    // {
    // Computes size if not in document or no getBBox available
    const div = document.createElement('div');

    const s = this.state;
    // console.info('@@@state during paint', s);

    // Wrapping and clipping can be ignored here
    div.style.lineHeight = mxgraph.mxConstants.ABSOLUTE_LINE_HEIGHT ? this.size * mxgraph.mxConstants.LINE_HEIGHT + 'px' : `${mxgraph.mxConstants.LINE_HEIGHT}`;
    div.style.fontSize = this.size + 'px';
    div.style.fontFamily = this.family;
    // div.style.lineHeight = (mxgraph.mxConstants.ABSOLUTE_LINE_HEIGHT) ? (s.fontSize * mxgraph.mxConstants.LINE_HEIGHT) + 'px' : mxgraph.mxConstants.LINE_HEIGHT;
    // div.style.fontSize = s.fontSize + 'px';
    // div.style.fontFamily = s.fontFamily;
    div.style.whiteSpace = 'nowrap';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.display = 'inline-block';
    // div.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';
    // div.style.zoom = '1';

    if ((this.fontStyle & mxgraph.mxConstants.FONT_BOLD) == mxgraph.mxConstants.FONT_BOLD) {
      // if ((s.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD)
      div.style.fontWeight = 'bold';
    }

    if ((this.fontStyle & mxgraph.mxConstants.FONT_ITALIC) == mxgraph.mxConstants.FONT_ITALIC) {
      // if ((s.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC)
      div.style.fontStyle = 'italic';
    }

    // TODO error in typed-mxgraph@1.0.1
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    str = mxgraph.mxUtils.htmlEntities(str, false);
    div.innerHTML = str.replace(/\n/g, '<br/>');

    document.body.appendChild(div);
    const w = div.offsetWidth;
    const h = div.offsetHeight;
    div.parentNode.removeChild(div);

    if (this.align == mxgraph.mxConstants.ALIGN_CENTER) {
      x -= w / 2;
    } else if (this.align == mxgraph.mxConstants.ALIGN_RIGHT) {
      x -= w;
    }

    if (this.valign == mxgraph.mxConstants.ALIGN_MIDDLE) {
      y -= h / 2;
    } else if (this.valign == mxgraph.mxConstants.ALIGN_BOTTOM) {
      y -= h;
    }

    return new mxgraph.mxRectangle((x + 1) * this.scale, (y + 2) * this.scale, w * this.scale, (h + 1) * this.scale);
    // const bbox = new mxRectangle((x + 1) * s.scale, (y + 2) * s.scale, w * s.scale, (h + 1) * s.scale);
    // }

    // if (bbox != null)
    // {
    //   var n = this.createElement('rect');
    //   n.setAttribute('fill', s.fontBackgroundColor || 'none');
    //   n.setAttribute('stroke', s.fontBorderColor || 'none');
    //   n.setAttribute('x', Math.floor(bbox.x - 1));
    //   n.setAttribute('y', Math.floor(bbox.y - 1));
    //   n.setAttribute('width', Math.ceil(bbox.width + 2));
    //   n.setAttribute('height', Math.ceil(bbox.height));
    //
    //   var sw = (s.fontBorderColor != null) ? Math.max(1, this.format(s.scale)) : 0;
    //   n.setAttribute('stroke-width', sw);
    //
    //   // Workaround for crisp rendering - only required if not exporting
    //   if (this.root.ownerDocument == document && mxUtils.mod(sw, 2) == 1)
    //   {
    //     n.setAttribute('transform', 'translate(0.5, 0.5)');
    //   }
    //
    //   node.insertBefore(n, node.firstChild);
    // }
    //   }
    // }
  }
}
