/* Options:
Date: 2018-02-08 19:39:48
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

export interface IPost
{
}

export interface IMeta
{
    meta?: { [index:string]: string; };
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

export class GetAllPonicsSystems<TPonicsSystem>
{
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

    systemWideOrganisms: string[];
}

export type PonicsSystemAnalysisType = "Error" | "Warning" | "Info";

export class PonicsSystemAnalysisItem
{
    ponicsSystemAnalysisType: PonicsSystemAnalysisType;
    message: string;
    title: string;
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

export interface ICommand
{
}

export interface IDataCommand
{
}

export class ToleranceCommand<TTolerance>
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

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    errorCode: string;

    // @DataMember(Order=2)
    message: string;

    // @DataMember(Order=3)
    stackTrace: string;

    // @DataMember(Order=4)
    errors: ResponseError[];

    // @DataMember(Order=5)
    meta: { [index:string]: string; };
}

export class NewGuid
{
    guid: string;
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

export class PonicsSystemAnalysis
{
    items: PonicsSystemAnalysisItem[];
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

// @DataContract
export class AuthenticateResponse
{
    // @DataMember(Order=1)
    userId: string;

    // @DataMember(Order=2)
    sessionId: string;

    // @DataMember(Order=3)
    userName: string;

    // @DataMember(Order=4)
    displayName: string;

    // @DataMember(Order=5)
    referrerUrl: string;

    // @DataMember(Order=6)
    bearerToken: string;

    // @DataMember(Order=7)
    refreshToken: string;

    // @DataMember(Order=8)
    responseStatus: ResponseStatus;

    // @DataMember(Order=9)
    meta: { [index:string]: string; };
}

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

/**
* Generates a new Guid for use as a UserId
*/
// @Route("/user/id/{SharedSecret}", "GET")
// @Api(Description="Generates a new Guid for use as a UserId")
export class GetNewUserId
{
    sharedSecret: string;
}

/**
* Gets a new Guid
*/
// @Route("/utils/guid", "GET")
// @Api(Description="Gets a new Guid")
export class GetNewGuid implements IReturn<NewGuid>
{
    createResponse() { return new NewGuid(); }
    getTypeName() { return "GetNewGuid"; }
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
* Get a list of the component organisms
*/
// @Route("/systems/{SystemId}/components/{ComponentId}/organisms", "GET")
// @Api(Description="Get a list of the component organisms")
export class GetComponentOrganisms implements IReturn<Array<Organism>>
{
    /**
    * The id of a system
    */
    // @ApiMember(DataType="string", Description="The id of a system", IsRequired=true, Name="ComponentId", ParameterType="path")
    componentId: string;

    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new Array<Organism>(); }
    getTypeName() { return "GetComponentOrganisms"; }
}

/**
* Returns a list of all Aquaponic Systems
*/
// @Route("/systems/aquaponic", "GET")
// @Api(Description="Returns a list of all Aquaponic Systems")
export class GetAllAquaponicSystems extends GetAllPonicsSystems<AquaponicSystem> implements IReturn<Array<AquaponicSystem>>
{
    createResponse() { return new Array<AquaponicSystem>(); }
    getTypeName() { return "GetAllAquaponicSystems"; }
}

/**
* Get an Aquaponic Systems by Id
*/
// @Route("/systems/aquaponic/{SystemId}", "GET")
// @Api(Description="Get an Aquaponic Systems by Id")
export class GetAquaponicSystem implements IReturn<AquaponicSystem>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new AquaponicSystem(); }
    getTypeName() { return "GetAquaponicSystem"; }
}

