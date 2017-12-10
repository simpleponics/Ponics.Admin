/* eslint-disable */

/* Options:
Date: 2017-12-07 11:57:01
Version: 5.00
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:51272

//GlobalNamespace:
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
//ExcludeTypes:
//DefaultImports:
*/

import IList from "../../node_modules/typescript-dotnet-umd/System/Collections/IList";


export interface IReturn<T>
{
    createResponse() : T;
}

export interface IReturnVoid
{
    createResponse() : void;
}

export class Query<TResult>
{
}

export type Scale = "Ph" | "Ppm" | "None";

export class Tolerance
{
    type: string;
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;

    /**
    * Upper bound level an organism can tolerate
    */
    // @ApiMember(DataType="number", Description="Upper bound level an organism can tolerate", Format="double", IsRequired=true, Name="Upper", ParameterType="body")
    upper: number;

    /**
    * Lower bound level an organism can tolerate
    */
    // @ApiMember(DataType="number", Description="Lower bound level an organism can tolerate", Format="double", IsRequired=true, Name="Lower", ParameterType="body")
    lower: number;

    /**
    * Desired upper bound level for an organism
    */
    // @ApiMember(DataType="number", Description="Desired upper bound level for an organism", Format="double", IsRequired=true, Name="DesiredUpper", ParameterType="body")
    desiredUpper: number;

    /**
    * Desired lower bound level for an organism
    */
    // @ApiMember(DataType="number", Description="Desired lower bound level for an organism", Format="double", IsRequired=true, Name="DesiredLower", ParameterType="body")
    desiredLower: number;
}

export class ComponentConnection
{
    /**
    * The id of the source component
    */
    // @ApiMember(DataType="string", Description="The id of the source component", IsRequired=true, Name="SourceId", ParameterType="body")
    sourceId: string;

    /**
    * The id of the destination component
    */
    // @ApiMember(DataType="string", Description="The id of the destination component", IsRequired=true, Name="DestinationId", ParameterType="body")
    targetId: string;
}

export class Component
{
    // @ApiMember(ExcludeInSchema=true)
    id: string;

    /**
    * The name of a component
    */
    // @ApiMember(DataType="string", Description="The name of a component", IsRequired=true, Name="Name", ParameterType="body")
    name: string;

    // @ApiMember(ExcludeInSchema=true)
    organisms: IList<string>;
}

export class AnalyseQuery<TLevelAnalysis, TTolerance> extends Query<TLevelAnalysis>
{
    /**
    * The id of an organism
    */
    // @ApiMember(DataType="string", Description="The id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;

    /**
    * The value of the level
    */
    // @ApiMember(DataType="number", Description="The value of the level", Format="double", IsRequired=true, Name="Value", ParameterType="path")
    value: number;
}

export class SalinityTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class Analysis<TTolerance>
{
    sutablalForOrganism: boolean;
    idealForOrganism: boolean;
    tolerance: TTolerance;
}

export class PhTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class NitriteTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class NitrateTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class IronTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class AmmoniaTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class Command
{
}

export interface IDataCommand
{
}

export class AddTolerance<TTolerance> extends Command
{
    /**
    * The id of an organism
    */
    // @ApiMember(DataType="string", Description="The id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;

    // @ApiMember(ExcludeInSchema=true)
    tolerance: TTolerance;
}

export class DeleteTolerance extends Command
{
    /**
    * The id of an organism
    */
    // @ApiMember(DataType="string", Description="The id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;
}

export class UpdateTolerance<TTolerance> extends Command
{
    /**
    * The id of an organism
    */
    // @ApiMember(DataType="string", Description="The id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;

    // @ApiMember(ExcludeInSchema=true)
    tolerance: TTolerance;
}

export class Organism
{
    /**
    * The name of an organism
    */
    // @ApiMember(DataType="string", Description="The name of an organism", IsRequired=true, Name="Name", ParameterType="body")
    name: string;

    // @ApiMember(ExcludeInSchema=true)
    id: string;

    // @ApiMember(ExcludeInSchema=true)
    tolerances: IList<Tolerance>;
}

export class AquaponicSystem
{
    // @ApiMember(ExcludeInSchema=true)
    id: string;

    /**
    * Indicates if the system is closed
    */
    // @ApiMember(DataType="boolean", Description="Indicates if the system is closed", Name="Closed", ParameterType="body")
    closed: boolean;

