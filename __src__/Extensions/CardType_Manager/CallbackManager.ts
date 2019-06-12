//###  Module: CSS  ###//
const CSS = require("./__CSS_Variables__.json").CardType_Manager

//###  Module  ###//
import {HoverManager} from "./HoverManager"
import {StyleManager} from "./StyleManager"
import {KeyBinding  } from "~/Utils/KeyBinding/__Main__"
import {CardType    } from "~/Utils/KanbanTool/CardType"
import {
	CardType_Filter,
	cardTypes,
} from "~/Utils/KanbanTool/__Main__"


//#################//
//###  Exports  ###//
//#################//

export namespace CallbackManager{

	let _entryIndex = -1

	export function get_Callbacks(){
		_entryIndex += 1
		const cardType = cardTypes[_entryIndex]

		return _get_Callbacks(cardType)
	}

	function _get_Callbacks(cardType:CardType){
		return {
			on_Layout: function(cell:JQuery){
				cell.addClass(CSS.filter)
				StyleManager.update_CardStyle(cell, cardType)
				const update_CSS = _get_UpdateCSS_Callback(cell, cardType)
				CardType_Filter.on_Update(update_CSS)
				update_CSS()
			},

			on_KeyBinding: function(event:KeyboardEvent, cell:JQuery){
				HoverManager.set_CardType(cardType)
			},

			on_Click: function(event:JQuery.ClickEvent, cell:JQuery){
				if(KeyBinding.is_Pressed("ctrl")){
					CardType_Filter.disable_CardTypes()
					CardType_Filter.enable_CardTypes(cardType.index)
				}
				else
					{CardType_Filter.toggle_CardTypes(cardType.index)}
			},
		}
	}

}


//###############//
//###  Utils  ###//
//###############//

function _get_UpdateCSS_Callback(cell:JQuery, cardType:CardType){
	return () => {
		if(CardType_Filter.cardType_IsEnabled(cardType)){
			cell.addClass   (CSS.activeFilter  )
			cell.removeClass(CSS.inactiveFilter)
		}
		else{
			cell.removeClass(CSS.activeFilter  )
			cell.addClass   (CSS.inactiveFilter)
		}
	}
}
