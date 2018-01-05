/* Options:
Date: 2018-01-05 13:52:42
Version: 5.02
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


export interface IReturn<T>
{
    createResponse() : T;
}

export interface IReturnVoid
{
    createResponse() : void;
}

export class LevelReading
{
    /**
    * The of a System
    */
    // @ApiMember(DataType="string", Description="The of a System", IsRequired=true, Name="DateTime", ParameterType="body")
    dateTime: string;

    /**
    * The the type of the reading
    */
    // @ApiMember(DataType="string", Description="The the type of the reading", IsRequired=true, Name="Type", ParameterType="body")
    type: string;

    /**
    * The value of the reading
    */
    // @ApiMember(DataType="number", Description="The value of the reading", Format="double", IsRequired=true, Name="Value", ParameterType="body")
    value: number;
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
    organisms: string[];
}

export class PonicsSystem
{
    // @ApiMember(ExcludeInSchema=true)
    id: string;

    /**
    * The name of the aquaponic system
    */
    // @ApiMember(DataType="string", Description="The name of the aquaponic system", IsRequired=true, Name="Name", ParameterType="body")
    name: string;

    // @ApiMember(ExcludeInSchema=true)
    components: Component[];
}

export type PonicsSystemAnalysisType = "Error" | "Warning" | "Info";

export class PonicsSystemAnalysis
{
    ponicsSystemAnalysisType: PonicsSystemAnalysisType;
    message: string;
    category: string;
    identifier: string;
}

export class AnalyseToleranceQuery
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

export class AnalyseToleranceQuery_2<TLevelAnalysis, TTolerance> extends AnalyseToleranceQuery
{
}

export class SalinityTolerance extends Tolerance
{
    // @ApiMember(ExcludeInSchema=true)
    scale: Scale;
}

export class LevelAnalysis
{
    suitableForOrganism: boolean;
    idealForOrganism: boolean;
}

export class LevelAnalysis_1<TTolerance> extends LevelAnalysis
{
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

export class ToleranceCommand<TTolerance> extends Command
{
    /**
    * The id of an organism
    */
    // @ApiMember(DataType="string", Description="The id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;
}

export class AddTolerance<TTolerance> extends ToleranceCommand<TTolerance>
{
    // @ApiMember(ExcludeInSchema=true)
    tolerance: TTolerance;
}

export class DeleteTolerance<TTolerance> extends ToleranceCommand<TTolerance>
{
    // @ApiMember(ExcludeInSchema=true)
    toleranceType: string;
}

export class UpdateTolerance<TTolerance> extends ToleranceCommand<TTolerance>
{
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
    tolerances: Tolerance[];
}

export class AquaponicSystem extends PonicsSystem
{
    /**
    * Indicates if the system is closed
    */
    // @ApiMember(DataType="boolean", Description="Indicates if the system is closed", Name="Closed", ParameterType="body")
    closed: boolean;

    // @ApiMember(ExcludeInSchema=true)
    componentConnections: ComponentConnection[];
}

export class PonicsSystemAnalysisResult extends Array<PonicsSystemAnalysis>
{
}

export class SalinityLevelAnalysis extends LevelAnalysis_1<SalinityTolerance>
{
}

export class PhLevelAnalysis extends LevelAnalysis_1<PhTolerance>
{
    hydrogenIonConcentration: number;
    hydroxideIonsConcentration: number;
    warnings: string[];
}

export class NitriteLevelAnalysis extends LevelAnalysis_1<NitriteTolerance>
{
}

export class NitrateLevelAnalysis extends LevelAnalysis_1<NitrateTolerance>
{
}

export class IronLevelAnalysis extends LevelAnalysis_1<IronTolerance>
{
}

export class AmmoniaLevelAnalysis extends LevelAnalysis_1<AmmoniaTolerance>
{
}

/**
* Gets level readings for system
*/
// @Route("/systems/{SystemId}/reading/{Type}", "GET")
// @Api(Description="Gets level readings for system")
export class GetSystemLevels implements IReturn<Array<LevelReading>>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    /**
    * The type of level reading to get
    */
    // @ApiMember(DataType="string", Description="The type of level reading to get", IsRequired=true, Name="Type", ParameterType="path")
    type: string;
    createResponse() { return new Array<LevelReading>(); }
    getTypeName() { return "GetSystemLevels"; }
}