    /**
    * The name of the aquaponic system
    */
    // @ApiMember(DataType="string", Description="The name of the aquaponic system", IsRequired=true, Name="Name", ParameterType="body")
    name: string;

    // @ApiMember(ExcludeInSchema=true)
    components: IList<Component>;

    // @ApiMember(ExcludeInSchema=true)
    componentConnections: IList<ComponentConnection>;
}

export class SalinityAnalysis extends Analysis<SalinityTolerance>
{
}

export class PhAnalysis extends Analysis<PhTolerance>
{
    hydrogenIonConcentration: number;
    hydroxideIonsConcentration: number;
    warnings: string[];
}

export class NitriteAnalysis extends Analysis<NitriteTolerance>
{
}

export class NitrateAnalysis extends Analysis<NitrateTolerance>
{
}

export class IronAnalysis extends Analysis<IronTolerance>
{
}

export class AmmoniaAnalysis extends Analysis<AmmoniaTolerance>
{
}

/**
* Get all organisms
*/
// @Route("/organisms", "GET")
// @Api(Description="Get all organisms")
export class GetAllOrganisms extends Query<IList<Organism>>
{
}

/**
* Get an organism by Id
*/
// @Route("/organisms/{id}", "GET")
// @Api(Description="Get an organism by Id")
export class GetOrganism extends Query<Organism> implements IReturn<Organism>
{
    /**
    * The Id of an Organism
    */
    // @ApiMember(DataType="string", Description="The Id of an Organism", IsRequired=true, Name="Id", ParameterType="path")
    id: string;
    createResponse() { return new Organism(); }
    getTypeName() { return "GetOrganism"; }
}

/**
* Get a list of component connections
*/
// @Route("/systems/{SystemId}/components/connections", "GET")
// @Api(Description="Get a list of component connections")
export class GetConnections extends Query<IList<ComponentConnection>>
{
    /**
    * The id of a system
    */
    // @ApiMember(DataType="string", Description="The id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
}

/**
* Returns a list of all Aquaponic Systems
*/
// @Route("/systems", "GET")
// @Api(Description="Returns a list of all Aquaponic Systems")
export class GetAllSystems extends Query<IList<AquaponicSystem>>
{
}

/**
* Get an Aquaponic Systems by Id
*/
// @Route("/systems/{id}", "GET")
// @Api(Description="Get an Aquaponic Systems by Id")
export class GetSystem extends Query<AquaponicSystem> implements IReturn<AquaponicSystem>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="Id", ParameterType="path")
    id: string;
    createResponse() { return new AquaponicSystem(); }
    getTypeName() { return "GetSystem"; }
}

/**
* Returns Analysis of Salinity level for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Salinity/{Value}", "GET")
// @Api(Description="Returns Analysis of Salinity level for an Organism")
export class AnalyseSalinity extends AnalyseQuery<SalinityAnalysis, SalinityTolerance> implements IReturn<SalinityAnalysis>
{
    createResponse() { return new SalinityAnalysis(); }
    getTypeName() { return "AnalyseSalinity"; }
}

/**
* Returns Analysis of pH level for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Ph/{Value}", "GET")
// @Api(Description="Returns Analysis of pH level for an Organism")
export class AnalysePh extends AnalyseQuery<PhAnalysis, PhTolerance> implements IReturn<PhAnalysis>
{
    createResponse() { return new PhAnalysis(); }
    getTypeName() { return "AnalysePh"; }
}

/**
* Returns Analysis of Nitrite levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Nitrite/{Value}", "GET")
// @Api(Description="Returns Analysis of Nitrite levels for an Organism")
export class AnalyseNitrite extends AnalyseQuery<NitriteAnalysis, NitriteTolerance> implements IReturn<NitriteAnalysis>
{
    createResponse() { return new NitriteAnalysis(); }
    getTypeName() { return "AnalyseNitrite"; }
}

/**
* Returns Analysis of Nitrate levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Nitrite/{Value}", "GET")
// @Api(Description="Returns Analysis of Nitrate levels for an Organism")
export class AnalyseNitrate extends AnalyseQuery<NitrateAnalysis, NitrateTolerance> implements IReturn<NitrateAnalysis>
{
    createResponse() { return new NitrateAnalysis(); }
    getTypeName() { return "AnalyseNitrate"; }
}

/**
* Returns Analysis of Iron  levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Iron/{Value}", "GET")
// @Api(Description="Returns Analysis of Iron  levels for an Organism")
export class AnalyseIron extends AnalyseQuery<IronAnalysis, IronTolerance> implements IReturn<IronAnalysis>
{
    createResponse() { return new IronAnalysis(); }
    getTypeName() { return "AnalyseIron"; }
}

/**
* Returns Analysis of Ammonia levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Ammonia/{Value}", "GET")
// @Api(Description="Returns Analysis of Ammonia levels for an Organism")
export class AnalyseAmmonia extends AnalyseQuery<AmmoniaAnalysis, AmmoniaTolerance> implements IReturn<AmmoniaAnalysis>
{
    createResponse() { return new AmmoniaAnalysis(); }
    getTypeName() { return "AnalyseAmmonia"; }
}

/**
* Adds and organism
*/
// @Route("/organisms", "POST")
// @Api(Description="Adds and organism")
export class AddOrganism extends Command implements IReturnVoid, IDataCommand
{
    organism: Organism;
    createResponse() {}
    getTypeName() { return "AddOrganism"; }
}