/**
* Runs analysis on a system using the latest level readings
*/
// @Route("/systems/{SystemId}/analysis", "GET")
// @Api(Description="Runs analysis on a system using the latest level readings")
export class AnalysePonicsSystem implements IReturn<PonicsSystemAnalysis>
{
    /**
    * The Id of a system
    */
    // @ApiMember(DataType="string", Description="The Id of a system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;
    createResponse() { return new PonicsSystemAnalysis(); }
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
export class AddOrganism implements IReturnVoid, ICommand, IDataCommand
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
export class DeleteOrganism implements IReturnVoid, ICommand, IDataCommand
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
export class UpdateOrganism implements IReturnVoid, ICommand, IDataCommand
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
* Connects two a components
*/
// @Route("/systems/{SystemId}/components/connections", "POST")
// @Api(Description="Connects two a components")
export class ConnectComponents implements IReturnVoid, ICommand, IDataCommand
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
* Adds a component to a system
*/
// @Route("/systems/{SystemId}/components", "POST")
// @Api(Description="Adds a component to a system")
export class AddComponent implements IReturnVoid, ICommand, IDataCommand
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
* Updates a component in a system
*/
// @Route("/systems/{SystemId}/components/{ComponentId}", "DELETE")
// @Api(Description="Updates a component in a system")
export class DeleteComponent implements IReturnVoid, ICommand, IDataCommand
{
    /**
    * The id of a System
    */
    // @ApiMember(DataType="string", Description="The id of a System", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    /**
    * The id of a Component
    */
    // @ApiMember(DataType="string", Description="The id of a Component", IsRequired=true, Name="ComponentId", ParameterType="path")
    componentId: string;
    createResponse() {}
    getTypeName() { return "DeleteComponent"; }
}

/**
* Updates a component in a system
*/
// @Route("/systems/{SystemId}/components/{ComponentId}", "PUT")
// @Api(Description="Updates a component in a system")
export class UpdateComponent implements IReturnVoid, ICommand, IDataCommand
{
    /**
    * The id of a System
    */
    // @ApiMember(DataType="string", Description="The id of a System", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    /**
    * The id of a Component
    */
    // @ApiMember(DataType="string", Description="The id of a Component", IsRequired=true, Name="ComponentId", ParameterType="path")
    componentId: string;

    component: Component;
    createResponse() {}
    getTypeName() { return "UpdateComponent"; }
}

/**
* Adds a level readings for system
*/
// @Route("/systems/{SystemId}/reading", "POST")
// @Api(Description="Adds a level readings for system")
export class AddLevelReading implements IReturnVoid, ICommand, IDataCommand
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
export class AddAquaponicSystem implements IReturnVoid, ICommand, IDataCommand
{
    system: AquaponicSystem;
    createResponse() {}
    getTypeName() { return "AddAquaponicSystem"; }
}

/**
* Update an Aquaponic Systems
*/
// @Route("/systems/aquaponic/{SystemId}", "PUT")
// @Api(Description="Update an Aquaponic Systems")
export class UpdateAquaponicSystem implements IReturnVoid, ICommand, IDataCommand
{
    /**
    * The Id of an aquaponic system
    */
    // @ApiMember(DataType="string", Description="The Id of an aquaponic system", IsRequired=true, Name="SystemId", ParameterType="path")
    systemId: string;

