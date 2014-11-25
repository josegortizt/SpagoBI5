/**

SpagoBI - The Business Intelligence Free Platform

Copyright (C) 2005-2010 Engineering Ingegneria Informatica S.p.A.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

 **/
package it.eng.spagobi.tools.hierarchiesmanagement;

/**
 * @author Marco Cortella (marco.cortella@eng.it)
 * 
 */
public class HierarchyTreeNodeData {

	String nodeCode;
	String nodeName;
	String leafId;
	String leafParentCode;
	String leafParentName;

	/**
	 * @param nodeCode
	 * @param nodeName
	 */
	public HierarchyTreeNodeData(String nodeCode, String nodeName) {
		this(nodeCode, nodeName, "", "", "");
	}

	public HierarchyTreeNodeData(String nodeCode, String nodeName, String leafId, String leafParentCode, String leafParentName) {
		super();
		this.nodeCode = nodeCode;
		this.nodeName = nodeName;
		this.leafId = leafId;
		this.leafParentCode = leafParentCode;
		this.leafParentName = leafParentName;
	}

	/**
	 * @return the nodeCode
	 */
	public String getNodeCode() {
		return nodeCode;
	}

	/**
	 * @param nodeCode
	 *            the nodeCode to set
	 */
	public void setNodeCode(String nodeCode) {
		this.nodeCode = nodeCode;
	}

	/**
	 * @return the nodeName
	 */
	public String getNodeName() {
		return nodeName;
	}

	/**
	 * @param nodeName
	 *            the nodeName to set
	 */
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	/**
	 * @return the leafId
	 */
	public String getLeafId() {
		return leafId;
	}

	/**
	 * @param leafId
	 *            the leafId to set
	 */
	public void setLeafId(String leafId) {
		this.leafId = leafId;
	}

	/**
	 * @return the leafParentCode
	 */
	public String getLeafParentCode() {
		return leafParentCode;
	}

	/**
	 * @param leafParentCode
	 *            the leafParentCode to set
	 */
	public void setLeafParentCode(String leafParentCode) {
		this.leafParentCode = leafParentCode;
	}

	/**
	 * @return the leafParentNm
	 */
	public String getLeafParentName() {
		return leafParentName;
	}

	/**
	 * @param leafParentNm
	 *            the leafParentNm to set
	 */
	public void setLeafParentName(String leafParentName) {
		this.leafParentName = leafParentName;
	}

}