/**
* Get all Organisms in an Aquaponic System
*/
// @Route("/systems/{SystemId}/organisms", "GET")
// @Api(Description="Get all Organisms in an Aquaponic System")
export class GetSystemOrganisms implements IReturn<Array<Organism>>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new Array<Organism>(); }
    getTypeName() { return "GetSystemOrganisms"; }
}

/**
* Get an organism by Id
*/
// @Route("/organisms/{OrganismId}", "GET")
// @Api(Description="Get an organism by Id")
export class GetOrganism implements IReturn<Organism>
{
    /**
    * The Id of an Organism
    */
    // @ApiMember(DataType="string", Description="The Id of an Organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;
    createResponse() { return new Organism(); }
    getTypeName() { return "GetOrganism"; }
}

/**
* Get all organisms
*/
// @Route("/organisms", "GET")
// @Api(Description="Get all organisms")
export class GetOrganisms implements IReturn<Array<Organism>>
{
    organismsIds: string[];
    createResponse() { return new Array<Organism>(); }
    getTypeName() { return "GetOrganisms"; }
}

/**
* Get a list of component connections
*/
// @Route("/systems/{SystemId}/components/connections", "GET")
// @Api(Description="Get a list of component connections")
export class GetConnections implements IReturn<Array<ComponentConnection>>
{
    /**
    * The id of a system
    */
    // @ApiMember(DataType="string", Description="The id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new Array<ComponentConnection>(); }
    getTypeName() { return "GetConnections"; }
}

/**
* Returns a list of all Aquaponic Systems
*/
// @Route("/systems/aquaponic", "GET")
// @Api(Description="Returns a list of all Aquaponic Systems")
export class GetAllSystems implements IReturn<Array<AquaponicSystem>>
{
    createResponse() { return new Array<AquaponicSystem>(); }
    getTypeName() { return "GetAllSystems"; }
}

/**
* Get an Aquaponic Systems by Id
*/
// @Route("/systems/aquaponic/{SystemId}", "GET")
// @Api(Description="Get an Aquaponic Systems by Id")
export class GetSystem implements IReturn<AquaponicSystem>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new AquaponicSystem(); }
    getTypeName() { return "GetSystem"; }
}

/**
* Runs analysis on a system using the latest level readings
*/
// @Route("/systems/{SystemId}/analysis", "GET")
// @Api(Description="Runs analysis on a system using the latest level readings")
export class AnalysePonicsSystem implements IReturn<PonicsSystemAnalysisResult>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new PonicsSystemAnalysisResult(); }
    getTypeName() { return "AnalysePonicsSystem"; }
}

