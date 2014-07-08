/* SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */


package it.eng.spagobi.engines.whatif;

import it.eng.spagobi.utilities.engines.SpagoBIEngineException;

/**
 * The Class WhatIfEngineException.
 */
public class WhatIfEngineException extends SpagoBIEngineException {
    
	/** The hints. 
	List hints;
	*/
	
	WhatIfEngineInstance engineInstance;
	
	
	/**
	 * Builds a <code>WhatIfEngineException</code>.
	 * 
	 * @param message Text of the exception
	 */
    public WhatIfEngineException(String message) {
    	super(message);
    }
	
    /**
     * Builds a <code>WhatIfEngineException</code>.
     * 
     * @param message Text of the exception
     * @param ex previous Throwable object
     */
    public WhatIfEngineException(String message, Throwable ex) {
    	super(message, ex);
    }
    
    public WhatIfEngineInstance getEngineInstance() {
		return engineInstance;
	}

	public void setEngineInstance(WhatIfEngineInstance engineInstance) {
		this.engineInstance = engineInstance;
	}
    
   


}