/**
* Updates and Organism
*/
// @Route("/organisms/{id}", "PUT")
// @Api(Description="Updates and Organism")
export class UpdateOrganism extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The Id of an organism
    */
    // @ApiMember(DataType="string", Description="The Id of an organism", IsRequired=true, Name="Id", ParameterType="path")
    id: string;

    organism: Organism;
    createResponse() {}
    getTypeName() { return "UpdateOrganism"; }
}

/**
* Adds a component to a system
*/
// @Route("/systems/{SystemId}/components", "POST")
// @Api(Description="Adds a component to a system")
export class AddComponent extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The of a System
    */
    // @ApiMember(DataType="string", Description="The of a System", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    component: Component;
    createResponse() {}
    getTypeName() { return "AddComponent"; }
}

/**
* Connects two a components
*/
// @Route("/systems/{SystemId}/components/connections", "POST")
// @Api(Description="Connects two a components")
export class ConnectComponents extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The id of a system
    */
    // @ApiMember(DataType="string", Description="The id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    componentConnection: ComponentConnection;
    createResponse() {}
    getTypeName() { return "ConnectComponents"; }
}

/**
* Add an Aquaponic System
*/
// @Route("/systems", "POST")
// @Api(Description="Add an Aquaponic System")
export class AddSystem extends Command implements IReturnVoid, IDataCommand
{
    system: AquaponicSystem;
    createResponse() {}
    getTypeName() { return "AddSystem"; }
}

/**
* Update an Aquaponic Systems
*/
// @Route("/systems/{id}", "PUT")
// @Api(Description="Update an Aquaponic Systems")
export class UpdateSystem extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The Id of an aquaponic system
    */
    // @ApiMember(DataType="string", Description="The Id of an aquaponic system", IsRequired=true, Name="Id", ParameterType="path")
    id: string;

    system: AquaponicSystem;
    createResponse() {}
    getTypeName() { return "UpdateSystem"; }
}