/**
* Returns ToleranceAnalysis of Salinity level for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Salinity/{Value}", "GET")
// @Api(Description="Returns ToleranceAnalysis of Salinity level for an Organism")
export class AnalyseToleranceSalinity extends AnalyseToleranceQuery_2<SalinityLevelAnalysis, SalinityTolerance> implements IReturn<SalinityLevelAnalysis>
{
    createResponse() { return new SalinityLevelAnalysis(); }
    getTypeName() { return "AnalyseToleranceSalinity"; }
}

/**
* Returns ToleranceAnalysis of pH level for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Ph/{Value}", "GET")
// @Api(Description="Returns ToleranceAnalysis of pH level for an Organism")
export class AnalyseTolerancePh extends AnalyseToleranceQuery_2<PhLevelAnalysis, PhTolerance> implements IReturn<PhLevelAnalysis>
{
    createResponse() { return new PhLevelAnalysis(); }
    getTypeName() { return "AnalyseTolerancePh"; }
}

/**
* Returns ToleranceAnalysis of Nitrite levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Nitrite/{Value}", "GET")
// @Api(Description="Returns ToleranceAnalysis of Nitrite levels for an Organism")
export class AnalyseToleranceNitrite extends AnalyseToleranceQuery_2<NitriteLevelAnalysis, NitriteTolerance> implements IReturn<NitriteLevelAnalysis>
{
    createResponse() { return new NitriteLevelAnalysis(); }
    getTypeName() { return "AnalyseToleranceNitrite"; }
}

/**
* Returns Analysis of Nitrate levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Nitrite/{Value}", "GET")
// @Api(Description="Returns Analysis of Nitrate levels for an Organism")
export class AnalyseToleranceNitrate extends AnalyseToleranceQuery_2<NitrateLevelAnalysis, NitrateTolerance> implements IReturn<NitrateLevelAnalysis>
{
    createResponse() { return new NitrateLevelAnalysis(); }
    getTypeName() { return "AnalyseToleranceNitrate"; }
}

/**
* Returns ToleranceAnalysis of Iron  levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Iron/{Value}", "GET")
// @Api(Description="Returns ToleranceAnalysis of Iron  levels for an Organism")
export class AnalyseToleranceIron extends AnalyseToleranceQuery_2<IronLevelAnalysis, IronTolerance> implements IReturn<IronLevelAnalysis>
{
    createResponse() { return new IronLevelAnalysis(); }
    getTypeName() { return "AnalyseToleranceIron"; }
}

/**
* Returns Analysis of Ammonia levels for an Organism
*/
// @Route("/organisms/{OrganismId}/Tolerances/Ammonia/{Value}", "GET")
// @Api(Description="Returns Analysis of Ammonia levels for an Organism")
export class AnalyseToleranceAmmonia extends AnalyseToleranceQuery_2<AmmoniaLevelAnalysis, AmmoniaTolerance> implements IReturn<AmmoniaLevelAnalysis>
{
    createResponse() { return new AmmoniaLevelAnalysis(); }
    getTypeName() { return "AnalyseToleranceAmmonia"; }
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
* Deletes an Organism
*/
// @Route("/organisms/{OrganismId}", "DELETE")
// @Api(Description="Deletes an Organism")
export class DeleteOrganism extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The Id of an organism
    */
    // @ApiMember(DataType="string", Description="The Id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;
    createResponse() {}
    getTypeName() { return "DeleteOrganism"; }
}

/**
* Updates an Organism
*/
// @Route("/organisms/{OrganismId}", "PUT")
// @Api(Description="Updates an Organism")
export class UpdateOrganism extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The Id of an organism
    */
    // @ApiMember(DataType="string", Description="The Id of an organism", IsRequired=true, Name="OrganismId", ParameterType="path")
    organismId: string;

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
* Adds a level readings for system
*/
// @Route("/systems/{SystemId}/reading", "POST")
// @Api(Description="Adds a level readings for system")
export class AddLevelReading extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The id of a System
    */
    // @ApiMember(DataType="string", Description="The id of a System", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    levelReadings: LevelReading[];
    createResponse() {}
    getTypeName() { return "AddLevelReading"; }
}

/**
* Add an Aquaponic System
*/
// @Route("/systems/aquaponic", "POST")
// @Api(Description="Add an Aquaponic System")
export class AddSystem extends Command implements IReturnVoid, IDataCommand
{
    system: PonicsSystem;
    createResponse() {}
    getTypeName() { return "AddSystem"; }
}

/**
* Add an Aquaponic System
*/
// @Route("/systems/aquaponic/{SystemId}", "DELETE")
// @Api(Description="Add an Aquaponic System")
export class DeleteSystem extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The Id of an aquaponic system
    */
    // @ApiMember(DataType="string", Description="The Id of an aquaponic system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() {}
    getTypeName() { return "DeleteSystem"; }
}

/**
* Update an Aquaponic Systems
*/
// @Route("/systems/aquaponic/{SystemId}", "PUT")
// @Api(Description="Update an Aquaponic Systems")
export class UpdateSystem extends Command implements IReturnVoid, IDataCommand
{
    /**
    * The Id of an aquaponic system
    */
    // @ApiMember(DataType="string", Description="The Id of an aquaponic system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

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
export class DeleteSalinityTolerance extends DeleteTolerance<SalinityTolerance> implements IReturnVoid
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
export class DeletePhTolerance extends DeleteTolerance<PhTolerance> implements IReturnVoid
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
export class DeleteNitriteTolerance extends DeleteTolerance<NitriteTolerance> implements IReturnVoid
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
export class DeleteNitrateTolerance extends DeleteTolerance<NitrateTolerance> implements IReturnVoid
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
export class DeleteIronTolerance extends DeleteTolerance<IronTolerance> implements IReturnVoid
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
export class DeleteAmmoniaTolerance extends DeleteTolerance<AmmoniaTolerance> implements IReturnVoid
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