    system: AquaponicSystem;
    createResponse() {}
    getTypeName() { return "UpdateAquaponicSystem"; }
}

/**
* Add an Aquaponic System
*/
// @Route("/systems/{SystemId}", "DELETE")
// @Api(Description="Add an Aquaponic System")
export class DeleteSystem implements IReturnVoid, ICommand, IDataCommand
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
* Adds a salinity tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/salinity", "POST")
// @Api(Description="Adds a salinity tolerance to an organism")
export class AddSalinityTolerance extends AddTolerance<SalinityTolerance> implements IReturnVoid, ICommand
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
export class DeleteSalinityTolerance extends DeleteTolerance<SalinityTolerance> implements IReturnVoid, ICommand
{
    createResponse() {}
    getTypeName() { return "DeleteSalinityTolerance"; }
}

/**
* Updates the salinity tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/salinity", "PUT")
// @Api(Description="Updates the salinity tolerance of an organism")
export class UpdateSalinityTolerance extends UpdateTolerance<SalinityTolerance> implements IReturnVoid, ICommand
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
export class AddPhTolerance extends AddTolerance<PhTolerance> implements IReturnVoid, ICommand
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
export class DeletePhTolerance extends DeleteTolerance<PhTolerance> implements IReturnVoid, ICommand
{
    createResponse() {}
    getTypeName() { return "DeletePhTolerance"; }
}

/**
* Updates the pH tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ph", "PUT")
// @Api(Description="Updates the pH tolerance of an organism")
export class UpdatePhTolerance extends UpdateTolerance<PhTolerance> implements IReturnVoid, ICommand
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
export class AddNitriteTolerance extends AddTolerance<NitriteTolerance> implements IReturnVoid, ICommand
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
export class UpdateNitriteTolerance extends UpdateTolerance<NitriteTolerance> implements IReturnVoid, ICommand
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
export class DeleteNitriteTolerance extends DeleteTolerance<NitriteTolerance> implements IReturnVoid, ICommand
{
    createResponse() {}
    getTypeName() { return "DeleteNitriteTolerance"; }
}

/**
* Add a Nitrate tolerance to an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrate", "POST")
// @Api(Description="Add a Nitrate tolerance to an organism")
export class AddNitrateTolerance extends AddTolerance<NitrateTolerance> implements IReturnVoid, ICommand
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
export class DeleteNitrateTolerance extends DeleteTolerance<NitrateTolerance> implements IReturnVoid, ICommand
{
    createResponse() {}
    getTypeName() { return "DeleteNitrateTolerance"; }
}

/**
* Updates the Nitrate tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/nitrate", "PUT")
// @Api(Description="Updates the Nitrate tolerance of an organism")
export class UpdateNitrateTolerance extends UpdateTolerance<NitrateTolerance> implements IReturnVoid, ICommand
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
export class AddIronTolerance extends AddTolerance<IronTolerance> implements IReturnVoid, ICommand
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
export class DeleteIronTolerance extends DeleteTolerance<IronTolerance> implements IReturnVoid, ICommand
{
    createResponse() {}
    getTypeName() { return "DeleteIronTolerance"; }
}

/**
* Updates the Iron tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/iron", "PUT")
// @Api(Description="Updates the Iron tolerance of an organism")
export class UpdateIronTolerance extends UpdateTolerance<IronTolerance> implements IReturnVoid, ICommand
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
export class AddAmmoniaTolerance extends AddTolerance<AmmoniaTolerance> implements IReturnVoid, ICommand
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
export class DeleteAmmoniaTolerance extends DeleteTolerance<AmmoniaTolerance> implements IReturnVoid, ICommand
{
    createResponse() {}
    getTypeName() { return "DeleteAmmoniaTolerance"; }
}

/**
* Updates the Ammonia tolerance of an organism
*/
// @Route("/organisms/{OrganismId}/tolerances/ammonia", "PUT")
// @Api(Description="Updates the Ammonia tolerance of an organism")
export class UpdateAmmoniaTolerance extends UpdateTolerance<AmmoniaTolerance> implements IReturnVoid, ICommand
{
    tolerance: AmmoniaTolerance;
    createResponse() {}
    getTypeName() { return "UpdateAmmoniaTolerance"; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost, IMeta
{
    // @DataMember(Order=1)
    provider: string;

    // @DataMember(Order=2)
    state: string;

    // @DataMember(Order=3)
    oauth_token: string;

    // @DataMember(Order=4)
    oauth_verifier: string;

    // @DataMember(Order=5)
    userName: string;

    // @DataMember(Order=6)
    password: string;

    // @DataMember(Order=7)
    rememberMe: boolean;

    // @DataMember(Order=8)
    continue: string;

    // @DataMember(Order=9)
    nonce: string;

    // @DataMember(Order=10)
    uri: string;

    // @DataMember(Order=11)
    response: string;

    // @DataMember(Order=12)
    qop: string;

    // @DataMember(Order=13)
    nc: string;

    // @DataMember(Order=14)
    cnonce: string;

    // @DataMember(Order=15)
    useTokenCookie: boolean;

    // @DataMember(Order=16)
    accessToken: string;

    // @DataMember(Order=17)
    accessTokenSecret: string;

    // @DataMember(Order=18)
    meta: { [index:string]: string; };
    createResponse() { return new AuthenticateResponse(); }
    getTypeName() { return "Authenticate"; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new AssignRolesResponse(); }
    getTypeName() { return "AssignRoles"; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new UnAssignRolesResponse(); }
    getTypeName() { return "UnAssignRoles"; }
}