/**
* Adds a salinity tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/salinity", "POST")
// @Api(Description="Adds a salinity tolerance to an organism")
export class AddSalinityTolerance extends AddTolerance<SalinityTolerance> implements IReturnVoid
{
    tolerance: SalinityTolerance;
    createResponse() {}
    getTypeName() { return "AddSalinityTolerance"; }
}

/**
* Deletes the salinity tolerance off an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/salinity", "DELETE")
// @Api(Description="Deletes the salinity tolerance off an organism")
export class DeleteSalinityTolerance extends DeleteTolerance implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "DeleteSalinityTolerance"; }
}

/**
* Updates the salinity tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/salinity", "PUT")
// @Api(Description="Updates the salinity tolerance of an organism")
export class UpdateSalinityTolerance extends UpdateTolerance<SalinityTolerance> implements IReturnVoid
{
    tolerance: SalinityTolerance;
    createResponse() {}
    getTypeName() { return "UpdateSalinityTolerance"; }
}

/**
* Add a pH tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ph", "POST")
// @Api(Description="Add a pH tolerance to an organism")
export class AddPhTolerance extends AddTolerance<PhTolerance> implements IReturnVoid
{
    tolerance: PhTolerance;
    createResponse() {}
    getTypeName() { return "AddPhTolerance"; }
}

/**
* Deletes the pH tolerance from an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ph", "DELETE")
// @Api(Description="Deletes the pH tolerance from an organism")
export class DeletePhTolerance extends DeleteTolerance implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "DeletePhTolerance"; }
}

/**
* Updates the pH tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ph", "PUT")
// @Api(Description="Updates the pH tolerance of an organism")
export class UpdatePhTolerance extends UpdateTolerance<PhTolerance> implements IReturnVoid
{
    tolerance: PhTolerance;
    createResponse() {}
    getTypeName() { return "UpdatePhTolerance"; }
}

/**
* Add a Nitrite tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrite", "POST")
// @Api(Description="Add a Nitrite tolerance to an organism")
export class AddNitriteTolerance extends AddTolerance<NitriteTolerance> implements IReturnVoid
{
    tolerance: NitriteTolerance;
    createResponse() {}
    getTypeName() { return "AddNitriteTolerance"; }
}

/**
* Updates the Nitrite tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrite", "POST")
// @Api(Description="Updates the Nitrite tolerance of an organism")
export class UpdateNitriteTolerance extends UpdateTolerance<NitriteTolerance> implements IReturnVoid
{
    tolerance: NitriteTolerance;
    createResponse() {}
    getTypeName() { return "UpdateNitriteTolerance"; }
}

/**
* Deletes the Nitrite tolerance off an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrite", "DELETE")
// @Api(Description="Deletes the Nitrite tolerance off an organism")
export class DeleteNitriteTolerance extends DeleteTolerance implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "DeleteNitriteTolerance"; }
}

/**
* Add a Nitrate tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrate", "POST")
// @Api(Description="Add a Nitrate tolerance to an organism")
export class AddNitrateTolerance extends AddTolerance<NitrateTolerance> implements IReturnVoid
{
    tolerance: NitrateTolerance;
    createResponse() {}
    getTypeName() { return "AddNitrateTolerance"; }
}

/**
* Deletes the Nitrate tolerance off an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrate", "DELETE")
// @Api(Description="Deletes the Nitrate tolerance off an organism")
export class DeleteNitrateTolerance extends DeleteTolerance implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "DeleteNitrateTolerance"; }
}

/**
* Updates the Nitrate tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrate", "PUT")
// @Api(Description="Updates the Nitrate tolerance of an organism")
export class UpdateNitrateTolerance extends UpdateTolerance<NitrateTolerance> implements IReturnVoid
{
    tolerance: NitrateTolerance;
    createResponse() {}
    getTypeName() { return "UpdateNitrateTolerance"; }
}

/**
* Add a Iron tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/iron", "POST")
// @Api(Description="Add a Iron tolerance to an organism")
export class AddIronTolerance extends AddTolerance<IronTolerance> implements IReturnVoid
{
    tolerance: IronTolerance;
    createResponse() {}
    getTypeName() { return "AddIronTolerance"; }
}

/**
* Deletes the Iron tolerance off an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/iron", "DELETE")
// @Api(Description="Deletes the Iron tolerance off an organism")
export class DeleteIronTolerance extends DeleteTolerance implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "DeleteIronTolerance"; }
}

/**
* Updates the Iron tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/iron", "PUT")
// @Api(Description="Updates the Iron tolerance of an organism")
export class UpdateIronTolerance extends UpdateTolerance<IronTolerance> implements IReturnVoid
{
    tolerance: IronTolerance;
    createResponse() {}
    getTypeName() { return "UpdateIronTolerance"; }
}

/**
* Add a Ammonia tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ammonia", "POST")
// @Api(Description="Add a Ammonia tolerance to an organism")
export class AddAmmoniaTolerance extends AddTolerance<AmmoniaTolerance> implements IReturnVoid
{
    tolerance: AmmoniaTolerance;
    createResponse() {}
    getTypeName() { return "AddAmmoniaTolerance"; }
}

/**
* Deletes the Ammonia tolerance off an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ammonia", "DELETE")
// @Api(Description="Deletes the Ammonia tolerance off an organism")
export class DeleteAmmoniaTolerance extends DeleteTolerance implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "DeleteAmmoniaTolerance"; }
}

/**
* Updates the Ammonia tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ammonia", "PUT")
// @Api(Description="Updates the Ammonia tolerance of an organism")
export class UpdateAmmoniaTolerance extends UpdateTolerance<AmmoniaTolerance> implements IReturnVoid
{
    tolerance: AmmoniaTolerance;
    createResponse() {}
    getTypeName() { return "UpdateAmmoniaTolerance"; }
}
